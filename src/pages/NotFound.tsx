import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => (
  <div className="min-h-dvh flex items-center justify-center px-6 relative overflow-hidden">
    <div className="absolute top-1/4 left-1/4 size-96 rounded-full bg-flow/15 blur-[120px] animate-float" />
    <div className="absolute bottom-1/4 right-1/4 size-96 rounded-full bg-cyan-glow/15 blur-[120px] animate-float" style={{ animationDelay: "2s" }} />

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative text-center space-y-6 max-w-md"
    >
      <div className="inline-flex size-16 rounded-3xl bg-gradient-flow shadow-flow items-center justify-center animate-pulse-glow">
        <Sparkles className="size-7 text-void" />
      </div>
      <h1 className="font-display text-7xl md:text-9xl font-light text-gradient italic">404</h1>
      <p className="font-display text-2xl text-ice">This thought drifted away</p>
      <p className="text-muted-foreground">The page you sought doesn't exist in this stream. Let's flow back home.</p>
      <Button asChild className="rounded-2xl bg-gradient-flow text-void font-semibold hover:opacity-90 shadow-flow">
        <Link to="/"><Home className="size-4 mr-2" /> Return home</Link>
      </Button>
    </motion.div>
  </div>
);

export default NotFound;
