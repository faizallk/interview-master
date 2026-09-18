# LLM Integration Documentation

How Google Gemini AI is integrated into InterviewAI.

---

## Overview

InterviewAI uses **Google Gemini 1.5 Flash** via the `@google/genai` Node.js SDK to generate personalized interview preparation reports. The entire integration lives in `backend/src/services/ai.services.js`.

The flow is:

```
User Input (resume PDF + job description + self description)
        ↓
  PDF text extraction (pdf-parse)
        ↓
  Prompt construction (buildInterviewPrompt)
        ↓
  Gemini API call (generateContent)
        ↓
  Structured JSON response (enforced by responseSchema)
        ↓
  Zod validation (interviewReportSchema.parse)
        ↓
  Saved to MongoDB + returned to frontend
```

---

## SDK Setup

```js
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});
```

The API key is loaded from `.env` via `dotenv`. The client is instantiated once at module load and reused across all requests.

---

## Model Used

```
gemini-1.5-flash
```

**Why this model:**
- Stable availability on the free tier
- Fast response time for large prompts
- Supports structured JSON output via `responseSchema`
- Good instruction-following for complex prompts

---

## Structured Output (JSON Mode)

Instead of asking Gemini to return JSON in plain text and parsing it manually, the SDK's `responseSchema` feature is used to enforce a strict output structure. This eliminates JSON parsing errors and hallucinated field names.

### How it works

You pass a plain JSON Schema object to `config.responseSchema`. Gemini guarantees the response matches that schema.

```js
const geminiSchema = {
    type: "object",
    properties: {
        matchScore: { type: "number" },
        technicalQuestions: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    question: { type: "string" },
                    intention: { type: "string" },
                    answer: { type: "string" },
                },
                required: ["question", "intention", "answer"],
            },
        },
        behavioralQuestions: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    question: { type: "string" },
                    intention: { type: "string" },
                    answer: { type: "string" },
                },
                required: ["question", "intention", "answer"],
            },
        },
        skillGaps: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    skill: { type: "string" },
                    description: { type: "string" },
                    severity: { type: "string", enum: ["Low", "Medium", "High"] },
                },
                required: ["skill", "description", "severity"],
            },
        },
        preparationPlan: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    day: { type: "number" },
                    focus: { type: "string" },
                    tasks: { type: "array", items: { type: "string" } },
                },
                required: ["day", "focus", "tasks"],
            },
        },
    },
    required: ["matchScore", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan"],
};
```

### Important: Do NOT pass Zod schemas to Gemini

Zod schemas serialize with internal `$defs` references that Gemini rejects with a 400 error:

```
Unknown name "def" at 'generation_config.response_schema': Cannot find field.
```

Always use a plain JSON Schema object for `responseSchema`. Zod is only used **after** the response to validate the output:

```js
return interviewReportSchema.parse(report); // Zod validation after response
```

---

## The API Call

```js
const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: prompt,
    config: {
        responseMimeType: "application/json",
        responseSchema: geminiSchema,
    },
});

const report = JSON.parse(response.text);
return interviewReportSchema.parse(report);
```

- `responseMimeType: "application/json"` tells Gemini to return JSON
- `responseSchema` enforces the exact shape of the JSON
- `response.text` contains the raw JSON string
- `JSON.parse` converts it to an object
- `interviewReportSchema.parse` runs Zod validation as a safety net

---

## Prompt Engineering

The prompt is built by `buildInterviewPrompt({ resume, selfDescription, jobDescription })`.

### Prompt structure

```
[System role definition]
[Candidate resume]
[Candidate self-description]
[Job description]
[Detailed instructions for each output section]
[Anti-hallucination rules]
[Final quality check instructions]
```

### Key prompt design decisions

**1. Candidate-specific questions only**

The prompt explicitly forbids generic questions like "What is React?" and instructs Gemini to derive every question from the candidate's actual resume claims and projects.

**2. Resume claim challenges**

The prompt instructs Gemini to identify vague claims ("improved performance", "built scalable APIs") and generate questions that probe whether the candidate actually understands what they claim to have done.

**3. Anti-hallucination rules**

The prompt explicitly lists what Gemini must never invent: projects, companies, technologies, metrics, certifications, or years of experience not present in the resume.

**4. Answer strategy format**

For technical questions, answers include: concepts to explain, implementation details, trade-offs, relevant project examples, common mistakes, and likely follow-up directions.

For behavioral questions, answers follow the STAR format (Situation, Task, Action, Result).

**5. Match score calibration**

The prompt provides explicit score ranges with descriptions to prevent score inflation:
- 90–100: Strong match
- 75–89: Good match with gaps
- 60–74: Partial match
- 40–59: Significant gaps
- 0–39: Poor match

---

## Zod Schema (Validation Layer)

Zod schemas are defined for each sub-document and composed into the main `interviewReportSchema`:

```js
const interviewReportSchema = z.object({
    matchScore: z.number().min(0).max(100),
    technicalQuestions: z.array(technicalQuestionSchema),
    behavioralQuestions: z.array(behavioralQuestionSchema),
    skillGaps: z.array(skillGapSchema),
    preparationPlan: z.array(preparationDaySchema),
});
```

This runs after the Gemini response and throws if the AI returns unexpected data types or missing fields, preventing corrupt data from being saved to MongoDB.

---

## Error Handling

```js
try {
    const response = await ai.models.generateContent({ ... });
    // ...
} catch (error) {
    console.error("Interview report generation failed:", error);
    throw new Error(`Failed to generate interview report: ${error.message}`);
}
```

Common errors and their causes:

| Error | Cause | Fix |
|---|---|---|
| `400 Unknown name "def"` | Zod schema passed to `responseSchema` | Use plain JSON Schema object |
| `400 INVALID_ARGUMENT` | Wrong model name or malformed schema | Check model name and schema structure |
| `503 UNAVAILABLE` | Gemini model overloaded | Switch to `gemini-1.5-flash`, retry later |
| `Empty response` | Model returned no text | Check prompt length, reduce if needed |

---

## Performance Considerations

The Gemini call is the slowest part of the request (~15–45 seconds) because:

1. The prompt is large (~300+ lines of instructions + resume + JD)
2. The output is complex (multiple arrays of detailed objects)
3. Everything is generated in a single blocking call

### Potential optimizations

- **Streaming**: Use `generateContentStream` to stream the response to the frontend progressively instead of waiting for the full response
- **Parallel calls**: Split into 3 parallel calls (technical questions, behavioral questions, skill gaps + plan) using `Promise.all`
- **Prompt reduction**: Shorten the instruction section — Gemini 1.5 Flash follows shorter prompts well
- **Caching**: Cache reports by a hash of `(resume + jobDescription)` to avoid regenerating identical inputs

---

## Adding a New Output Field

To add a new field to the AI report (e.g., `interviewTips`):

1. Add it to `geminiSchema` in `ai.services.js`:
```js
interviewTips: {
    type: "array",
    items: { type: "string" }
}
```

2. Add it to `required` array in `geminiSchema`

3. Add it to the Zod schema:
```js
const interviewReportSchema = z.object({
    // ...existing fields
    interviewTips: z.array(z.string()),
});
```

4. Add it to the Mongoose model in `interviewReport.model.js`:
```js
interviewTips: [{ type: String }]
```

5. Update the prompt to instruct Gemini on what to generate for that field
