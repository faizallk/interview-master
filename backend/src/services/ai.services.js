const { GoogleGenAI, Type } = require("@google/genai");
const { z } = require("zod");

/* -------------------------------------------------------------------------- */
/* Configuration                                                               */
/* -------------------------------------------------------------------------- */

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
}

const ai = new GoogleGenAI({
    apiKey,
});

/* -------------------------------------------------------------------------- */
/* Zod Schemas                                                                */
/* -------------------------------------------------------------------------- */

const technicalQuestionSchema = z.object({
    question: z
        .string()
        .min(1)
        .describe(
            "A realistic technical interview question specifically derived from the candidate's resume, projects, skills, responsibilities, or job description."
        ),

    intention: z
        .string()
        .min(1)
        .describe(
            "The specific skill, knowledge, reasoning ability, or experience the interviewer wants to evaluate."
        ),

    answer: z
        .string()
        .min(1)
        .describe(
            "A detailed answer strategy explaining what the candidate should discuss, which technical concepts to mention, relevant project examples, trade-offs, and likely follow-up areas."
        ),
});

const behavioralQuestionSchema = z.object({
    question: z
        .string()
        .min(1)
        .describe(
            "A realistic behavioral interview question based specifically on the candidate's actual experience, projects, responsibilities, or target role."
        ),

    intention: z
        .string()
        .min(1)
        .describe(
            "The competency or behavior the interviewer is evaluating."
        ),

    answer: z
        .string()
        .min(1)
        .describe(
            "A recommended answer strategy using the candidate's actual experience. Use STAR structure where appropriate and never invent facts."
        ),
});

const skillGapSchema = z.object({
    skill: z
        .string()
        .min(1)
        .describe(
            "A specific skill required or strongly preferred by the job that is missing, weak, or insufficiently demonstrated in the resume."
        ),

    description: z
        .string()
        .min(1)
        .describe(
            "Why this skill matters for the target role and what evidence is missing from the candidate's profile."
        ),

    severity: z
        .enum(["Low", "Medium", "High"])
        .describe(
            "The impact this skill gap could have on the candidate's interview performance or job fit."
        ),
});

const preparationDaySchema = z.object({
    day: z
        .number()
        .int()
        .positive()
        .describe("The preparation day number."),

    tasks: z
        .array(z.string().min(1))
        .min(1)
        .describe(
            "Specific and actionable preparation tasks the candidate should complete."
        ),

    focus: z
        .string()
        .min(1)
        .describe(
            "The primary topic or skill that should be focused on during this day."
        ),
});

/**
 * Complete interview report schema.
 */
const interviewReportSchema = z.object({
    matchScore: z
        .number()
        .min(0)
        .max(100)
        .describe(
            "The percentage match between the candidate's demonstrated skills and the job requirements."
        ),

    technicalQuestions: z
        .array(technicalQuestionSchema)
        .min(1)
        .describe(
            "Technical questions most likely to be asked based on the candidate and target job."
        ),

    behavioralQuestions: z
        .array(behavioralQuestionSchema)
        .min(1)
        .describe(
            "Behavioral questions most likely to be asked for this candidate and role."
        ),

    skillGaps: z
        .array(skillGapSchema)
        .describe(
            "Important skill gaps identified by comparing the resume with the job description."
        ),

    preparationPlan: z
        .array(preparationDaySchema)
        .min(1)
        .describe(
            "A prioritized and practical interview preparation plan."
        ),
});

/* -------------------------------------------------------------------------- */
/* Gemini Response Schema                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Gemini requires its own response schema format.
 * Keep this separate from Zod because Zod is used for runtime validation.
 */
const geminiInterviewReportSchema = {
    type: Type.OBJECT,

    properties: {
        matchScore: {
            type: Type.NUMBER,
            description:
                "Percentage match between the candidate and the job.",
        },

        technicalQuestions: {
            type: Type.ARRAY,

            items: {
                type: Type.OBJECT,

                properties: {
                    question: {
                        type: Type.STRING,
                    },

                    intention: {
                        type: Type.STRING,
                    },

                    answer: {
                        type: Type.STRING,
                    },
                },

                required: [
                    "question",
                    "intention",
                    "answer",
                ],
            },
        },

        behavioralQuestions: {
            type: Type.ARRAY,

            items: {
                type: Type.OBJECT,

                properties: {
                    question: {
                        type: Type.STRING,
                    },

                    intention: {
                        type: Type.STRING,
                    },

                    answer: {
                        type: Type.STRING,
                    },
                },

                required: [
                    "question",
                    "intention",
                    "answer",
                ],
            },
        },

        skillGaps: {
            type: Type.ARRAY,

            items: {
                type: Type.OBJECT,

                properties: {
                    skill: {
                        type: Type.STRING,
                    },

                    description: {
                        type: Type.STRING,
                    },

                    severity: {
                        type: Type.STRING,
                        enum: ["Low", "Medium", "High"],
                    },
                },

                required: [
                    "skill",
                    "description",
                    "severity",
                ],
            },
        },

        preparationPlan: {
            type: Type.ARRAY,

            items: {
                type: Type.OBJECT,

                properties: {
                    day: {
                        type: Type.INTEGER,
                    },

                    tasks: {
                        type: Type.ARRAY,

                        items: {
                            type: Type.STRING,
                        },
                    },

                    focus: {
                        type: Type.STRING,
                    },
                },

                required: [
                    "day",
                    "tasks",
                    "focus",
                ],
            },
        },
    },

    required: [
        "matchScore",
        "technicalQuestions",
        "behavioralQuestions",
        "skillGaps",
        "preparationPlan",
    ],
};

