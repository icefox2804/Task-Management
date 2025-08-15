import React from "react";
import Navbar from "./components/Auth/Navbar";
import LoadingSpinner from "./components/Common/LoadingSpinner";
import ErrorMessage from "./components/Common/ErrorMessage";
import TaskItem from "./components/Tasks/Taskitem";

export default function TestComponents() {
  const mockUser = {
    id: 1,
    username: "admin",
    email: "admin@test.com",
  };

  const mockTasks = [
    {
      id: 1,
      title: "Học React Hooks",
      description: "Hoàn thành bài học về useState và useEffect",
      status: "todo",
      priority: "high",
      dueDate: "2024-08-15",
    },
    {
      id: 2,
      title: "Setup JSON Server",
      description: "Cài đặt và cấu hình JSON Server cho project",
      status: "in-progress",
      priority: "medium",
      dueDate: "2024-08-10",
    },
    {
      id: 3,
      title: "Deploy ứng dụng",
      description: "",
      status: "completed",
      priority: "low",
      dueDate: "2024-08-05",
    },
  ];

  const handleLogout = () => console.log("Logout clicked");
  const handleEdit = (task) => console.log("Edit task:", task);
  const handleDelete = (taskId) => console.log("Delete task:", taskId);

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f5f5f5" }}>
      <h3>Test Navbar</h3>
      <Navbar isLoggedIn={true} user={mockUser} onLogout={handleLogout} />

      <h3>Test LoadingSpinner</h3>
      <LoadingSpinner size="medium" />

      <h3>Test ErrorMessage</h3>
      <ErrorMessage message="Không thể kết nối server" />

      <h3>Test TaskItem</h3>
      <div style={{ maxWidth: "800px" }}>
        {mockTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
