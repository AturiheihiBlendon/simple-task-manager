const API_URL = 'http://127.0.0.1:8000/api';

// Task API functions
export async function fetchTasks() {
  const response = await fetch(`${API_URL}/tasks/`);

  if (!response.ok) {
    throw new Error(`Failed to fetch tasks: ${response.status}`);
  }

  return response.json();
}

export async function createTask(task: any) {
  const response = await fetch(`${API_URL}/tasks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error(`Failed to create task: ${response.status}`);
  }

  return response.json();
}

export async function updateTask(task: any) {
  const response = await fetch(`${API_URL}/tasks/${task.id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error(`Failed to update task: ${response.status}`);
  }

  return response.json();
}

export async function deleteTask(taskId: any) {
  const response = await fetch(`${API_URL}/tasks/${taskId}/`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete task: ${response.status}`);
  }
}

// User API functions
export async function fetchUsers() {
  const response = await fetch(`${API_URL}/users/`);

  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.status}`);
  }

  return response.json();
}

export async function createUser(user: any) {
  const response = await fetch(`${API_URL}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error(`Failed to create user: ${response.status}`);
  }

  return response.json();
}

export async function updateUser(user: any) {
  const response = await fetch(`${API_URL}/users/${user.id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error(`Failed to update user: ${response.status}`);
  }

  return response.json();
}

export async function deleteUser(userId: any) {
  const response = await fetch(`${API_URL}/users/${userId}/`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete user: ${response.status}`);
  }
}
