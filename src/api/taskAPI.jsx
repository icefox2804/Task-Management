const API = process.env.REACT_APP_API_URL || "http://localhost:3001";

export const getTasks = async () => {
  const res = await fetch(`${API}/tasks`);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return await res.json(); // ✅
};

export const createTask = async (task) => {
  const res = await fetch(`${API}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error("Failed to create task");
  return await res.json(); // ✅
};

export const updateTask = async (id, task) => {
  const res = await fetch(`${API}/tasks/${id}`, {
    method: "PATCH", // hoặc PUT tùy nhu cầu
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error("Failed to update task");
  return await res.json(); // ✅
};

export const deleteTask = async (id) => {
  const res = await fetch(`${API}/tasks/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete task");
  return true;
};
