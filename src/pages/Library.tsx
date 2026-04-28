import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppLayout } from "@/components/AppLayout";
import { Upload, FileText, Image as ImageIcon, FileSpreadsheet, Search, LayoutGrid, List, MoreVertical, Trash2, Pencil, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

interface Doc {
  id: string;
  name: string;
  type: "pdf" | "doc" | "img" | "csv";
  size: string;
  date: string;
  progress?: number;
}

const initialDocs: Doc[] = [
  { id: "1", name: "Quantum_Sensing_Research_2024.pdf", type: "pdf", size: "2.4 MB", date: "Today" },
  { id: "2", name: "Marine_Bio_Dataset.csv", type: "csv", size: "8.1 MB", date: "Today" },
  { id: "3", name: "Architecture_Briefing_Q4.pdf", type: "pdf", size: "1.2 MB", date: "Yesterday" },
  { id: "4", name: "Spectral_Imaging_Sample.png", type: "img", size: "4.5 MB", date: "2 days ago" },
  { id: "5", name: "Executive_Summary.doc", type: "doc", size: "320 KB", date: "Last week" },
  { id: "6", name: "Hadley_Lab_Notes.pdf", type: "pdf", size: "5.6 MB", date: "Last week" },
];

const iconFor = (t: Doc["type"]) => {
  switch (t) {
    case "img": return ImageIcon;
    case "csv": return FileSpreadsheet;
    default: return FileText;
  }
};

const colorFor = (t: Doc["type"]) => {
  switch (t) {
    case "pdf": return "text-rose-400 bg-rose-400/10";
    case "img": return "text-purple-400 bg-purple-400/10";
    case "csv": return "text-emerald-400 bg-emerald-400/10";
    default: return "text-flow bg-flow/10";
  }
};

export default function Library() {
  const [docs, setDocs] = useState<Doc[]>(initialDocs);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [drag, setDrag] = useState(false);

  const upload = useCallback((files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach((f) => {
      const ext = f.name.split(".").pop()?.toLowerCase() || "";
      const type: Doc["type"] = ["png", "jpg", "jpeg", "webp"].includes(ext) ? "img"
        : ext === "csv" ? "csv"
        : ext === "doc" || ext === "docx" ? "doc"
        : "pdf";
      const id = crypto.randomUUID();
      const newDoc: Doc = {
        id,
        name: f.name,
        type,
        size: `${(f.size / 1024 / 1024).toFixed(1)} MB`,
        date: "Just now",
        progress: 0,
      };
      setDocs((d) => [newDoc, ...d]);
      let p = 0;
      const interval = setInterval(() => {
        p += 8 + Math.random() * 12;
        setDocs((d) => d.map((doc) => (doc.id === id ? { ...doc, progress: Math.min(p, 100) } : doc)));
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDocs((d) => d.map((doc) => (doc.id === id ? { ...doc, progress: undefined } : doc)));
            toast.success(`${f.name} uploaded`);
          }, 300);
        }
      }, 150);
    });
  }, []);

  const remove = (id: string) => {
    setDocs((d) => d.filter((doc) => doc.id !== id));
    toast("Document removed");
  };

  const filtered = docs.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <AppLayout>
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-6 md:p-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-4xl font-light">Document Library</h1>
              <p className="text-muted-foreground mt-1">{docs.length} documents · 22.1 MB used</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search documents..."
                  className="pl-9 rounded-xl bg-muted/40 border-border/60 focus-visible:ring-flow"
                />
              </div>
              <div className="flex rounded-xl bg-muted/40 border border-border/60 p-1">
                <button onClick={() => setView("grid")} className={cn("p-1.5 rounded-lg transition-colors", view === "grid" ? "bg-flow/15 text-flow" : "text-muted-foreground")}>
                  <LayoutGrid className="size-4" />
                </button>
                <button onClick={() => setView("list")} className={cn("p-1.5 rounded-lg transition-colors", view === "list" ? "bg-flow/15 text-flow" : "text-muted-foreground")}>
                  <List className="size-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Drop zone */}
          <label
            onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => { e.preventDefault(); setDrag(false); upload(e.dataTransfer.files); }}
            className={cn(
              "block rounded-3xl border-2 border-dashed p-10 text-center cursor-pointer transition-all",
              drag ? "border-flow bg-flow/10" : "border-border/60 hover:border-flow/40 hover:bg-muted/20"
            )}
          >
            <input type="file" multiple hidden onChange={(e) => upload(e.target.files)} />
            <motion.div
              animate={{ y: drag ? -4 : 0 }}
              className="size-14 mx-auto rounded-2xl bg-flow/10 flex items-center justify-center text-flow mb-4"
            >
              <Upload className="size-6" />
            </motion.div>
            <p className="font-display text-lg">Drop files to upload</p>
            <p className="text-sm text-muted-foreground mt-1">PDF, DOCX, CSV, images · max 20MB each</p>
          </label>

          {/* Grid/List */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 space-y-3">
              <div className="size-16 mx-auto rounded-2xl bg-muted/40 flex items-center justify-center text-muted-foreground">
                <FolderOpen className="size-7" />
              </div>
              <p className="font-display text-xl">Nothing here yet</p>
              <p className="text-sm text-muted-foreground">Try uploading or adjusting your search</p>
            </div>
          ) : view === "grid" ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {filtered.map((d) => {
                  const Icon = iconFor(d.type);
                  return (
                    <motion.div
                      key={d.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="glass rounded-2xl p-5 group hover:border-flow/30 transition-all"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className={cn("size-10 rounded-xl flex items-center justify-center", colorFor(d.type))}>
                          <Icon className="size-5" />
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-muted/50">
                            <MoreVertical className="size-4 text-muted-foreground" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="glass-strong rounded-xl">
                            <DropdownMenuItem><Pencil className="size-3.5 mr-2" /> Rename</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => remove(d.id)} className="text-destructive"><Trash2 className="size-3.5 mr-2" /> Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <p className="text-sm font-medium text-ice truncate">{d.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{d.size} · {d.date}</p>
                      {d.progress !== undefined && (
                        <div className="mt-3 space-y-1">
                          <Progress value={d.progress} className="h-1" />
                          <p className="text-[10px] font-mono text-flow">{Math.round(d.progress)}% uploading</p>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          ) : (
            <div className="glass rounded-2xl divide-y divide-border/60 overflow-hidden">
              <AnimatePresence>
                {filtered.map((d) => {
                  const Icon = iconFor(d.type);
                  return (
                    <motion.div
                      key={d.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors group"
                    >
                      <div className={cn("size-10 rounded-xl flex items-center justify-center shrink-0", colorFor(d.type))}>
                        <Icon className="size-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-ice truncate">{d.name}</p>
                        <p className="text-xs text-muted-foreground">{d.size} · {d.date}</p>
                        {d.progress !== undefined && <Progress value={d.progress} className="h-1 mt-2" />}
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => remove(d.id)} className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive">
                        <Trash2 className="size-4" />
                      </Button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
