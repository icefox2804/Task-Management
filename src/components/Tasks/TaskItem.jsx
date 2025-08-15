import React from "react";
import "../../styles/Taskitem.css";

export default function TaskItem({ task, onEdit, onDelete, onToggleStatus }) {
  return (
    <div className={`task-item priority-${task.priority}`}>
      <div className="task-info">
        <div className="task-title">{task.title}</div>
        <p className="task-description">{task.description}</p>
        <div className="task-meta">
          {new Date(task.dueDate).toLocaleDateString()}
        </div>
      </div>
      <div className="task-footer">
        <div className={`task-status status-${task.status}`}>
          {task.status.replace("-", " ")}
        </div>
        <div className="task-actions">
          <button onClick={() => onToggleStatus(task)} className="btn-small">
            Toggle
          </button>
          <button onClick={() => onEdit(task)} className="btn-small">
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="btn-danger btn-small"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
