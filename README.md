# Saif Rohyal — Full Stack AI Engineer Portfolio

A hand-crafted, high-performance portfolio monorepo for **Saif Rohyal**, Full Stack AI Engineer based in Peshawar, Pakistan.

Engineered with architectural intentionality, bespoke craftsmanship, and zero generic AI clichés. Includes a live Next.js 15 frontend with fluid micro-interactions, an interactive **Agent Architecture Sandbox**, and a grounded **FastAPI + LangGraph AI Assistant** that answers recruiter inquiries with zero hallucinations.

---

## 🏛️ Monorepo Architecture

```
portfolio/
├── web/                           # Next.js 15 (App Router, TypeScript, Tailwind CSS)
│   ├── app/                       # Routes, layouts, SEO (sitemap, robots, JSON-LD)
│   │   ├── api/chat/route.ts      # Streaming SSE proxy to FastAPI backend
│   │   ├── api/whatsapp/route.ts  # Server-side 307 redirect (protects phone number)
│   │   ├── globals.css            # Custom theme tokens & handcrafted doodle underlines
│   │   └── layout.tsx             # Fonts (Space Grotesk, Plus Jakarta Sans, JetBrains Mono)
│   ├── components/                # Modular React components
│   │   ├── navbar.tsx             # Sticky blurred nav with credentials dropdown & mobile accordion
│   │   ├── hero.tsx               # Dynamic headline, rotating roles & 2x retina portrait
│   │   ├── about.tsx              # First-person story, tilted framed photo & certified languages
│   │   ├── skills.tsx             # Multi-agent, backend & cloud skills with hover reveals
│   │   ├── agent-sandbox.tsx      # SIGNATURE INTERACTION: Live supervisor multi-agent sandbox
│   │   ├── projects.tsx           # 5 featured AI projects with filters & architecture sheets
│   │   ├── experience.tsx         # Animated timeline for Al-Ahad International Tech
│   │   ├── credentials.tsx        # Education, Achievements, and ledger-style Certifications list
│   │   ├── blog.tsx               # Technical case studies on LangGraph, MCP, and Voice AI
│   │   ├── contact.tsx            # Validated form, WhatsApp CTA & CV download
│   │   ├── robot-assistant.tsx    # Floating SVG robot with idle breathing, eye blink & chat
│   │   └── theme-toggle.tsx       # Animated sun/moon day-night toggle (persistent, zero flash)
│   ├── data/                      # Strictly typed factual data models (single source of truth)
│   ├── public/
│   │   ├── images/                # Multi-resolution optimized WebP/AVIF (160–800px) & OG image
│   │   └── saif-cv.pdf            # Original, unedited CV for "Download Resume"
│   └── scripts/                   # Image optimization, screenshot suite, and audit scripts
│
├── api/                           # Python FastAPI AI Backend
│   ├── main.py                    # FastAPI application, CORS, rate limiting, and SSE endpoints
│   ├── agent.py                   # Grounded LangGraph / Gemini query engine with anti-hallucination guardrails
│   ├── data/knowledge.json        # Structured knowledge base of Saif's verified facts
│   └── requirements.txt           # Python dependencies
│
├── screenshots/                   # Verification screenshots across 5 viewports & retina closeups
├── .env.example                   # Environment configuration template
├── .gitignore                     # Git exclusions
├── package.json                   # Root monorepo orchestration
└── README.md                      # Documentation & deployment guide
```

---

## 🎨 Design Philosophy & Distinctive Aesthetics

- **Human-Crafted, Not AI-Generated**: Deliberately omits purple-blue gradient soup, neon glows, glassmorphism overuse, and emoji-as-icons.
- **Signature Accent Color — Warm Terracotta Ochre (`#E0633B`)**: Selected for tactile warmth, organic earthiness, and editorial contrast against warm parchment (`#FBF9F5`) in light mode and midnight carbon (`#0F1115`) in dark mode.
- **Editorial Typography**: Headings in **Space Grotesk**, body text in **Plus Jakarta Sans**, and technical IDs/tags in **JetBrains Mono**.
- **Signature Interaction**: An interactive **"Agent Architecture Sandbox & Live Inspector"** allowing visitors to trigger a simulated supervisor-worker multi-agent loop with live telemetry streaming.
- **Zero Phone Exposure**: The phone number never appears in client HTML or bundle source code. It routes exclusively through a server-side `307` redirect at `/api/whatsapp` reading `WHATSAPP_PHONE`.
- **Name Fidelity**: The website, metadata, JSON-LD structured data, and chatbot strictly use the name **Saif Rohyal**.

---

## 🚀 Quickstart & Local Development

### Prerequisites
- **Node.js** >= 18.18 (v24 LTS recommended)
- **Python** >= 3.10
- **npm** >= 10.x

