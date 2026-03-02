import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Task, Status } from "@/lib/store";
import { TaskCard } from "./TaskCard";

const columns: { id: Status; title: string; emoji: string }[] = [
  { id: "todo", title: "To Do", emoji: "📋" },
  { id: "in-progress", title: "In Progress", emoji: "🔄" },
  { id: "done", title: "Done", emoji: "✅" },
];

interface Props {
  tasks: Task[];
  onMoveTask: (taskId: string, status: Status) => void;
  onEditTask: (task: Task) => void;
}

export function KanbanBoard({ tasks, onMoveTask, onEditTask }: Props) {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newStatus = result.destination.droppableId as Status;
    onMoveTask(result.draggableId, newStatus);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 h-full p-6 overflow-x-auto">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.id);
          return (
            <div key={col.id} className="kanban-column flex flex-col w-80 min-w-[320px] shrink-0">
              <div className="flex items-center gap-2 px-4 py-3">
                <span className="text-base">{col.emoji}</span>
                <h3 className="text-sm font-semibold text-foreground">{col.title}</h3>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full ml-auto">
                  {colTasks.length}
                </span>
              </div>
              <Droppable droppableId={col.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex-1 px-2 pb-2 space-y-2 min-h-[200px] rounded-lg transition-colors ${
                      snapshot.isDraggingOver ? "bg-primary/5" : ""
                    }`}
                  >
                    {colTasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard
                              task={task}
                              onClick={() => onEditTask(task)}
                              isDragging={snapshot.isDragging}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
}
