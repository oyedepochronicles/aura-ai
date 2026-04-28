import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-dvh flex items-center justify-center px-6 relative overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute top-1/4 -left-20 size-96 rounded-full bg-flow/20 blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 -right-20 size-96 rounded-full bg-cyan-glow/20 blur-[120px] animate-float" style={{ animationDelay: "2s" }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-3xl text-center space-y-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-flow/20 text-xs uppercase tracking-widest text-flow font-mono"
        >
          <Sparkles className="size-3" /> RAG Engine V4.2
        </motion.div>

        <h1 className="font-display text-5xl md:text-7xl font-light leading-[1.05] tracking-tight">
          Knowledge,
          <br />
          <span className="text-gradient italic font-normal">unfurled.</span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-xl mx-auto font-light leading-relaxed">
          A premium AI workspace that retrieves, reasons, and synthesizes across your documents — like thoughts moving through water.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button
            size="lg"
            onClick={() => navigate("/dashboard")}
            className="rounded-2xl bg-gradient-flow text-void font-semibold hover:opacity-90 shadow-flow group h-12 px-8"
          >
            Enter Workspace
            <ArrowRight className="size-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/login")}
            className="rounded-2xl glass border-border/60 hover:bg-muted/40 hover:text-flow h-12 px-8"
          >
            Sign In
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
