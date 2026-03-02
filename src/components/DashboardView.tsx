import { Task, Project } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { CheckCircle, Clock, ListTodo, AlertTriangle } from "lucide-react";

interface Props {
  tasks: Task[];
  allTasks: Task[];
  projects: Project[];
  activeProjectId: string;
}

export function DashboardView({ tasks, allTasks, projects, activeProjectId }: Props) {
  const todo = tasks.filter((t) => t.status === "todo").length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;
  const done = tasks.filter((t) => t.status === "done").length;
  const total = tasks.length;

  const statusData = [
    { name: "To Do", value: todo, color: "hsl(var(--chart-3))" },
    { name: "In Progress", value: inProgress, color: "hsl(var(--chart-1))" },
    { name: "Done", value: done, color: "hsl(var(--chart-2))" },
  ];

  const projectData = projects.map((p) => ({
    name: p.emoji + " " + p.name,
    tasks: allTasks.filter((t) => t.projectId === p.id).length,
    completed: allTasks.filter((t) => t.projectId === p.id && t.status === "done").length,
  }));

  const priorityData = [
    { name: "Critical", count: tasks.filter((t) => t.priority === "critical").length },
    { name: "High", count: tasks.filter((t) => t.priority === "high").length },
    { name: "Medium", count: tasks.filter((t) => t.priority === "medium").length },
    { name: "Low", count: tasks.filter((t) => t.priority === "low").length },
  ];

  const activeProject = projects.find((p) => p.id === activeProjectId);

  const stats = [
    { label: "Total Tasks", value: total, icon: ListTodo, color: "text-primary" },
    { label: "In Progress", value: inProgress, icon: Clock, color: "text-chart-3" },
    { label: "Completed", value: done, icon: CheckCircle, color: "text-chart-2" },
    { label: "Critical", value: tasks.filter((t) => t.priority === "critical").length, icon: AlertTriangle, color: "text-chart-5" },
  ];

  return (
    <div className="p-6 space-y-6 overflow-auto h-full">
      <div>
        <h2 className="text-xl font-bold text-foreground">{activeProject?.emoji} {activeProject?.name} — Dashboard</h2>
        <p className="text-sm text-muted-foreground mt-1">Overview of project progress and metrics</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="border-border">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-muted ${s.color}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Task Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[240px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData.filter((d) => d.value > 0)}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {statusData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--popover-foreground))",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              {statusData.map((d) => (
                <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  {d.name} ({d.value})
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Tasks by Project</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectData} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} width={120} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--popover-foreground))",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="tasks" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} name="Total" />
                  <Bar dataKey="completed" fill="hsl(var(--chart-2))" radius={[0, 4, 4, 0]} name="Completed" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
