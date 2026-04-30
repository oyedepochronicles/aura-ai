import { useEffect, useRef, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { ChatInput } from "@/components/ChatInput";
import { ChatMessage, Message, TypingIndicator } from "@/components/ChatMessage";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const sampleResponse = `The convergence of **quantum sensing** and abyssal bioluminescence creates a new frontier for oceanographic monitoring.

By utilizing nitrogen-vacancy (NV) diamond centers, we can detect magnetic fluctuations in photon emission that were previously invisible to electronic sensors.

\`\`\`python
# Simplified detection model
def detect_anomaly(photon_stream, depth_m=4000):
    coherence = measure_phase(photon_stream)
    return coherence > THRESHOLD * (depth_m / 1000)
\`\`\`

This approach allows for **non-invasive monitoring** of ecosystem health at depths where traditional lighting would disrupt natural behavior.`;

const starterPrompts = [
  "Summarize my latest uploaded documents",
  "Compare the methodologies in my research papers",
  "Extract key dates and figures from my reports",
  "Generate an executive briefing from this knowledge base",
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streaming]);

  const stop = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    intervalRef.current = null;
    timeoutRef.current = null;
    setStreaming(false);
  };

  useEffect(() => () => stop(), []);

  const send = (text: string) => {
    if (!text) return;
    const now = new Date();
    const ts = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const user: Message = { id: crypto.randomUUID(), role: "user", content: text, timestamp: ts };
    setMessages((m) => [...m, user]);
    setStreaming(true);

    // Simulate streaming
    const id = crypto.randomUUID();
    let i = 0;
    const placeholder: Message = { id, role: "assistant", content: "", timestamp: ts };
    timeoutRef.current = setTimeout(() => {
      setMessages((m) => [...m, placeholder]);
      intervalRef.current = setInterval(() => {
        i += 6;
        setMessages((m) =>
          m.map((msg) => (msg.id === id ? { ...msg, content: sampleResponse.slice(0, i) } : msg))
        );
        if (i >= sampleResponse.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          intervalRef.current = null;
          setMessages((m) =>
            m.map((msg) =>
              msg.id === id
                ? {
                    ...msg,
                    sources: [
                      { title: "Hadley Deep-Sea Lab Spectral Data", type: "Primary Source" },
                      { title: "NV Diamond Quantum Sensing — Nature 2024", type: "Verified Reference" },
                    ],
                  }
                : msg
            )
          );
          setStreaming(false);
        }
      }, 24);
    }, 500);
  };

  return (
    <AppLayout>
      <div className="flex-1 flex flex-col min-h-0 relative">
        <header className="hidden md:flex h-16 items-center justify-between px-8 border-b border-border/60 glass shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="font-display text-lg font-medium">Neural Synthesis</h2>
            <span className="px-3 py-1 rounded-full border border-flow/20 bg-flow/5 text-[10px] font-mono uppercase tracking-widest text-flow">
              RAG · Online
            </span>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            Context · 128k tokens
          </span>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 md:px-12 pt-8 pb-6">
          <div className="max-w-3xl mx-auto space-y-10 pb-20">
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center pt-16 space-y-8"
              >
                <div className="inline-flex size-16 rounded-3xl bg-gradient-flow shadow-flow items-center justify-center animate-pulse-glow">
                  <Sparkles className="size-7 text-void" />
                </div>
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-light">How can I help, <span className="text-gradient italic">Elias</span>?</h2>
                  <p className="text-muted-foreground mt-2 text-sm">Ask anything across your knowledge base.</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 max-w-xl mx-auto pt-4">
                  {starterPrompts.map((p, i) => (
                    <motion.button
                      key={p}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i }}
                      onClick={() => send(p)}
                      className="text-left p-4 rounded-2xl glass hover:border-flow/30 hover:bg-flow/5 transition-all text-sm text-ice/80 hover:text-flow"
                    >
                      {p}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {messages.map((m) => (
              <ChatMessage
                key={m.id}
                message={m}
                onRegenerate={m.role === "assistant" ? () => send(messages[messages.indexOf(m) - 1]?.content || "") : undefined}
              />
            ))}

            {streaming && messages[messages.length - 1]?.role === "user" && <TypingIndicator />}
          </div>
        </div>

        <div className="px-4 md:px-12 pb-6 pt-2">
          <div className="max-w-3xl mx-auto">
            <ChatInput onSend={send} streaming={streaming} onStop={stop} />
            <p className="text-center mt-3 text-[10px] text-muted-foreground/60 font-mono uppercase tracking-widest">
              Fluere may produce inaccurate insights · Always verify sources
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
