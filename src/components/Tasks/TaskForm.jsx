// src/components/Tasks/TaskForm.jsx

import React, { useState, useEffect } from "react";
import { validateTask } from "../../utils/validation";
import "../../styles/TaskForm.css";

export default function TaskForm({
  task: initialTask,
  onSubmit,
  onCancel,
  isLoading,
}) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium", // Giá trị mặc định
    dueDate: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialTask) {
      setTask({
        title: initialTask.title || "",
        description: initialTask.description || "",
        status: initialTask.status || "todo",
        priority: initialTask.priority || "medium",
        dueDate: initialTask.dueDate ? initialTask.dueDate.split("T")[0] : "",
      });
    } else {
      // Reset form cho việc tạo mới
      setTask({
        title: "",
        description: "",
        status: "todo",
        priority: "medium",
        dueDate: "",
      });
    }
  }, [initialTask]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateTask(task);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(task);
  };

  const isEditing = !!initialTask;

  return (
    <form onSubmit={handleSubmit} className="task-form-embedded">
      <h3>{isEditing ? "Chỉnh sửa Task" : "Tạo Task Mới"}</h3>

      {/* --- TRƯỜNG TITLE --- */}
      <input
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Tiêu đề Task (bắt buộc)"
      />
      {errors.title && <p className="form-error">{errors.title}</p>}

      {/* --- TRƯỜNG DESCRIPTION --- */}
      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Mô tả chi tiết"
      />
      {errors.description && <p className="form-error">{errors.description}</p>}

      {/* =============================================================== */}
      {/* CÁC TRƯỜNG BỊ THIẾU ĐƯỢC THÊM VÀO ĐÂY */}
      {/* =============================================================== */}
      <div className="form-row">
        {/* --- TRƯỜNG STATUS --- */}
        <div className="form-field">
          <label htmlFor="status"> Trạng thái </label>
          <select
            name="status"
            id="status"
            value={task.status}
            onChange={handleChange}
          >
            <option value="todo">Todo</option>
            <option value="in-progress">Đang làm</option>
            <option value="completed">Hoàn thành</option>
          </select>
          {errors.status && <p className="form-error">{errors.status}</p>}
        </div>

        {/* --- TRƯỜNG PRIORITY --- */}
        <div className="form-field">
          <label htmlFor="priority"> Độ ưu tiên </label>
          <select
            name="priority"
            id="priority"
            value={task.priority}
            onChange={handleChange}
          >
            <option value="low">Thấp</option>
            <option value="medium">Trung bình</option>
            <option value="high">Cao</option>
          </select>
          {errors.priority && <p className="form-error">{errors.priority}</p>}
        </div>

        {/* --- TRƯỜNG DUE DATE --- */}
        <div className="form-field">
          <label htmlFor="dueDate"> Ngày hết hạn </label>
          <input
            type="date"
            name="dueDate"
            id="dueDate"
            value={task.dueDate}
            onChange={handleChange}
          />
          {errors.dueDate && <p className="form-error">{errors.dueDate}</p>}
        </div>
      </div>
      {/* =============================================================== */}

      <div className="form-actions">
        <button type="submit" className="btn-primary" disabled={isLoading}>
          {isLoading ? "Đang lưu..." : isEditing ? "Lưu thay đổi" : "Thêm Task"}
        </button>
        <button
          type="button"
          className="btn-secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Hủy
        </button>
      </div>
    </form>
  );
}
