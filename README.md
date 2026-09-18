# InterviewAI — Project Report

## Overview

InterviewAI is a full-stack AI-powered interview preparation platform. Users upload their resume and paste a job description, and the app uses Google Gemini to generate a personalized interview strategy — including tailored technical questions, behavioral questions, identified skill gaps, and a day-by-day preparation plan.

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| Vite | 8 | Build tool & dev server |
| React Router DOM | 7 | Client-side routing |
| Tailwind CSS | 4 | Utility-first styling |
| Shadcn/UI | 4 | Component library (Button, Input, Textarea, Card, Label) |
| Axios | 1.20 | HTTP client |
| Lucide React | 1.41 | Icon library |
| @base-ui/react | 1.8 | Accessible UI primitives |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | 24 | Runtime |
| Express | 5 | Web framework |
| MongoDB + Mongoose | 9.9 | Database & ODM |
| @google/genai | 2.21 | Gemini AI SDK |
| Zod | — | AI response validation |
| JWT (jsonwebtoken) | 9 | Authentication tokens |
| bcryptjs | 3 | Password hashing |
| Multer | — | PDF file upload (memory storage) |
| pdf-parse | — | PDF text extraction |
| cookie-parser | 1.4 | Cookie handling |
| cors | 2.8 | Cross-origin requests |
| dotenv | 17 | Environment variables |
| nodemon | 3.1 | Dev auto-restart |

---

## Project Structure

```
interview-master/
├── backend/
│   ├── index.js                        # Entry point, Express app setup
│   └── src/
│       ├── config/
│       │   └── database.js             # MongoDB connection
│       ├── controllers/
│       │   ├── auth.controller.js      # Register, login, logout, change-pass, get-me
│       │   └── interview.controller.js # Generate, get, list reports
│       ├── middlewares/
│       │   ├── auth.middleware.js      # JWT verification + blacklist check
│       │   └── multer.middleware.js    # PDF upload (memory storage, 5MB limit)
│       ├── models/
│       │   ├── users.model.js          # User schema
│       │   ├── blacklist.model.js      # Token blacklist schema
│       │   └── interviewReport.model.js# Interview report schema
│       ├── routes/
│       │   ├── auth.route.js           # /api/auth/*
│       │   └── interview.route.js      # /api/interview/*
│       └── services/
│           ├── ai.services.js          # Gemini AI integration + Zod validation
│           └── temp.js                 # Sample resume/JD data for testing
└── frontend/
    └── src/
        ├── features/
        │   ├── auth/
        │   │   ├── pages/              # Login, Register
        │   │   ├── components/         # Protected route wrapper
        │   │   ├── hooks/              # useAuth hook
        │   │   ├── services/           # auth.api.js (axios calls)
        │   │   └── auth.context.jsx    # Global auth state (React Context)
        │   └── interview/
        │       ├── pages/              # Home, Interview, Reports
        │       └── services/           # interview.api.js (axios calls)
        ├── components/ui/              # Shadcn components
        ├── App.jsx                     # Root with AuthProvider + RouterProvider
        ├── auth.router.jsx             # Route definitions
        └── main.jsx                    # React entry point
```

---

## API Endpoints

### Auth — `/api/auth`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/register` | No | Register new user |
| POST | `/login` | No | Login, sets JWT cookie |
| GET | `/logout` | No | Clears cookie, blacklists token |
| GET | `/get-me` | Yes | Returns current user info |
| PATCH | `/change-pass` | Yes | Change password |

### Interview — `/api/interview`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/` | Yes | Upload resume PDF + JD → generate AI report |
| GET | `/` | Yes | List all reports (paginated) |
| GET | `/report/:interview` | Yes | Get single report by ID |

---

## Database Models

### User
```
username  String  unique, min 3 chars
email     String  unique
password  String  bcrypt hashed, min 6 chars
```

### BlacklistToken
```
token      String    JWT token to invalidate
createdAt  Date      auto (TTL candidate)
```

### InterviewReport
```
userId              ObjectId  → users
jobDescription      String
resume              String    (extracted PDF text)
selfDescription     String
matchScore          Number    (0–100)
technicalQuestions  Array     { question, intention, answer }
behavioralQuestions Array     { question, intention, answer }
skillGaps           Array     { skill, description, severity: Low|Medium|High }
preparationPlan     Array     { day, focus, tasks[] }
createdAt           Date      auto
updatedAt           Date      auto
```

---

## Authentication Flow

1. User registers/logs in → server signs a JWT (1 day expiry) and sets it as an `httpOnly` cookie
2. Every protected request passes through `authMiddleware`:
   - Reads token from `req.cookies.token`
   - Checks token against the blacklist collection
   - Verifies JWT signature
   - Attaches decoded `{ id, username }` to `req.user`
3. On logout, the token is inserted into the blacklist collection and the cookie is cleared

---

## Frontend Pages & Routing

| Route | Page | Protected |
|---|---|---|
| `/login` | Login | No |
| `/register` | Register | No |
| `/` | Home (generate report) | Yes |
| `/reports` | All reports list | Yes |
| `/interview/:id` | Single report view | Yes |
| `*` | NotFound | No |

### Protected Route
The `Protected` component reads from `AuthContext`. While loading, it renders nothing. If no user is found, it redirects to `/login`.

---

## Core Features

### Report Generation (Home page)
- User pastes a job description (required)
- User uploads a PDF resume (required) and/or writes a self-description
- `FormData` is sent as `multipart/form-data` to `POST /api/interview`
- Backend extracts PDF text via `pdf-parse`, sends to Gemini, saves result to MongoDB
- User is redirected to the report page on success

### Report View (Interview page)
- Fetches report by ID from `GET /api/interview/report/:id`
- Displays: match score, technical questions (accordion), behavioral questions (accordion), skill gaps with severity badges, 7-day preparation plan with daily tasks

### Reports List (Reports page)
- Paginated grid of past reports
- Shows job description preview, match score, and creation date
- Pagination controls for navigating pages

---

## Environment Variables

### Backend `.env`
```
PORT=3000
MONGO_URI=<mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
GEMINI_API_KEY=<your_gemini_api_key>
```

### Frontend `.env`
```
VITE_API_URL=http://localhost:3000
```

---

## Known Issues & Improvements

| Issue | Description |
|---|---|
| No error responses on generate | `generateInterveiwController` catches errors but doesn't send an error response to the client |
| Token blacklist never expires | Blacklisted tokens accumulate forever — add a MongoDB TTL index matching JWT expiry |
| Multer size config wrong | `size` should be `limits` in multer config |
| No loading state on auth | `AuthContext` doesn't handle the case where `get-me` is slow on first load |
| CORS hardcoded | `origin: "http://localhost:5173"` should come from an env variable for production |
| No input sanitization | Job description and self-description are passed directly to the AI prompt |
| `pdf-parse` API usage | `new pdfParse.PDFParse(...)` is non-standard — the library exports a function, not a class |
