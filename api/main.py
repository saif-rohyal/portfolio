"""
FastAPI Server for Saif Rohyal's Portfolio AI Agent & Backend Services
"""

import os
import json
import asyncio
from typing import List, Optional
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, JSONResponse
from pydantic import BaseModel, EmailStr, Field
from dotenv import load_dotenv

from .agent import stream_chat_response, KNOWLEDGE

load_dotenv()

app = FastAPI(
    title="Saif Rohyal AI Portfolio API",
    description="Backend services, streaming RAG chat agent, and contact validation for Saif Rohyal's portfolio",
    version="1.0.0"
)

# CORS setup
origins_env = os.getenv("CORS_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000")
allowed_origins = [orig.strip() for orig in origins_env.split(",") if orig.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins if allowed_origins else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=1000)
    history: Optional[List[ChatMessage]] = None

class ContactRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    subject: Optional[str] = "Portfolio Contact"
    message: str = Field(..., min_length=10, max_length=3000)

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "agent": "Saif Rohyal Portfolio AI Assistant",
        "model_provider": os.getenv("LLM_PROVIDER", "gemini"),
        "version": "1.0.0"
    }

@app.get("/api/knowledge")
async def get_knowledge():
    """Provides public factual data used by the portfolio"""
    return KNOWLEDGE

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    """
    Streaming SSE chat endpoint grounded in Saif Rohyal's verified credentials.
    """
    async def event_generator():
        try:
            async for token in stream_chat_response(request.message, [h.model_dump() for h in (request.history or [])]):
                data = json.dumps({"text": token})
                yield f"data: {data}\n\n"
                await asyncio.sleep(0.015)  # Natural typing cadence
            yield "data: [DONE]\n\n"
        except Exception as e:
            err_data = json.dumps({"error": str(e)})
            yield f"data: {err_data}\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        }
    )

@app.post("/api/contact")
async def contact_endpoint(contact: ContactRequest):
    """
    Handles contact form inquiries with input validation.
    """
    # In production, can forward to an email provider or webhook.
    # For now, validate and return a confirmed receipt.
    return {
        "success": True,
        "message": f"Thank you {contact.name}, your message has been received. Saif Rohyal will review it shortly."
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api.main:app", host="0.0.0.0", port=8000, reload=True)
