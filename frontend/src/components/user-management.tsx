"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { UserList } from "@/components/user-list";

import type { User } from "@/lib/types";
import { UserForm } from "./user-form";

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);


  const handleCreateUser = async (user: User) => {
  };

  const handleUpdateUser = async (updatedUser: User) => {
    
  };

  const handleDeleteUser = async (userId: string) => {
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
