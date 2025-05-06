"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TaskList } from "@/components/task-list";
import { TaskForm } from "@/components/task-form";
import { Task, User } from "@/lib/types";
import {
  createTask,
  deleteTask,
  fetchTasks,
  fetchUsers,
  updateTask,
} from "@/lib/api";

export function TaskDashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true);
        const [tasksData, usersData] = await Promise.all([
          fetchTasks(),
          fetchUsers(),
        ]);
        setTasks(tasksData);
        setUsers(usersData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  const handleCreateTask = async (task: Task) => {
    try {
      setIsLoading(true);
      const newTask = await createTask(task);
      const tasksData = await fetchTasks();
      setTasks(tasksData);
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTask = async (updatedTask: Task) => {
    try {
      setIsLoading(true);
      const task = await updateTask(updatedTask);
      setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
      setIsFormOpen(false);
      setCurrentTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      setIsLoading(true);
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    setIsFormOpen(true);
  };

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
            setIsFormOpen(false);
            setCurrentTask(null);
          }}
          initialData={currentTask}
        />
      ) : (
        <TaskList
          tasks={tasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
}
