import { Task, Priority } from "@/lib/store";
import { Calendar, GripVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const priorityLabels: Record<Priority, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
  none: "None",
};

const priorityClasses: Record<Priority, string> = {
  critical: "priority-critical",
  high: "priority-high",
  medium: "priority-medium",
  low: "priority-low",
  none: "priority-none",
};

interface Props {
  task: Task;
  onClick: () => void;
  isDragging?: boolean;
}

export function TaskCard({ task, onClick, isDragging }: Props) {
  const initials = task.assignee
    ? task.assignee.name.split(" ").map((n) => n[0]).join("")
    : null;

  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-card border border-border rounded-lg p-3.5 cursor-pointer transition-all group",
        "hover:border-primary/30 hover:shadow-sm",
        isDragging && "shadow-lg rotate-2 opacity-90"
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="text-sm font-medium text-card-foreground leading-snug line-clamp-2">
          {task.title}
        </h4>
        <GripVertical className="h-4 w-4 text-muted-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
      </div>

      {task.description && (
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={cn("text-[11px] font-medium px-2 py-0.5 rounded-full", priorityClasses[task.priority])}>
            {priorityLabels[task.priority]}
          </span>
          {task.dueDate && (
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </span>
          )}
        </div>
        {task.assignee && (
          <Avatar className="h-6 w-6">
            <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
            <AvatarFallback className="text-[10px] bg-muted">{initials}</AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
}
