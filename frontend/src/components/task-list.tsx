"use client"

import type { Task, User } from "@/lib/types"
import { TaskCard } from "@/components/task-card"

interface TaskListProps {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (taskId: string) => void
}

export function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">No tasks found. Create a new task to get started.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => onEdit(task)}
              onDelete={() => onDelete(task.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
