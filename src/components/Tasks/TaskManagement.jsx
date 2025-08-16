import React, { useState, useEffect, useRef } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import ErrorMessage from "../Common/ErrorMessage";
import "../../styles/TaskManagement.css";

function TaskManagement({ user }) {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    search: "",
  });
  const taskListRef = useRef(null);

  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
  // --- HÀM LOAD TASKS ---
  const loadTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/tasks?userId=${user.id}`);
      if (!response.ok) throw new Error("Không thể tải danh sách công việc.");
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [user]);

  // --- HÀM TẠO TASK ---
  const createTask = async (taskData) => {
    console.log("ĐANG KIỂM TRA USER KHI TẠO TASK:", user);
    setIsFormLoading(true);
    try {
      // Thêm một lớp bảo vệ để ứng dụng không bị crash
      if (!user || !user.id) {
        throw new Error(
          "Không xác định được ID người dùng. Vui lòng đăng nhập lại."
        );
      }
      const newTask = {
        ...taskData,
        userId: user.id,
        createdAt: new Date().toISOString(),
      };
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      if (!response.ok) throw new Error("Không thể tạo công việc mới.");
      const createdTask = await response.json();
      setTasks((prev) => [createdTask, ...prev]);
      setShowTaskForm(false);
      setEditingTask(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsFormLoading(false);
    }
  };

  // --- HÀM CẬP NHẬT TASK ---
  const updateTask = async (taskData) => {
    setIsFormLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });
      if (!response.ok) throw new Error("Không thể cập nhật công việc.");
      const updatedTask = await response.json();
      setTasks((prev) =>
        prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      );
      setShowTaskForm(false);
      setEditingTask(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsFormLoading(false);
    }
  };
  // --- HÀM XÓA TASK ---
  const deleteTask = async (taskId) => {
    const originalTasks = [...tasks];
    setTasks(tasks.filter((task) => task.id !== taskId));

    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Xóa công việc thất bại. Đang hoàn tác.");
      }
    } catch (err) {
      setError(err.message);
      setTasks(originalTasks); // Hoàn tác nếu có lỗi
    }
  };

  // --- CÁC HÀM XỬ LÝ SỰ KIỆN ---
  const handleTaskSave = async (taskData) => {
    if (editingTask) {
      await updateTask({ ...taskData, id: editingTask.id });
    } else {
      await createTask(taskData);
    }
  };

  const handleToggleStatus = async (taskToToggle) => {
    const statusOrder = ["todo", "in-progress", "completed"];
    const currentStatusIndex = statusOrder.indexOf(taskToToggle.status);
    const nextStatus =
      statusOrder[(currentStatusIndex + 1) % statusOrder.length];
    await updateTask({ ...taskToToggle, status: nextStatus });
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleCreateTask = () => {
    setEditingTask(null);
    setShowTaskForm(true);
  };

  const handleCancelForm = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  //Hàm xử lý sự kiện khi người dùng thay đổi bộ lọc
  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  // --- LỌC VÀ TÍNH TOÁN DỮ LIỆU ---
  const filteredTasks = tasks.filter((task) => {
    const statusMatch =
      filters.status === "all" || task.status === filters.status;
    const priorityMatch =
      filters.priority === "all" || task.priority === filters.priority;
    const searchMatch =
      !filters.search ||
      task.title.toLowerCase().includes(filters.search.toLowerCase());
    return statusMatch && priorityMatch && searchMatch;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };

  return (
    <div className="task-management">
      <div className="task-management-header">
        <div className="header-title">
          <h1>Quản lý Tasks</h1>
          <p className="header-subtitle">
            Xin chào <strong>{user.username}</strong>! Bạn có {stats.total}{" "}
            tasks ({stats.completed} hoàn thành).
          </p>
        </div>
        {!showTaskForm && (
          <button className="create-task-btn" onClick={handleCreateTask}>
            + Tạo Task Mới
          </button>
        )}
      </div>

      {/* Thêm các bộ lọc ở đây nếu cần */}
      <div className="task-filters box-shadow">
        {/* --- Bộ lọc theo Status --- */}
        <div className="filter-group">
          <label htmlFor="status-filter" className="filter-label">
            Trạng thái
          </label>
          <select
            id="status-filter"
            className="filter-select"
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
          >
            <option value="all">Tất cả</option>
            <option value="todo">Cần làm</option>
            <option value="in-progress">Đang làm</option>
            <option value="completed">Hoàn thành</option>
          </select>
        </div>

        {/* --- Bộ lọc theo Priority --- */}
        <div className="filter-group">
          <label htmlFor="priority-filter" className="filter-label">
            Ưu tiên
          </label>
          <select
            id="priority-filter"
            className="filter-select"
            value={filters.priority}
            onChange={(e) => handleFilterChange("priority", e.target.value)}
          >
            <option value="all">Tất cả</option>
            <option value="low">Thấp</option>
            <option value="medium">Trung bình</option>
            <option value="high">Cao</option>
          </select>
        </div>

        {/* --- Thanh tìm kiếm --- */}
        <div className="filter-group search-group">
          <label htmlFor="search-input" className="filter-label">
            Tìm kiếm Task
          </label>
          <input
            id="search-input"
            type="text"
            className="search-input"
            placeholder="Nhập tên công việc..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />
        </div>
      </div>

      {showTaskForm && (
        <div className="add-task-container">
          <TaskForm
            task={editingTask}
            onSubmit={handleTaskSave}
            onCancel={handleCancelForm}
            isLoading={isFormLoading}
          />
        </div>
      )}

      {error && (
        <ErrorMessage
          message={error}
          onRetry={loadTasks}
          onDismiss={() => setError(null)}
        />
      )}

      <div ref={taskListRef}>
        <TaskList
          tasks={filteredTasks}
          isLoading={isLoading}
          error={null}
          onEditTask={handleEditTask}
          onDeleteTask={deleteTask}
          onRetryLoad={loadTasks}
          onToggleStatus={handleToggleStatus}
        />
      </div>
    </div>
  );
}

export default TaskManagement;
