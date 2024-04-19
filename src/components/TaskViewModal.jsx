import React from "react";

const TaskViewModal = ({ open, onClose, task }) => {
  return (
    task && (
      <div className={`modal ${open ? "open" : ""}`}>
        <div className="modal-content">
          <h2>Task Details</h2>
          <p>Title: {task.title}</p>
          <p>Description: {task.desc}</p>
          <p>Created At: {task.created_at}</p>
          <p>Marked as Done: {task.marked_as_done ? "Yes" : "No"}</p>
          <button onClick={onClose} className="close-button">
            Close
          </button>
        </div>
      </div>
    )
  );
};

export default TaskViewModal;
