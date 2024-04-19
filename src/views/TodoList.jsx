import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskViewModal from "../components/TaskViewModal";

const TodoList = ({ token }) => {
  const [tasks, setTasks] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("https://demo2.z-bit.ee/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleSaveEditTask = async () => {
    try {
      if (!selectedTask) return;
      const response = await axios.put(
        `https://demo2.z-bit.ee/tasks/${selectedTask.id}`,
        {
          title: taskName,
          marked_as_done: selectedTask.marked_as_done,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedTask = { ...selectedTask, title: response.data.title };
      setTasks(
        tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
      handleCloseDialog();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTask(null);
    setTaskName("");
    setTaskDescription("");
  };

  const handleCreateTask = async () => {
    try {
      const response = await axios.post(
        "https://demo2.z-bit.ee/tasks",
        {
          title: taskName,
          desc: taskDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks([...tasks, response.data]);
      handleCloseDialog();
      fetchTasks(); // Call fetchTasks to update the task list
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };
  

  const handleCheckboxChange = async (taskId, checked) => {
    try {
      const response = await axios.put(
        `https://demo2.z-bit.ee/tasks/${taskId}`,
        {
          marked_as_done: checked,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedTask = {
        ...tasks.find((task) => task.id === taskId),
        marked_as_done: checked,
      };
      setTasks(
        tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setTaskName(task.title);
    setTaskDescription(task.desc);
    setOpenDialog(true);
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
    setViewModalOpen(true);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`https://demo2.z-bit.ee/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleCloseViewModal = () => {
    setViewModalOpen(false);
  };

  return (
    <div className="todo-list-container">
      <table>
        <thead>
          <tr>
            <th>Done</th>
            <th>Task Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>
                <input
                  type="checkbox"
                  checked={task.marked_as_done}
                  onChange={(e) =>
                    handleCheckboxChange(task.id, e.target.checked)
                  }
                />
              </td>
              <td>{task.title}</td>
              <td>{task.desc}</td>
              <td>
                <button onClick={() => handleEditTask(task)}>Edit</button>
                <button onClick={() => handleViewTask(task)}>View</button>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleOpenDialog} className="create-task-button">
        Create Task
      </button>
      {openDialog && (
        <div className="dialog">
          <div className="dialog-content">
            <h2>{selectedTask ? "Edit Task" : "Create New Task"}</h2>
            <input
              type="text"
              placeholder="Task Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            {!selectedTask && (
              <input
                type="text"
                placeholder="Task Description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            )}
          </div>
          <div className="dialog-actions">
            <button onClick={handleCloseDialog}>Cancel</button>
            {selectedTask ? (
              <button onClick={handleSaveEditTask}>Save</button>
            ) : (
              <button onClick={handleCreateTask}>Create</button>
            )}
          </div>
        </div>
      )}
      <TaskViewModal
        open={viewModalOpen}
        onClose={handleCloseViewModal}
        task={selectedTask}
      />
    </div>
  );
};

export default TodoList;
