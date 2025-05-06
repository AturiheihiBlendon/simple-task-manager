"use client"

import type { User } from "@/lib/types"
import { UserCard } from "@/components/user-card"

interface UserListProps {
  users: User[]
  onEdit: (user: User) => void
  onDelete: (userId: string) => void
}

export function UserList({ users, onEdit, onDelete }: UserListProps) {
  return (
    <div className="space-y-4">
      {users.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">No users found. Create a new user to get started.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <UserCard key={user.id} user={user} onEdit={() => onEdit(user)} onDelete={() => onDelete(user.id)} />
          ))}
        </div>
      )}
    </div>
  )
}
