import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  MessageSquarePlus, Search, MessageCircle, FolderOpen, LayoutDashboard,
  Settings, LogOut, Sparkles, ChevronLeft, Menu, X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/chat", label: "Chat", icon: MessageCircle },
  { to: "/library", label: "Library", icon: FolderOpen },
  { to: "/settings", label: "Settings", icon: Settings },
];

const recentChats = [
  { id: "1", title: "Marine biology vs Quantum", time: "2m ago" },
  { id: "2", title: "Architectural Fluidity Patterns", time: "4h ago" },
  { id: "3", title: "Recursive Neural Geometries", time: "Yesterday" },
  { id: "4", title: "Climate dataset synthesis", time: "2d ago" },
];

function SidebarBody({ onNavigate }: { onNavigate?: () => void }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const filtered = recentChats.filter((c) => c.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex h-full flex-col p-6 gap-6">
      <Link to="/" onClick={onNavigate} className="flex items-center gap-3 px-2">
        <div className="size-9 rounded-2xl bg-gradient-flow shadow-flow flex items-center justify-center animate-pulse-glow">
          <Sparkles className="size-4 text-void" />
        </div>
        <span className="font-display text-xl font-semibold tracking-tight">Fluere</span>
      </Link>

      <Button
        onClick={() => { navigate("/chat"); onNavigate?.(); }}
        className="w-full rounded-2xl bg-gradient-flow text-void font-semibold hover:opacity-90 hover:scale-[1.02] transition-all shadow-flow"
      >
        <MessageSquarePlus className="size-4 mr-2" /> New Chat
      </Button>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search chats..."
          className="pl-9 rounded-xl bg-muted/40 border-border/60 focus-visible:ring-flow"
        />
      </div>

      <nav className="flex flex-col gap-1">
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                isActive
                  ? "bg-flow/10 text-flow border border-flow/20"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-ice"
              )
            }
          >
            <item.icon className="size-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="flex-1 overflow-y-auto -mx-2 px-2 no-scrollbar">
        <p className="px-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 font-semibold mb-3">
          Recent Flows
        </p>
        <div className="space-y-1">
          {filtered.map((c) => (
            <motion.button
              key={c.id}
              whileHover={{ x: 2 }}
              onClick={onNavigate}
              className="w-full text-left p-2.5 rounded-xl hover:bg-muted/40 transition-colors group"
            >
              <p className="text-sm text-ice/80 truncate group-hover:text-flow transition-colors">{c.title}</p>
              <p className="text-xs text-muted-foreground/60 mt-0.5">{c.time}</p>
            </motion.button>
          ))}
          {filtered.length === 0 && (
            <p className="text-xs text-muted-foreground/50 px-2 py-4 text-center">No matches</p>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-border/60">
        <div className="flex items-center gap-3 p-2 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
          <div className="size-9 rounded-xl bg-gradient-flow flex items-center justify-center text-void font-semibold text-sm">
            ET
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-ice truncate">Elias Thorne</p>
            <p className="text-xs text-muted-foreground">Premium Tier</p>
          </div>
          <button
            onClick={() => navigate("/login")}
            className="text-muted-foreground hover:text-flow transition-colors"
            aria-label="Logout"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-dvh w-full overflow-hidden">
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden md:flex shrink-0 border-r border-border/60 glass transition-all duration-300 relative",
          collapsed ? "w-20" : "w-72"
        )}
      >
        {!collapsed ? (
          <SidebarBody />
        ) : (
          <div className="flex flex-col items-center gap-4 py-6 w-full">
            <div className="size-9 rounded-2xl bg-gradient-flow shadow-flow flex items-center justify-center">
              <Sparkles className="size-4 text-void" />
            </div>
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "size-10 rounded-xl flex items-center justify-center transition-all",
                    isActive ? "bg-flow/10 text-flow" : "text-muted-foreground hover:bg-muted/50 hover:text-ice"
                  )
                }
                title={item.label}
              >
                <item.icon className="size-4" />
              </NavLink>
            ))}
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 size-6 rounded-full glass-strong border border-border flex items-center justify-center hover:text-flow z-10 transition-colors"
          aria-label="Toggle sidebar"
        >
          <ChevronLeft className={cn("size-3 transition-transform", collapsed && "rotate-180")} />
        </button>
      </aside>

      {/* Mobile sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0 w-80 glass-strong border-border/60">
          <SidebarBody onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      <main className="flex-1 flex flex-col min-w-0 relative">
        {/* Mobile header */}
        <div className="md:hidden h-14 flex items-center justify-between px-4 border-b border-border/60 glass shrink-0">
          <Button variant="ghost" size="icon" className="text-ice" onClick={() => setMobileOpen(true)}>
            <Menu className="size-5" />
          </Button>
          <span className="font-display font-semibold">Fluere</span>
          <div className="size-9" />
        </div>

        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 min-h-0 flex flex-col"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
