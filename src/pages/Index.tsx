import { useState } from "react";
import { useAppState } from "@/hooks/useAppState";
import { ProjectSidebar } from "@/components/ProjectSidebar";
import { KanbanBoard } from "@/components/KanbanBoard";
import { DashboardView } from "@/components/DashboardView";
import { TaskModal } from "@/components/TaskModal";
import { Task } from "@/lib/store";

const Index = () => {
  const {
    projects,
    tasks,
    allTasks,
    activeProjectId,
    setActiveProjectId,
    activeView,
    setActiveView,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
  } = useAppState();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleNewTask = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <ProjectSidebar
        projects={projects}
        activeProjectId={activeProjectId}
        onSelectProject={setActiveProjectId}
        activeView={activeView}
        onViewChange={setActiveView}
        onNewTask={handleNewTask}
      />

      <main className="flex-1 overflow-hidden">
        {activeView === "board" ? (
          <KanbanBoard tasks={tasks} onMoveTask={moveTask} onEditTask={handleEditTask} />
        ) : (
          <DashboardView tasks={tasks} allTasks={allTasks} projects={projects} activeProjectId={activeProjectId} />
        )}
      </main>

      <TaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        task={editingTask}
        projectId={activeProjectId}
        onSave={addTask}
        onUpdate={updateTask}
        onDelete={deleteTask}
      />
    </div>
  );
};

export default Index;
