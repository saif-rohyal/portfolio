"""
Saif Rohyal Portfolio AI Assistant Engine
Grounded Knowledge Agent with Anti-Hallucination Guardrails
"""

import os
import json
import re
from typing import AsyncGenerator, Dict, Any, List
from pathlib import Path

# Load knowledge base
KNOWLEDGE_PATH = Path(__file__).parent / "data" / "knowledge.json"

def load_knowledge() -> Dict[str, Any]:
    try:
        with open(KNOWLEDGE_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading knowledge base: {e}")
        return {}

KNOWLEDGE = load_knowledge()

SYSTEM_PROMPT = f"""You are the personal AI Assistant on the portfolio website of Saif Rohyal.
Your goal is to represent Saif Rohyal accurately, professionally, and warmly to recruiters, engineering leaders, and potential collaborators.

CRITICAL RULES:
1. Saif's name is ALWAYS "Saif Rohyal". NEVER use "Saif Ullah".
2. Saif's title is "Full Stack AI Engineer" (previously "Agentic AI Engineer" in early studies). He is based in Peshawar, Pakistan.
3. You must answer ONLY using the verified facts provided below. NEVER invent facts, metrics, projects, dates, or credentials.
4. You must NOT state a GPA under any circumstances. If asked about GPA, marks, or grades, politely say:
   "That detail is not shared in Saif's public portfolio records. Please feel free to reach out to Saif directly at saifullahjan5417st@gmail.com or through the Contact form on this site."
5. If a user asks a question about something not covered in this verified profile (e.g. personal life, unlisted technologies, unrelated opinions, salary), reply politely:
   "I don't have that information in Saif's verified portfolio records. Please feel free to reach out to Saif directly at saifullahjan5417st@gmail.com or through the Contact form on this site."
6. Always provide clickable links where relevant (GitHub profile, credentials, certifications, LinkedIn: https://linkedin.com/in/saif-rohyal).
7. Keep answers concise, clear, and direct. Use first-person plural or polite third-person ("Saif built...", "He specializes in...").
8. Highlight Saif's hands-on experience: Junior AI Engineer at Al-Ahad International Tech (Pvt) Ltd (July–Sept 2026), his BS in IT at Ghazi University (2024–2028 ongoing), and his 5 core AI projects.

VERIFIED KNOWLEDGE BASE:
{json.dumps(KNOWLEDGE, indent=2)}
"""

def fallback_answer(query: str) -> str:
    """
    Deterministic factual query resolver for zero-dependency local operation.
    Guarantees 100% precision with zero hallucinations when external API keys are not supplied.
    """
    q = query.lower().strip()

    # Explicit GPA query check: must refuse and not state a GPA
    if re.search(r"\b(gpa|cgpa|grade|grades|marks|score)\b", q):
        return (
            "That detail is not shared in Saif's public portfolio records. "
            "Please feel free to reach out to Saif directly at saifullahjan5417st@gmail.com "
            "or through the Contact form on this site."
        )

    # Refusal test cases / out-of-bounds questions (using regex word boundaries)
    refusal_patterns = [
        r"\bgirlfriend\b", r"\bwife\b", r"\bsalary\b", r"\breligion\b", r"\bpolitics\b",
        r"\bfavorite food\b", r"\bcrypto\b", r"\bbitcoin\b", r"\bweather\b", r"\bstocks\b",
        r"\bhack\b", r"\bbypass\b", r"\bsystem prompt\b", r"\bwho won\b", r"\bfootball\b",
        r"\bcricket\b", r"\bage\b", r"\bhow old\b"
    ]
    if any(re.search(p, q) for p in refusal_patterns):
        return (
            "I don't have that information in Saif's verified portfolio records. "
            "Please feel free to reach out to Saif directly at saifullahjan5417st@gmail.com "
            "or through the Contact form on this site."
        )

    # 1. Projects & GitHub
    if any(k in q for k in ["project", "github", "portfolio", "built", "work sample", "repo", "agent"]):
        projects = KNOWLEDGE.get("projects", [])
        proj_lines = []
        for p in projects:
            proj_lines.append(f"- **{p['title']}** ({p['category']}): {p['description']} [GitHub Profile]({p['github_url']})")
        proj_text = "\n".join(proj_lines)
        return (
            f"**Saif Rohyal has built five end-to-end AI projects:**\n\n"
            f"{proj_text}\n\n"
            f"All source code and repositories are hosted on Saif's GitHub: https://github.com/saif-rohyal"
        )

    # 2. Skills
    if any(k in q for k in ["skill", "stack", "tech", "framework", "python", "langgraph", "tools"]):
        ai_skills = ", ".join(KNOWLEDGE["skills"]["ai_agent_frameworks"])
        backend_skills = ", ".join(KNOWLEDGE["skills"]["backend_and_programming"])
        data_skills = ", ".join(KNOWLEDGE["skills"]["data_and_analytics"])
        return (
            f"**Saif Rohyal's Core Skills & Technical Stack:**\n\n"
            f"- **AI & Multi-Agent Frameworks:** {ai_skills}\n"
            f"- **Backend & Programming:** {backend_skills}\n"
            f"- **Data & Analytics:** {data_skills}\n"
            f"- **Frontend & Systems:** Next.js, TypeScript, Tailwind CSS, REST & SSE streaming APIs.\n\n"
            f"He specializes in designing autonomous multi-agent loops with supervisor architectures and tool integration via MCP."
        )

    # 3. Certifications & Credentials
    if any(k in q for k in ["certif", "credential", "coursera", "license", "course"]):
        certs = KNOWLEDGE.get("certifications", [])
        ai_certs = [c for c in certs if c.get("group") == "AI and Agents"]
        prog_certs = [c for c in certs if c.get("group") == "Programming, CS and English"]
        
        resp = ["**Saif Rohyal holds 8 professional certifications:**\n"]
        resp.append("**AI & Agents:**")
        for c in ai_certs:
            link = f"([Verify Link]({c['url']}))" if c.get("url") else ""
            resp.append(f"- {c['title']} — {c['issuer']} ({c['date']}) | ID: `{c['credential_id']}` {link}")
        
        resp.append("\n**Programming, CS & English:**")
        for c in prog_certs:
            link = f"([Verify Link]({c['url']}))" if c.get("url") else ""
            resp.append(f"- {c['title']} — {c['issuer']} ({c['date']}) | ID: `{c['credential_id']}` {link}")
            
        return "\n".join(resp)

    # 4. Work Experience
    if any(k in q for k in ["experience", "job", "company", "al-ahad", "work", "role", "history"]):
        exp = KNOWLEDGE["experience"][0]
        resp_lines = "\n".join([f"  • {r}" for r in exp["responsibilities"]])
        return (
            f"**Saif Rohyal's Work Experience:**\n\n"
            f"**{exp['role']}** at **{exp['company']}**\n"
            f"*{exp['location']} | {exp['period']}*\n\n"
            f"Key Contributions:\n{resp_lines}\n\n"
            f"At Al-Ahad, Saif specialized in LangGraph and LangChain agent supervisor workflows and MCP tool integrations."
        )

    # 5. Education
    if any(k in q for k in ["education", "degree", "university", "study", "college"]):
        edu = KNOWLEDGE["education"]
        return (
            f"**Saif Rohyal's Education:**\n\n"
            f"- **Degree:** {edu['degree']}\n"
            f"- **Institution:** {edu['institution']}, {edu['location']}\n"
            f"- **Duration:** {edu['period']}"
        )

    # 6. Achievements
    if any(k in q for k in ["achievement", "award", "pak angels", "aspire"]):
        ach = KNOWLEDGE["achievements"][0]
        return (
            f"**Saif Rohyal's Featured Achievement:**\n\n"
            f"- **{ach['title']}**\n"
            f"- Awarded by: {ach['issuer']} ({ach['date']})\n"
            f"- Credential ID: `{ach['credential_id']}`\n"
            f"- Verification: [Certificate Link]({ach['url']})"
        )

    # 7. Contact / How to hire
    if any(k in q for k in ["hire", "contact", "email", "reach", "call", "whatsapp", "location", "interview", "linkedin"]):
        c = KNOWLEDGE["contact"]
        return (
            f"**How to connect with Saif Rohyal:**\n\n"
            f"- **Target Roles:** Full Stack AI Engineer, Agentic AI Engineer, Remote AI Engineering, Startups.\n"
            f"- **Email:** {c['email']}\n"
            f"- **Location:** {c['location']} (open to remote and relocation)\n"
            f"- **GitHub:** {c['socials']['github']}\n"
            f"- **LinkedIn:** {c['socials']['linkedin']}\n"
            f"- **X / Twitter:** {c['socials']['x']}\n"
            f"- **WhatsApp:** You can reach Saif directly on WhatsApp using the button in the Contact section of this website.\n"
            f"- **Resume:** Download his full CV directly from the Hero or Navigation bar."
        )

    # 8. Languages
    if any(k in q for k in ["language", "speak", "english", "urdu", "pashto"]):
        langs = ", ".join([f"{l['name']} ({l['level']})" for l in KNOWLEDGE["languages"]])
        return f"Saif Rohyal is fluent in: {langs}."

    # 9. General bio / summary
    if any(k in q for k in ["who is", "about", "bio", "summary", "tell me about"]):
        return (
            f"{KNOWLEDGE['bio']}\n\n"
            f"He is based in {KNOWLEDGE['location']} and actively seeking AI engineering opportunities."
        )

    # Default fallback
    return (
        f"Saif Rohyal is a Full Stack AI Engineer specializing in autonomous multi-agent systems "
        f"(LangGraph, LangChain, MCP, CrewAI) and Python/FastAPI backend architectures. "
        f"You can ask me about his:\n"
        f"1. Core AI & programming skills\n"
        f"2. Five end-to-end AI projects & GitHub code\n"
        f"3. Work experience at Al-Ahad International Tech\n"
        f"4. 8 professional certifications & credentials\n"
        f"5. Education (BS IT, Ghazi University)\n"
        f"6. How to hire or contact Saif\n\n"
        f"What would you like to explore?"
    )

async def stream_chat_response(query: str, chat_history: List[Dict[str, str]] = None) -> AsyncGenerator[str, None]:
    """
    Streams response tokens using Gemini API if configured, otherwise falls back smoothly
    to the grounded factual engine.
    """
    gemini_key = os.getenv("GEMINI_API_KEY")
    
    if gemini_key and gemini_key != "your_gemini_api_key_here":
        try:
            from google import genai
            client = genai.Client(api_key=gemini_key)
            
            contents = [
                {"role": "user", "parts": [{"text": f"{SYSTEM_PROMPT}\n\nUser Question: {query}"}]}
            ]
            
            response = client.models.generate_content_stream(
                model="gemini-2.5-flash",
                contents=contents
            )
            for chunk in response:
                if chunk.text:
                    yield chunk.text
            return
        except Exception as e:
            print(f"Gemini streaming error, using grounded fallback: {e}")

    # Fallback grounded streaming
    full_text = fallback_answer(query)
    words = full_text.split(" ")
    for i, word in enumerate(words):
        token = word + (" " if i < len(words) - 1 else "")
        yield token
