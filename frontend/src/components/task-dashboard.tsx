"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { TaskList } from "@/components/task-list"
import { TaskForm } from "@/components/task-form"
import { Task, User } from "@/lib/types"


export function TaskDashboard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [currentTask, setCurrentTask] = useState<Task | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleCreateTask = async (task: Task) => {
    console.log("Task create---", task)
    
  }

  const handleUpdateTask = async (updatedTask: Task) => {
    
  }

  const handleDeleteTask = async (taskId: string) => {
    
  }

  const handleEditTask = (task: Task) => {
    setCurrentTask(task)
    setIsFormOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> New Task
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : isFormOpen ? (
        <TaskForm
          users={users}
          onSubmit={currentTask ? handleUpdateTask : handleCreateTask}
          onCancel={() => {
            setIsFormOpen(false)
            setCurrentTask(null)
          }}
          initialData={currentTask}
        />
      ) : (
        <TaskList tasks={tasks} users={users} onEdit={handleEditTask} onDelete={handleDeleteTask} />
      )}
    </div>
  )
}
