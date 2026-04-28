import { motion } from "framer-motion";
import { FileText, MessageSquare, HardDrive, TrendingUp, ArrowUpRight, Sparkles, Plus, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";

const stats = [
  { label: "Documents", value: "248", change: "+12", icon: FileText },
  { label: "AI Queries", value: "1,842", change: "+340", icon: MessageSquare },
  { label: "Storage", value: "4.2 GB", change: "of 20GB", icon: HardDrive },
  { label: "Synthesis Score", value: "98.4%", change: "+2.1%", icon: TrendingUp },
];

const prompts = [
  "Summarize my latest research uploads",
  "Extract key insights across all PDFs",
  "Compare findings between two documents",
  "Generate an executive briefing",
];

const recent = [
  { title: "Marine biology vs Quantum sensing", time: "2 minutes ago" },
  { title: "Architectural Fluidity Patterns", time: "4 hours ago" },
  { title: "Recursive Neural Geometries", time: "Yesterday" },
];

function bars() {
  return Array.from({ length: 14 }, () => 30 + Math.random() * 70);
}

export default function Dashboard() {
  const navigate = useNavigate();
  const data = bars();

  return (
    <AppLayout>
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-6 md:p-10 space-y-10">
          {/* Welcome */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-flow/20 text-[10px] font-mono uppercase tracking-widest text-flow">
              <Sparkles className="size-3" /> Good evening
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-light tracking-tight">
              Welcome back, <span className="text-gradient italic">Elias</span>
            </h1>
            <p className="text-muted-foreground">Your knowledge stream is flowing. Pick up where you left off.</p>
          </motion.section>

          {/* Stats */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className="glass rounded-2xl p-5 hover:border-flow/30 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="size-10 rounded-xl bg-flow/10 flex items-center justify-center text-flow group-hover:bg-flow/20 transition-colors">
                    <s.icon className="size-5" />
                  </div>
                  <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-flow group-hover:rotate-12 transition-all" />
                </div>
                <p className="font-display text-3xl font-light text-ice">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label} <span className="text-flow ml-1">{s.change}</span></p>
              </motion.div>
            ))}
          </section>

          {/* Chart + quick actions */}
          <section className="grid lg:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 glass rounded-2xl p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-display text-lg">Usage analytics</h3>
                  <p className="text-xs text-muted-foreground mt-1">Last 14 days · queries per day</p>
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-flow">+18%</span>
              </div>
              <div className="flex items-end gap-2 h-40">
                {data.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 0.3 + i * 0.03, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-1 rounded-t-md bg-gradient-to-t from-flow/40 to-flow hover:from-flow/60 hover:to-cyan-glow transition-colors cursor-pointer"
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="glass rounded-2xl p-6 space-y-3"
            >
              <h3 className="font-display text-lg mb-2">Quick actions</h3>
              <button
                onClick={() => navigate("/chat")}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-flow/10 hover:border-flow/30 border border-transparent transition-all group"
              >
                <span className="flex items-center gap-3 text-sm">
                  <Plus className="size-4 text-flow" /> New conversation
                </span>
                <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-flow" />
              </button>
              <button
                onClick={() => navigate("/library")}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-flow/10 hover:border-flow/30 border border-transparent transition-all group"
              >
                <span className="flex items-center gap-3 text-sm">
                  <Upload className="size-4 text-flow" /> Upload documents
                </span>
                <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-flow" />
              </button>
              <button
                onClick={() => navigate("/settings")}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-flow/10 hover:border-flow/30 border border-transparent transition-all group"
              >
                <span className="flex items-center gap-3 text-sm">
                  <Sparkles className="size-4 text-flow" /> Workspace settings
                </span>
                <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-flow" />
              </button>
            </motion.div>
          </section>

          {/* Suggestions + recent */}
          <section className="grid lg:grid-cols-2 gap-4">
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display text-lg mb-4">Suggested prompts</h3>
              <div className="space-y-2">
                {prompts.map((p) => (
                  <button
                    key={p}
                    onClick={() => navigate("/chat")}
                    className="w-full text-left p-3 rounded-xl hover:bg-flow/10 transition-colors text-sm text-ice/80 hover:text-flow group flex items-center justify-between"
                  >
                    {p}
                    <ArrowUpRight className="size-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display text-lg mb-4">Recent activity</h3>
              <div className="space-y-2">
                {recent.map((r) => (
                  <button
                    key={r.title}
                    onClick={() => navigate("/chat")}
                    className="w-full text-left p-3 rounded-xl hover:bg-muted/40 transition-colors group"
                  >
                    <p className="text-sm text-ice/90 group-hover:text-flow transition-colors truncate">{r.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{r.time}</p>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}
