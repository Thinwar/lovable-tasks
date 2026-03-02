import { createContext, useContext } from "react";

export type Priority = "critical" | "high" | "medium" | "low" | "none";
export type Status = "todo" | "in-progress" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  dueDate: string | null;
  assignee: {
    name: string;
    avatar: string;
  } | null;
  projectId: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

export const defaultProjects: Project[] = [
  { id: "p1", name: "Marketing Site", emoji: "🚀", color: "hsl(230, 80%, 56%)" },
  { id: "p2", name: "Mobile App", emoji: "📱", color: "hsl(142, 71%, 45%)" },
  { id: "p3", name: "API Platform", emoji: "⚡", color: "hsl(25, 95%, 53%)" },
];

const avatars = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Milo",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Luna",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Zara",
];

const names = ["Felix Chen", "Aneka Patel", "Milo Torres", "Luna Kim", "Zara Ahmed"];

export const defaultTasks: Task[] = [
  {
    id: "t1", title: "Design landing page hero", description: "Create a compelling hero section with animated gradient background.", priority: "high", status: "todo",
    dueDate: "2026-03-10", assignee: { name: names[0], avatar: avatars[0] }, projectId: "p1", createdAt: "2026-02-28",
  },
  {
    id: "t2", title: "Set up CI/CD pipeline", description: "Configure GitHub Actions for automated testing and deployment.", priority: "critical", status: "in-progress",
    dueDate: "2026-03-05", assignee: { name: names[1], avatar: avatars[1] }, projectId: "p1", createdAt: "2026-02-27",
  },
  {
    id: "t3", title: "Write API documentation", description: "Document all REST endpoints with examples and error codes.", priority: "medium", status: "done",
    dueDate: "2026-03-01", assignee: { name: names[2], avatar: avatars[2] }, projectId: "p3", createdAt: "2026-02-25",
  },
  {
    id: "t4", title: "Implement auth flow", description: "Build login, signup, and password reset screens.", priority: "high", status: "todo",
    dueDate: "2026-03-08", assignee: { name: names[3], avatar: avatars[3] }, projectId: "p2", createdAt: "2026-02-26",
  },
  {
    id: "t5", title: "Optimize image loading", description: "Add lazy loading and WebP conversion for all images.", priority: "low", status: "in-progress",
    dueDate: "2026-03-12", assignee: { name: names[4], avatar: avatars[4] }, projectId: "p1", createdAt: "2026-02-28",
  },
  {
    id: "t6", title: "Add push notifications", description: "Integrate Firebase Cloud Messaging for real-time alerts.", priority: "medium", status: "todo",
    dueDate: "2026-03-15", assignee: { name: names[0], avatar: avatars[0] }, projectId: "p2", createdAt: "2026-02-28",
  },
  {
    id: "t7", title: "Database migration script", description: "Write migration for new user preferences schema.", priority: "critical", status: "in-progress",
    dueDate: "2026-03-04", assignee: { name: names[1], avatar: avatars[1] }, projectId: "p3", createdAt: "2026-02-27",
  },
  {
    id: "t8", title: "User feedback survey", description: "Create and distribute NPS survey to active users.", priority: "none", status: "done",
    dueDate: "2026-02-28", assignee: { name: names[2], avatar: avatars[2] }, projectId: "p1", createdAt: "2026-02-20",
  },
  {
    id: "t9", title: "Rate limiting middleware", description: "Implement token bucket rate limiting for API endpoints.", priority: "high", status: "todo",
    dueDate: "2026-03-07", assignee: { name: names[3], avatar: avatars[3] }, projectId: "p3", createdAt: "2026-02-28",
  },
  {
    id: "t10", title: "Onboarding tutorial", description: "Build interactive walkthrough for new users.", priority: "medium", status: "done",
    dueDate: "2026-02-27", assignee: { name: names[4], avatar: avatars[4] }, projectId: "p2", createdAt: "2026-02-22",
  },
];

export function generateId() {
  return "t" + Math.random().toString(36).substring(2, 9);
}
