"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X, Send, RotateCcw, Bot, User } from "lucide-react";
import { AVATAR_BLUR_DATA_URL } from "@/data/image-meta";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What are Saif's skills?",
  "Tell me about his AI agent projects",
  "What are his GitHub projects?",
  "List his certifications",
  "What is his work experience?",
  "How can I hire Saif?"
];

export function RobotAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I am Saif Rohyal's AI Portfolio Assistant. I can answer questions regarding Saif's multi-agent AI projects, skills, certifications, work experience at Al-Ahad International Tech, and availability for roles. What would you like to know?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isWaving, setIsWaving] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (messageText: string) => {
    const text = messageText.trim();
    if (!text || isStreaming) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsStreaming(true);

    const assistantMsgId = `assistant-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: assistantMsgId, role: "assistant", content: "" }
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const dataStr = line.replace("data: ", "").trim();
            if (dataStr === "[DONE]") continue;

            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.text) {
                accumulated += parsed.text;
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantMsgId ? { ...msg, content: accumulated } : msg
                  )
                );
              }
            } catch {
              // Non-JSON chunk
            }
          }
        }
      }
    } catch {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsgId
            ? {
                ...msg,
                content:
                  "I apologize, but I could not reach the backend service right now. You can reach Saif directly at saifullahjan5417st@gmail.com."
              }
            : msg
        )
      );
    } finally {
      setIsStreaming(false);
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Chat cleared! Ask me anything about Saif Rohyal's verified portfolio and background."
      }
    ]);
  };

  return (
    <>
      {/* Floating Robot Trigger (Bottom Right) */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3">
        
        {/* Subtle helper pill on hover */}
        {!isOpen && (
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-surface-border shadow-soft text-xs font-mono text-foreground animate-in fade-in slide-in-from-right-3">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span>Ask Saif&apos;s AI</span>
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setIsWaving(true)}
          onMouseLeave={() => setIsWaving(false)}
          aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
          className="relative group p-1.5 rounded-2xl bg-surface border-2 border-accent/40 shadow-soft-lg hover:border-accent hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent"
        >
          {/* Animated Custom SVG Robot */}
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
            
            <svg
              viewBox="0 0 64 64"
              className="w-full h-full drop-shadow-sm select-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Antenna with pulse beacon */}
              <line x1="32" y1="14" x2="32" y2="8" stroke="#E0633B" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="32" cy="7" r="3" fill="#E0633B" className="animate-pulse" />

              {/* Ears / Headset */}
              <rect x="12" y="24" width="4" height="10" rx="2" fill="#E0633B" />
              <rect x="48" y="24" width="4" height="10" rx="2" fill="#E0633B" />

              {/* Robot Head */}
              <rect x="16" y="14" width="32" height="28" rx="8" fill="#1C2027" stroke="#E0633B" strokeWidth="2" />

              {/* Face Visor Display */}
              <rect x="20" y="20" width="24" height="14" rx="4" fill="#0F1115" />

              {/* Blinking Eyes (SVG Keyframe animation via CSS) */}
              <circle cx="26" cy="27" r="2.5" fill="#E0633B" className="animate-blink" />
              <circle cx="38" cy="27" r="2.5" fill="#E0633B" className="animate-blink" />

              {/* Robot Body / Collar */}
              <path d="M22 42 L42 42 L46 54 L18 54 Z" fill="#1C2027" stroke="#262B35" strokeWidth="1.5" />

              {/* Waving Hand on Hover */}
              <g
                className={`transition-transform duration-300 origin-bottom-left ${
                  isWaving ? "rotate-12 translate-y-[-2px]" : ""
                }`}
              >
                <circle cx="14" cy="46" r="3" fill="#E0633B" />
              </g>
              <circle cx="50" cy="46" r="3" fill="#E0633B" />
            </svg>

            {/* Notification Badge */}
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-accent border-2 border-surface" />
          </div>
        </button>
      </div>

      {/* Chat Window / Mobile Full-Height Bottom Sheet */}
      {isOpen && (
        <div className="fixed inset-x-0 bottom-0 sm:inset-auto sm:bottom-24 sm:right-6 z-50 w-full sm:w-[420px] h-[92vh] sm:h-[600px] max-h-[85vh] sm:max-h-[620px] bg-surface border-t sm:border border-surface-border sm:rounded-2xl shadow-soft-lg flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 duration-200">
          
          {/* Header */}
          <div className="p-4 border-b border-surface-border bg-surface-muted/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Saif Photo circular avatar */}
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-accent/40 bg-surface">
                <Image
                  src="/images/saif-160.webp"
                  alt="Saif Rohyal"
                  fill
                  sizes="36px"
                  placeholder="blur"
                  blurDataURL={AVATAR_BLUR_DATA_URL}
                  className="object-cover object-top"
                />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-bold text-sm text-foreground">
                    Saif&apos;s Assistant
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" title="Online" />
                </div>
                <div className="text-[10px] font-mono text-muted-foreground">
                  Grounded Factual Agent (Zero Hallucination)
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={resetChat}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
                title="Reset conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
                title="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-lg bg-accent text-accent-foreground flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed max-w-[85%] whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-accent text-accent-foreground rounded-tr-none font-medium shadow-accent-sm"
                      : "bg-surface-muted text-foreground border border-surface-border/70 rounded-tl-none font-sans"
                  }`}
                >
                  {msg.content || (
                    <div className="flex items-center gap-1.5 py-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce [animation-delay:0.4s]" />
                    </div>
                  )}
                </div>

                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-lg bg-surface-muted border border-surface-border text-muted-foreground flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggested Prompts Chips */}
          <div className="p-2 border-t border-surface-border/60 bg-surface/50 overflow-x-auto scrollbar-none flex gap-1.5">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(q)}
                disabled={isStreaming}
                className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-surface border border-surface-border text-muted-foreground hover:text-accent hover:border-accent whitespace-nowrap transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box (Pinned above mobile keyboard) */}
          <div className="p-3 border-t border-surface-border bg-surface">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Saif's experience, projects, skills..."
                disabled={isStreaming}
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-surface-border bg-surface-muted text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-colors disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={!input.trim() || isStreaming}
                className="p-2.5 rounded-xl bg-accent text-accent-foreground hover:bg-accent-hover shadow-accent-sm disabled:opacity-40 transition-all active:scale-95"
                title="Send query"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
}
