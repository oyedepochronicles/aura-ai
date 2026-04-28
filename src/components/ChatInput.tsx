import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Paperclip, Mic, ArrowUp, X, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ChatInputProps {
  onSend: (text: string, files?: File[]) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (!value.trim() && files.length === 0) return;
    onSend(value.trim(), files);
    setValue("");
    setFiles([]);
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
  };

  const handleFiles = useCallback((list: FileList | null) => {
    if (!list) return;
    const arr = Array.from(list);
    const valid = arr.filter((f) => {
      if (f.size > 20 * 1024 * 1024) {
        toast.error(`${f.name} exceeds 20MB`);
        return false;
      }
      return true;
    });
    setFiles((prev) => [...prev, ...valid].slice(0, 10));
  }, []);

  return (
    <div
      className={cn("relative group", dragActive && "ring-2 ring-flow rounded-3xl")}
      onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
      onDragLeave={() => setDragActive(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragActive(false);
        handleFiles(e.dataTransfer.files);
      }}
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-flow/20 to-cyan-glow/20 rounded-3xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative glass-strong rounded-3xl p-3 shadow-elegant">
        {files.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3 px-2">
            {files.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-flow/10 border border-flow/20"
              >
                <FileText className="size-3.5 text-flow" />
                <span className="text-xs text-ice truncate max-w-[160px]">{f.name}</span>
                <button
                  onClick={() => setFiles(files.filter((_, j) => j !== i))}
                  className="text-muted-foreground hover:text-destructive"
                  aria-label="Remove file"
                >
                  <X className="size-3" />
                </button>
              </motion.div>
            ))}
          </div>
        )}

        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder={dragActive ? "Drop files here..." : "Evolve your thought..."}
          disabled={disabled}
          rows={1}
          className="w-full bg-transparent border-none outline-none resize-none px-3 py-2 text-ice placeholder:text-muted-foreground/60 font-light text-base max-h-[200px]"
        />

        <div className="flex items-center justify-between mt-2 px-1">
          <div className="flex items-center gap-1">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              hidden
              onChange={(e) => handleFiles(e.target.files)}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="size-9 rounded-xl hover:bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-flow transition-colors"
              aria-label="Attach file"
            >
              <Paperclip className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => toast("Voice input coming soon")}
              className="size-9 rounded-xl hover:bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-flow transition-colors"
              aria-label="Voice input"
            >
              <Mic className="size-4" />
            </button>
            <span className="hidden sm:inline text-[10px] font-mono uppercase tracking-wider text-muted-foreground/60 ml-2">
              Shift + ⏎ for newline
            </span>
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={disabled || (!value.trim() && files.length === 0)}
            className="size-10 rounded-xl bg-gradient-flow flex items-center justify-center text-void shadow-flow hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
            aria-label="Send message"
          >
            {disabled ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="size-4 border-2 border-void/30 border-t-void rounded-full"
              />
            ) : (
              <ArrowUp className="size-4" strokeWidth={2.5} />
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
