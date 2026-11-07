import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

    // Attempt to stream from FastAPI backend
    try {
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(6000),
      });

      if (response.ok && response.body) {
        return new Response(response.body, {
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
          },
        });
      }
    } catch {
      // Backend temporarily unreachable; use client-grounded fallback stream below
    }

    // Direct grounded local fallback response
    const query = (body.message || "").toLowerCase();
    let reply = "";

    // Explicit GPA refusal check
    if (/\b(gpa|cgpa|grade|grades|marks|score)\b/.test(query)) {
      reply = "That detail is not shared in Saif's public portfolio records. Please feel free to reach out to Saif directly at saifullahjan5417st@gmail.com or through the Contact form on this site.";
    } else {
      const refusalPatterns = [
        /\bgirlfriend\b/, /\bwife\b/, /\bsalary\b/, /\bpolitics\b/, /\breligion\b/,
        /\bcrypto\b/, /\bhack\b/, /\bfavorite food\b/, /\bstocks\b/, /\bage\b/, /\bhow old\b/
      ];

      if (refusalPatterns.some(p => p.test(query))) {
        reply = "I don't have that information in Saif's verified portfolio records. Please feel free to reach out to Saif directly at saifullahjan5417st@gmail.com or through the Contact form on this site.";
      } else if (query.includes("project") || query.includes("github") || query.includes("agent") || query.includes("built")) {
        reply = "**Saif Rohyal has built five end-to-end AI projects:**\n1. **Smart AI Recognition System** (Computer Vision, PyTorch, FastAPI)\n2. **Autonomous E-Commerce Ops Agent** (LangGraph multi-agent workforce)\n3. **Autonomous Research & Experiment Agent** (Self-correcting sandbox agent)\n4. **AI Customer Support Copilot** (Full Stack RAG with live knowledge panel)\n5. **Voice Booking Assistant** (Real-time voice streaming agent)\n\nAll source code is hosted on Saif's GitHub: https://github.com/saif-rohyal";
      } else if (query.includes("skill") || query.includes("stack") || query.includes("tech")) {
        reply = "**Saif Rohyal's Core Skills:**\n- **AI & Multi-Agent:** LangGraph, LangChain, OpenAI Agents SDK, CrewAI, AutoGen, MCP, n8n, Computer Vision, Voice Agents\n- **Backend:** Python, FastAPI, REST, Streaming WebSockets & SSE, Pydantic\n- **Data:** SQL, Excel, Power BI\n- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion\n\nHe specializes in multi-agent supervisor loops and MCP tool integrations.";
      } else if (query.includes("certif") || query.includes("coursera") || query.includes("credential")) {
        reply = "**Saif Rohyal holds 8 certifications:**\n- Google Prompting Essentials Specialization (Oct 2026, ID: `DFTENC93E8V5`)\n- Google AI Essentials (Aug 2026, ID: `8N0ATH5OHM58`)\n- Understanding Agentic AI (Digital Workforce Services, Aug 2026, ID: `67432c58827e1409ba0ccf8a`)\n- Intro to Computer Science & Programming Spec (Univ of London/Goldsmiths, May 2025, ID: `8SKK5B0FBH9P`)\n- Intro to Computer Programming (Univ of London, May 2025, ID: `UAFACJ271VIN`)\n- How Computers Work (Univ of London, May 2025, ID: `2YNF84K30MJP`)\n- English Intermediate B1 (Univ of Naples Federico II, Jan 2025)\n- Intro to Python (Arizona State Univ, Jan 2025, ID: `JUZENZLXQCSI`)\n\nAll credentials have verification links in the Credentials section.";
      } else if (query.includes("experience") || query.includes("job") || query.includes("al-ahad")) {
        reply = "**Saif Rohyal's Experience:**\n**Junior AI Engineer** at **Al-Ahad International Tech (Pvt) Ltd** (July–September 2026, Timergara, KPK).\nKey work: Designed multi-agent workflows with LangGraph and LangChain, developed FastAPI backend services, integrated tools using MCP and n8n, and prototyped voice & customer support assistants.";
      } else if (query.includes("education") || query.includes("degree") || query.includes("university")) {
        reply = "**Saif Rohyal's Education:**\n- **Degree:** BS Information Technology\n- **Institution:** Ghazi University, Dera Ghazi Khan, Punjab, Pakistan\n- **Duration:** September 2024 – September 2028 (Ongoing)";
      } else if (query.includes("hire") || query.includes("contact") || query.includes("email") || query.includes("linkedin")) {
        reply = "**How to Hire / Reach Saif Rohyal:**\n- **Target Roles:** Full Stack AI Engineer, Agentic AI Engineer, Remote AI Roles, Startups\n- **Email:** saifullahjan5417st@gmail.com\n- **Location:** Peshawar, Pakistan (Open to remote)\n- **GitHub:** https://github.com/saif-rohyal\n- **LinkedIn:** https://linkedin.com/in/saif-rohyal\n- **WhatsApp:** Reach out using the WhatsApp button in the Contact section.";
      } else {
        reply = "Saif Rohyal is a Full Stack AI Engineer specializing in autonomous multi-agent systems (LangGraph, LangChain, MCP) and Python/FastAPI backends. You can ask me about his skills, 5 projects, work experience at Al-Ahad, 8 certifications, or how to contact him.";
      }
    }

    const words = reply.split(" ");
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        for (let i = 0; i < words.length; i++) {
          const chunk = words[i] + (i < words.length - 1 ? " " : "");
          const sseEvent = `data: ${JSON.stringify({ text: chunk })}\n\n`;
          controller.enqueue(encoder.encode(sseEvent));
          await new Promise((r) => setTimeout(r, 16));
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