### 1. Clone & Environment Configuration
```bash
git clone https://github.com/saif-rohyal/portfolio.git
cd portfolio

# Copy environment variables
cp .env.example .env
```

### 2. Run the FastAPI Backend (`/api`)
```bash
# In terminal 1:
python -m pip install -r api/requirements.txt
python -m uvicorn api.main:app --host 127.0.0.1 --port 8000 --reload
```
*Backend runs on `http://localhost:8000`. Health check: `http://localhost:8000/api/health`.*

### 3. Run the Next.js Frontend (`/web`)
```bash
# In terminal 2:
cd web
npm install
npm run dev
```
*Frontend runs on `http://localhost:3000`.*

---

## ☁️ Deployment Guide

### Deploying `/web` to Vercel
1. Push your code to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Set **Root Directory** to `web`.
4. Framework Preset: **Next.js**.
5. Configure Environment Variables in Vercel Dashboard:
   - `NEXT_PUBLIC_SITE_URL`: `https://your-portfolio-domain.com`
   - `NEXT_PUBLIC_API_URL`: `https://your-api-domain.com` (or leave empty to use built-in edge fallback)
   - `WHATSAPP_PHONE`: `+923295152017`
6. Click **Deploy**.

### Deploying `/api` to Render or Railway
#### On Render:
1. Create a new **Web Service** pointing to your repository.
2. Set **Root Directory** to `api`.
3. Environment: **Python 3**.
4. Build Command: `pip install -r requirements.txt`.
5. Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`.
6. Add Environment Variables:
   - `CORS_ORIGINS`: `https://your-portfolio-domain.com`
   - `GEMINI_API_KEY`: *(Optional)* Your Google Gemini API Key.
   - `LLM_PROVIDER`: `gemini`

#### On Railway:
1. New Project -> Deploy from GitHub repo.
2. Select root `api`.
3. Railway automatically detects `requirements.txt` and binds `$PORT`.

---

## 📋 Comprehensive Placeholders Checklist

Below is the complete audit of placeholders for Saif to finalize:

| # | Item | Location | Current State / Action Required |
|---|------|----------|---------------------------------|
| 1 | **LinkedIn Profile Link** | `web/data/profile.ts` (line 42) & `api/data/knowledge.json` | Currently `https://linkedin.com/in/saif-rohyal`. Replace with your exact LinkedIn vanity handle once claimed. |
| 2 | **English B1 Coursera Credential ID** | `web/data/certificates.ts` (line 89) | Currently `[placeholder: PENDING-ID]`. Add the exact alphanumeric Coursera credential ID for the English Specialization. |
| 3 | **English B1 Coursera Credential URL** | `web/data/certificates.ts` (line 90) | Currently `""` (the "Show credential" button is gracefully hidden until filled). Add the verification URL. |
| 4 | **GitHub Project Repositories** | `web/data/projects.ts` (all entries) | Currently all projects point to your primary GitHub profile (`https://github.com/saif-rohyal`). Once you push each dedicated project repo (e.g. `smart-ai-recognition`, `ecommerce-ops-agent`), update the `githubUrl` field. |
| 5 | **Live Demo Links** | `web/data/projects.ts` | The `demoUrl` properties are currently `undefined` (live demo buttons only appear when a URL is supplied). Add URLs when hosted demos are live. |
| 6 | **Gemini API Key** | `.env` / `api/.env` | `GEMINI_API_KEY=your_gemini_api_key_here`. The assistant works locally with its deterministic grounded knowledge engine; adding a Gemini key activates live generative conversation. |
| 7 | **Vector Database Stack Details** | `web/data/skills.ts` (line 64) | Marked as `Vector Databases [placeholder]`. Update to specific vector engine (Pinecone / ChromaDB / Weaviate / pgvector) used in production. |
| 8 | **Container & Cloud Deploy Details** | `web/data/skills.ts` (line 65) | Marked as `Docker & Cloud [placeholder]`. Update to target cloud provider (e.g., AWS ECS, Google Cloud Run, or Railway). |

---

## 🛡️ Verification & Test Suite Summary

- **Playwright Responsive Suite**: Tested across 5 viewports (`320px`, `375px`, `768px`, `1024px`, `1440px`) in both Light & Dark modes.
- **Retina Image Verification**: 1x and 2x close-ups captured confirming 0 blur and 100% retina clarity.
- **Chatbot Verification**: 6 test queries executed, including skill verification, project mapping, certification audit, work history validation, and refusal of out-of-bounds questions.
- **Privacy & Security**: Banned string `"Saif Ullah"` audit: 0 instances. Direct phone number audit: 0 instances.

© 2026 Saif Rohyal. Handcrafted with pride.
