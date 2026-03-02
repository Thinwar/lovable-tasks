import { useState, useCallback } from "react";
import { Task, Project, defaultProjects, defaultTasks, generateId, Status } from "@/lib/store";

export function useAppState() {
  const [projects] = useState<Project[]>(defaultProjects);
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [activeProjectId, setActiveProjectId] = useState<string>("p1");
  const [activeView, setActiveView] = useState<"board" | "dashboard">("board");

  const projectTasks = tasks.filter((t) => t.projectId === activeProjectId);

  const addTask = useCallback((task: Omit<Task, "id" | "createdAt">) => {
    setTasks((prev) => [
      ...prev,
      { ...task, id: generateId(), createdAt: new Date().toISOString().split("T")[0] },
    ]);
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const moveTask = useCallback((taskId: string, newStatus: Status) => {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)));
  }, []);

  const allTasks = tasks;

  return {
    projects,
    tasks: projectTasks,
    allTasks,
    activeProjectId,
    setActiveProjectId,
    activeView,
    setActiveView,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
  };
}
