import { LayoutDashboard, Columns3, Plus } from "lucide-react";
import { Project } from "@/lib/store";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

interface Props {
  projects: Project[];
  activeProjectId: string;
  onSelectProject: (id: string) => void;
  activeView: "board" | "dashboard";
  onViewChange: (v: "board" | "dashboard") => void;
  onNewTask: () => void;
}

export function ProjectSidebar({ projects, activeProjectId, onSelectProject, activeView, onViewChange, onNewTask }: Props) {
  return (
    <aside className="w-64 border-r border-border bg-sidebar flex flex-col h-screen shrink-0">
      <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
        <h1 className="font-bold text-base text-sidebar-accent-foreground tracking-tight">ProjectFlow</h1>
        <ThemeToggle />
      </div>

      <div className="p-3">
        <button
          onClick={onNewTask}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4" />
          New Task
        </button>
      </div>

      <nav className="px-3 space-y-1">
        <button
          onClick={() => onViewChange("board")}
          className={cn(
            "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
            activeView === "board"
              ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
              : "text-sidebar-foreground hover:bg-sidebar-accent/50"
          )}
        >
          <Columns3 className="h-4 w-4" />
          Board
        </button>
        <button
          onClick={() => onViewChange("dashboard")}
          className={cn(
            "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
            activeView === "dashboard"
              ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
              : "text-sidebar-foreground hover:bg-sidebar-accent/50"
          )}
        >
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </button>
      </nav>

      <div className="mt-6 px-3">
        <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Projects</p>
        <div className="space-y-0.5">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => onSelectProject(p.id)}
              className={cn(
                "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors",
                activeProjectId === p.id
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <span className="text-base">{p.emoji}</span>
              <span className="truncate">{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary">
            JD
          </div>
          <span className="text-sm text-sidebar-foreground truncate">John Doe</span>
        </div>
      </div>
    </aside>
  );
}
