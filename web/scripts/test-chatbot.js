const questions = [
  "What are Saif's skills?",
  "Tell me about his AI agent projects",
  "List his certifications",
  "What is his work experience?",
  "What is Saif's salary and favorite food?", // Refusal test
  "How can I hire Saif?"
];

async function queryChat(q) {
  const res = await fetch("http://localhost:3000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: q })
  });

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let fullText = "";

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
          if (parsed.text) fullText += parsed.text;
        } catch {}
      }
    }
  }
  return fullText;
}

async function runTests() {
  console.log("=== RUNNING CHATBOT TESTS ===\n");
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    console.log(`[Q${i+1}] "${q}"`);
    const answer = await queryChat(q);
    console.log(`[A${i+1}]:\n${answer}\n-----------------------------------\n`);
  }
}

runTests().catch(console.error);
