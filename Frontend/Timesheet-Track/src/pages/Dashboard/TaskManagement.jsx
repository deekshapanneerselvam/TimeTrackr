import React, { useState } from 'react';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: '',
  });
  const [editTask, setEditTask] = useState(null); // State for selected task for editing
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog visibility
  const [dialogType, setDialogType] = useState(null); // 'edit' or 'delete' dialog type

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddTask = () => {
    if (formData.title && formData.description && formData.dueDate && formData.priority) {
      setTasks([...tasks, formData]);
      setFormData({ title: '', description: '', dueDate: '', priority: '' }); // Reset formData after adding
    }
  };

  const handleEditTask = (task) => {
    setEditTask(task);
    setFormData(task); // Set form data to the selected task's data
    setDialogType('edit');
    setIsDialogOpen(true);
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
    setIsDialogOpen(false);
  };

  const handleSaveTask = () => {
    const updatedTasks = tasks.map((task) =>
      task === editTask ? formData : task
    );
    setTasks(updatedTasks);
    setIsDialogOpen(false);
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <style>{`
        .form-row {
          display: flex;
          gap: 10px;
          margin-bottom: 15px;
          flex-wrap: wrap;
        }

        .form-row input {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 5px;
          flex: 1;
          min-width: 180px;
        }

        .add-button {
          background-color: #4f46e5;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 5px;
          cursor: pointer;
        }

        .search-input {
          width: 100%;
          padding: 8px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .task-table {
          width: 100%;
          border-collapse: collapse;
        }

        .task-table th,
        .task-table td {
          padding: 10px;
          border: 1px solid #ddd;
          text-align: left;
        }

        .task-table th {
          background-color: #f3f4f6;
        }

        .no-data {
          color: #555;
          margin-top: 10px;
        }

        .dialog {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .dialog-content {
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          width: 400px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        }

        .dialog-header {
          font-size: 1.2em;
          margin-bottom: 15px;
        }

        .dialog-input {
          width: 100%;
          padding: 8px;
          margin: 10px 0;
          border-radius: 5px;
          border: 1px solid #ccc;
        }

        .dialog-button {
          background-color: #4f46e5;
          color: white;
          padding: 8px 16px;
          border-radius: 5px;
          cursor: pointer;
          margin: 5px;
        }

        .dialog-button.cancel {
          background-color: #ccc;
        }
      `}</style>

      <h2>Task Management</h2>

      <div className="form-row">
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
        <input
          type="text"
          name="priority"
          placeholder="Priority"
          value={formData.priority}
          onChange={handleChange}
        />
        <button className="add-button" onClick={handleAddTask}>
          Add Task
        </button>
      </div>

      <input
        type="text"
        className="search-input"
        placeholder="Search by title or description..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task, index) => (
              <tr key={index}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.dueDate}</td>
                <td>{task.priority}</td>
                <td>
                  <button
                    style={{ padding: '4px 10px' }}
                    onClick={() => handleEditTask(task)}
                  >
                    Edit
                  </button>
                  <button
                    style={{ padding: '4px 10px', marginLeft: '5px' }}
                    onClick={() => {
                      setEditTask(task);
                      setDialogType('delete');
                      setIsDialogOpen(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-data">No tasks found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Dialog Box for Edit/Delete */}
      {isDialogOpen && (
        <div className="dialog">
          <div className="dialog-content">
            <h3 className="dialog-header">{dialogType === 'edit' ? 'Edit Task' : 'Delete Task'}</h3>
            {dialogType === 'edit' ? (
              <div>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="dialog-input"
                />
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="dialog-input"
                />
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="dialog-input"
                />
                <input
                  type="text"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="dialog-input"
                />
                <button className="dialog-button" onClick={handleSaveTask}>
                  Save Changes
                </button>
              </div>
            ) : (
              <div>
                <p>Are you sure you want to delete this task?</p>
                <button
                  className="dialog-button"
                  onClick={() => handleDeleteTask(filteredTasks.indexOf(editTask))}
                >
                  Yes, Delete
                </button>
                <button
                  className="dialog-button cancel"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManagement;