/* -------------------------------------------------------------------------- */
/* Prompt                                                                      */
/* -------------------------------------------------------------------------- */

const buildInterviewPrompt = ({
    resume,
    selfDescription,
    jobDescription,
}) => `
You are a senior technical interviewer, engineering manager, and hiring
committee member at a top-tier technology company.

Your job is to simulate the interview this candidate is most likely to face
for the provided job description.

Do NOT generate generic interview questions.

Your questions must be based on evidence found in:

1. Candidate resume
2. Candidate self-description
3. Job description


==================== RESUME ====================

${resume}


==================== SELF DESCRIPTION ====================

${selfDescription || "Not provided."}


==================== JOB DESCRIPTION ====================

${jobDescription}


==================================================


## STEP 1 — UNDERSTAND THE CANDIDATE

Before generating questions, identify internally:

- Technologies the candidate actually mentions.
- Projects the candidate actually worked on.
- Candidate's responsibilities.
- Candidate's years of experience.
- Architecture decisions mentioned in the resume.
- Performance improvements mentioned.
- Security-related work mentioned.
- Database experience.
- Backend experience.
- Frontend experience.
- Cloud/infrastructure experience.
- Statements that an experienced interviewer would challenge.
- Technologies required by the job but missing from the resume.


## STEP 2 — UNDERSTAND THE JOB

Identify internally:

- Required technologies.
- Preferred technologies.
- Expected seniority.
- Backend expectations.
- Frontend expectations.
- Database expectations.
- System-design expectations.
- Cloud expectations.
- Testing expectations.
- DSA/problem-solving expectations.
- Production engineering expectations.


# MOST IMPORTANT RULE — CANDIDATE-SPECIFIC QUESTIONS

Every question should feel like it was written specifically for this candidate.

Do NOT generate questions simply because a technology appears in the resume.

BAD:

"What is React?"

"What is Node.js?"

"What is PostgreSQL?"

"What is REST API?"

"What is JWT?"

"What is your experience with React?"

GOOD:

"You mentioned implementing role-based access control in your project.
How did you structure permissions across different roles, and how did you
ensure that a user could not bypass frontend restrictions by directly
calling the API?"

GOOD:

"You mentioned optimizing repeated API requests in your Next.js application.
How did you identify the source of the repeated requests, and what changes
did you make to prevent unnecessary API calls without introducing stale data?"

GOOD:

"You worked with PostgreSQL in the hotel management system. How would you
prevent two users from booking the same room simultaneously when both
requests reach the server at nearly the same time?"


# PROJECT DEEP-DIVE

For every major project in the resume, think like an interviewer.

Ask questions about:

- Why the architecture was chosen.
- Database design.
- API design.
- Authentication.
- Authorization.
- Error handling.
- Validation.
- Performance.
- Scalability.
- Security.
- Concurrency.
- Caching.
- Deployment.
- Monitoring.
- Failure scenarios.

The interviewer should be able to determine whether the candidate actually
worked on the project or simply listed the technology on the resume.


# RESUME CLAIM CHALLENGE

Challenge important claims.

If the candidate says:

"Improved performance"

Ask about:

- Original problem.
- How it was measured.
- Root cause.
- Solution.
- Trade-offs.
- Actual result.

If the candidate says:

"Built scalable APIs"

Ask:

"What made the API scalable?"

"What would fail first at 10x traffic?"

If the candidate says:

"Implemented authentication"

Ask about:

- Token storage.
- Token expiration.
- Refresh tokens.
- Token theft.
- Authorization.
- CSRF.
- Session invalidation.

If the candidate says:

"Used PostgreSQL"

Ask about:

- Indexes.
- Query performance.
- Transactions.
- Isolation levels.
- Constraints.
- Deadlocks.
- Schema design.


# FOLLOW-UP THINKING

Generate questions that can naturally lead to deeper interviewer follow-ups.

Example:

Question:
"How did you implement JWT authentication?"

Possible interviewer follow-ups:

"Where is the token stored?"

"What happens if the token is stolen?"

"How do you refresh the token?"

"How do you revoke access?"

"How do you protect the API?"

Therefore, prefer questions that test actual understanding instead of
memorization.


# TECHNICAL QUESTION PRIORITY

Prioritize:

1. Major projects.
2. Required job skills.
3. Resume technologies.
4. Architecture.
5. Debugging.
6. Performance.
7. Scalability.
8. Security.
9. Database design.
10. API design.
11. System design.
12. CS fundamentals.
13. DSA where relevant.


# BEHAVIORAL QUESTIONS

Do not generate generic behavioral questions.

Avoid:

"Tell me about yourself."

"What are your strengths?"

"What are your weaknesses?"

"Where do you see yourself in five years?"

Instead, derive behavioral questions from actual resume evidence.

Examples:

"You mentioned resolving a production issue. Walk me through the most
difficult production problem you faced, how you investigated it, and what
you changed afterward."

"You worked on a multi-module application. Tell me about a time when
requirements changed close to a deadline. How did you handle it?"

"You mentioned improving application performance. Tell me about a time when
you had to make a technical decision under a deadline."


# ANSWER STRATEGY

Do NOT fabricate an answer for the candidate.

Instead, explain how the candidate should answer.

Technical answers should include:

- Concepts to explain.
- Implementation details.
- Relevant project evidence.
- Trade-offs.
- Common mistakes.
- Likely follow-up questions.

Behavioral answers should follow:

Situation
Task
Action
Result

Only use facts supported by the provided information.


# SKILL GAPS

Only report meaningful gaps.

Do not list every technology missing from the resume.

A gap should be included when:

- It is explicitly required.
- It is strongly preferred.
- It is important for the expected seniority.
- It could realistically affect interview performance.


# MATCH SCORE

Calculate the match score based on evidence.

Do not inflate the score.

90-100 = Excellent match.

75-89 = Strong match with some gaps.

60-74 = Moderate match with meaningful preparation required.

40-59 = Significant gaps.

0-39 = Weak match.


# PREPARATION PLAN

Create a practical preparation plan based on the candidate's actual weaknesses.

Prioritize:

1. High-severity skill gaps.
2. Required technologies.
3. Project deep-dives.
4. Resume claims.
5. DSA/problem solving.
6. System design.
7. Behavioral preparation.

Tasks must be actionable.

BAD:

"Study React."

GOOD:

"Review React rendering, hooks, memoization, state management, and prepare
to explain how you diagnosed unnecessary re-renders in your project."


# ANTI-HALLUCINATION RULE

Never invent:

- Projects.
- Companies.
- Technologies.
- Responsibilities.
- Metrics.
- Architecture.
- Production incidents.
- Certifications.
- Achievements.
- Years of experience.

If something is not supported by the resume or self-description, treat it
as unknown.

Never assume that mentioning a technology means advanced production
experience.


# FINAL QUALITY CHECK

Before returning the result, verify internally:

- Questions are candidate-specific.
- Questions are relevant to the target job.
- Questions are technically realistic.
- Major resume claims are challenged.
- Project-specific questions are included.
- Generic questions are minimized.
- Skill gaps are evidence-based.
- Match score is justified.
- Behavioral questions are realistic.
- No candidate information was invented.
- Preparation plan addresses the highest-value weaknesses.

Return ONLY valid structured JSON matching the response schema.
`;

