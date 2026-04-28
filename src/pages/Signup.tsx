import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Check, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

function strength(pw: string) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

export default function Signup() {
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const s = strength(pw);
  const labels = ["Too weak", "Weak", "Okay", "Strong", "Excellent"];
  const colors = ["bg-destructive", "bg-destructive", "bg-yellow-500", "bg-flow", "bg-flow"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Account created — welcome to Fluere ✨");
      navigate("/dashboard");
    }, 900);
  };

  return (
    <div className="min-h-dvh flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 size-[500px] rounded-full bg-flow/10 blur-[140px] animate-float" />
      <div className="absolute bottom-0 right-1/4 size-[400px] rounded-full bg-cyan-glow/10 blur-[120px] animate-float" style={{ animationDelay: "2s" }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-strong rounded-3xl p-8 md:p-10 shadow-elegant">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="size-10 rounded-2xl bg-gradient-flow shadow-flow flex items-center justify-center">
                <Sparkles className="size-5 text-void" />
              </div>
              <span className="font-display text-2xl font-semibold">Fluere</span>
            </Link>
            <h1 className="font-display text-3xl font-light">Create your space</h1>
            <p className="text-sm text-muted-foreground mt-2">Begin synthesizing in under a minute</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <Button variant="outline" className="rounded-xl glass border-border/60 hover:bg-muted/40">
              <svg className="size-4 mr-2" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z"/></svg>
              Google
            </Button>
            <Button variant="outline" className="rounded-xl glass border-border/60 hover:bg-muted/40">
              <Github className="size-4 mr-2" /> GitHub
            </Button>
          </div>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-border/60" />
            <span className="text-xs text-muted-foreground uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-border/60" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" required placeholder="Elias Thorne" className="rounded-xl bg-muted/40 border-border/60 h-11 focus-visible:ring-flow" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required placeholder="you@workspace.com" className="rounded-xl bg-muted/40 border-border/60 h-11 focus-visible:ring-flow" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pw">Password</Label>
              <Input id="pw" type="password" required value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••••" className="rounded-xl bg-muted/40 border-border/60 h-11 focus-visible:ring-flow" />
              {pw && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex gap-1">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className={cn("h-1 flex-1 rounded-full transition-colors", i < s ? colors[s] : "bg-muted")} />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">{labels[s]}</p>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpw">Confirm password</Label>
              <Input id="cpw" type="password" required placeholder="••••••••" className="rounded-xl bg-muted/40 border-border/60 h-11 focus-visible:ring-flow" />
            </div>

            <div className="flex items-start gap-2">
              <Checkbox id="terms" required className="mt-0.5" />
              <Label htmlFor="terms" className="text-sm font-normal cursor-pointer leading-snug">
                I agree to the <Link to="#" className="text-flow hover:underline">Terms</Link> and <Link to="#" className="text-flow hover:underline">Privacy Policy</Link>
              </Label>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-flow text-void font-semibold hover:opacity-90 shadow-flow h-11"
            >
              {loading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="size-4 border-2 border-void/30 border-t-void rounded-full" />
              ) : (<><Check className="size-4 mr-2" /> Create account</>)}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have one? <Link to="/login" className="text-flow hover:underline">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
