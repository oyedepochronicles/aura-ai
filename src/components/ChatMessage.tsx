import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, RefreshCw, Check, Sparkles, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  sources?: { title: string; type: string }[];
}

export function ChatMessage({ message, onRegenerate }: { message: Message; onRegenerate?: () => void }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn("flex gap-4 group", isUser && "flex-row-reverse")}
    >
      <div
        className={cn(
          "size-9 shrink-0 rounded-2xl flex items-center justify-center border",
          isUser
            ? "bg-muted/40 border-border/60"
            : "bg-gradient-to-b from-flow/30 to-transparent border-flow/30"
        )}
      >
        {isUser ? <User className="size-4 text-ice/70" /> : <Sparkles className="size-4 text-flow" />}
      </div>

      <div className={cn("flex-1 min-w-0 max-w-[85%]", isUser && "flex flex-col items-end")}>
        {isUser ? (
          <div className="bg-muted/40 border border-border/60 rounded-2xl px-5 py-3 backdrop-blur-sm">
            <p className="text-base leading-relaxed text-ice/95">{message.content}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="prose prose-invert prose-sm max-w-none prose-p:text-ice/90 prose-p:leading-relaxed prose-p:font-light prose-headings:font-display prose-headings:text-ice prose-strong:text-flow prose-strong:font-medium prose-a:text-flow prose-code:text-flow prose-code:bg-muted/40 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-['']">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <div className="rounded-2xl overflow-hidden border border-border/60 my-3">
                        <div className="flex items-center justify-between px-4 py-2 bg-muted/40 border-b border-border/60">
                          <span className="text-xs font-mono text-muted-foreground uppercase">{match[1]}</span>
                        </div>
                        <SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div" customStyle={{ margin: 0, background: "hsl(var(--void-deep))" }}>
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <code className={className} {...props}>{children}</code>
                    );
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>

            {message.sources && message.sources.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-3">
                {message.sources.map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className="glass rounded-2xl p-4 hover:border-flow/30 transition-all cursor-pointer"
                  >
                    <p className="text-[10px] uppercase tracking-widest text-flow font-semibold">{src.type}</p>
                    <h4 className="font-display text-sm mt-1 text-ice">{src.title}</h4>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs text-muted-foreground hover:text-flow hover:bg-muted/40 transition-colors"
              >
                {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
                {copied ? "Copied" : "Copy"}
              </button>
              {onRegenerate && (
                <button
                  onClick={onRegenerate}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs text-muted-foreground hover:text-flow hover:bg-muted/40 transition-colors"
                >
                  <RefreshCw className="size-3" />
                  Regenerate
                </button>
              )}
              <span className="text-[10px] text-muted-foreground/50 ml-auto font-mono uppercase">{message.timestamp}</span>
            </div>
          </div>
        )}
        {isUser && (
          <span className="text-[10px] text-muted-foreground/50 mt-1.5 font-mono uppercase">{message.timestamp}</span>
        )}
      </div>
    </motion.div>
  );
}

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex gap-4"
    >
      <div className="size-9 shrink-0 rounded-2xl flex items-center justify-center bg-gradient-to-b from-flow/30 to-transparent border border-flow/30">
        <Sparkles className="size-4 text-flow animate-pulse" />
      </div>
      <div className="flex items-center gap-1.5 px-4 py-3">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="size-2 rounded-full bg-flow"
            animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </motion.div>
  );
}