/* -------------------------------------------------------------------------- */
/* Generate Interview Report                                                   */
/* -------------------------------------------------------------------------- */

async function generateInterviewReport({
    resume,
    selfDescription = "",
    jobDescription,
}) {
    if (!resume?.trim()) {
        throw new Error("Resume is required.");
    }

    if (!jobDescription?.trim()) {
        throw new Error("Job description is required.");
    }

    const prompt = buildInterviewPrompt({
        resume,
        selfDescription,
        jobDescription,
    });

    try {
        const response = await ai.models.generateContent({
           model: "gemini-3.5-flash",

            contents: prompt,

            config: {
                responseMimeType: "application/json",
                responseSchema: geminiInterviewReportSchema,

                temperature: 0.2,
            },
        });

        if (!response.text) {
            throw new Error("Gemini returned an empty response.");
        }

        const parsedResponse = JSON.parse(response.text);
        // console.log(parsedResponse)
        /**
         * Zod validates Gemini's output before it reaches
         * the rest of the application.
         */
        const validatedReport =
            interviewReportSchema.parse(parsedResponse);

        return validatedReport;
    } catch (error) {
        console.error(
            "Interview report generation failed:",
            error
        );

        if (error instanceof z.ZodError) {
            throw new Error(
                "Gemini returned an invalid interview report."
            );
        }

        throw new Error(
            `Failed to generate interview report: ${error.message}`
        );
    }
}

/* -------------------------------------------------------------------------- */
/* Exports                                                                    */
/* -------------------------------------------------------------------------- */

module.exports =  {
    generateInterviewReport,
    interviewReportSchema,
};