export interface Task {
  id: any;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  due_date: string;
  assignee_id: any;
  createdAt: string;
}

export interface User {
  id: any;
  name: string;
  email: string;
  role: string;
}
