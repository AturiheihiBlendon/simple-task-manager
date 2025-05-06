"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { UserList } from "@/components/user-list";

import type { User } from "@/lib/types";
import { UserForm } from "./user-form";
import { createUser, deleteUser, fetchUsers, updateUser } from "@/lib/api";

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setIsLoading(true);
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Error loading users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleCreateUser = async (user: User) => {
    try {
      setIsLoading(true);
      const newUser = await createUser(user);
      setUsers((prev) => [...prev, newUser]);
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateUser = async (updatedUser: User) => {
    try {
      setIsLoading(true);
      const user = await updateUser(updatedUser);
      setUsers((prev) => prev.map((u) => (u.id === user.id ? user : u)));
      setIsFormOpen(false);
      setCurrentUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      setIsLoading(true);
      await deleteUser(userId);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditUser = (user: User) => {
    setCurrentUser(user);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Users</h2>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> New User
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : isFormOpen ? (
        <UserForm
          onSubmit={currentUser ? handleUpdateUser : handleCreateUser}
          onCancel={() => {
            setIsFormOpen(false);
            setCurrentUser(null);
          }}
          initialData={currentUser}
        />
      ) : (
        <UserList
          users={users}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
      )}
    </div>
  );
}
