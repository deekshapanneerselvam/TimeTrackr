import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    project_id: '',
    project_name: '',
    client: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();  // Initialize useNavigate

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({});
  };

  const handleSubmit = async () => {
    if (!formData.project_id || !formData.project_name || !formData.client) {
      setFormErrors({ general: 'All fields are required!' });
      return;
    }

    const existing = projects.find(p => p.project_id === formData.project_id);
    if (existing) {
      setFormErrors({ general: 'Project ID already exists!' });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          created_at: new Date().toISOString()
        })
      });

      if (response.ok) {
        const newProject = await response.json();
        setProjects([...projects, newProject]);
        setIsDialogOpen(false);
        setFormData({ project_id: '', project_name: '', client: '' });
      }
    } catch (err) {
      console.error('Error adding project:', err);
    }
  };

  const handleRowClick = (id) => {
    navigate(`/admin/project/${id}`);  // Navigate to the project details page
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <style>{`
        .add-button {
          background-color: #4f46e5;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 5px;
          cursor: pointer;
        }

        .project-table {
          width: 100%;
          border-collapse: collapse;
        }

        .project-table th, .project-table td {
          padding: 10px;
          border: 1px solid #ddd;
        }

        .project-table th {
          background-color: #f3f4f6;
        }

        .dialog {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .dialog-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          width: 400px;
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
          margin-right: 10px;
          cursor: pointer;
        }

        .cancel {
          background-color: #ccc;
        }

        .error {
          color: red;
          font-size: 0.9em;
          margin-top: 5px;
        }
      `}</style>

      <h2>Project Management</h2>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '15px' }}>
        <button className="add-button" onClick={() => setIsDialogOpen(true)}>
          + Add Project
        </button>
      </div>

      <table className="project-table">
        <thead>
          <tr>
            <th>Project ID</th>
            <th>Project Name</th>
            <th>Client</th>
            <th>Created Date</th>
          </tr>
        </thead>
        <tbody>
          {projects.length > 0 ? (
            projects.map((proj, index) => (
              <tr key={index} onClick={() => handleRowClick(proj.project_id)} style={{ cursor: 'pointer' }}>
                <td>{proj.project_id}</td>
                <td>{proj.project_name}</td>
                <td>{proj.client}</td>
                <td>{new Date(proj.created_at).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No projects found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {isDialogOpen && (
        <div className="dialog">
          <div className="dialog-content">
            <h3>Add New Project</h3>
            <input
              className="dialog-input"
              name="project_id"
              placeholder="Project ID"
              value={formData.project_id}
              onChange={handleChange}
            />
            <input
              className="dialog-input"
              name="project_name"
              placeholder="Project Name"
              value={formData.project_name}
              onChange={handleChange}
            />
            <input
              className="dialog-input"
              name="client"
              placeholder="Client Name"
              value={formData.client}
              onChange={handleChange}
            />
            {formErrors.general && <div className="error">{formErrors.general}</div>}
            <div style={{ marginTop: '10px' }}>
              <button className="dialog-button" onClick={handleSubmit}>Submit</button>
              <button className="dialog-button cancel" onClick={() => setIsDialogOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManagement;
