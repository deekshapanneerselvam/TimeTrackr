import React, { useState, useEffect } from 'react';

const EmployeeProjects = ({ employeeId }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/projects/employee/${employeeId}`);
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [employeeId]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Assigned Projects</h2>

      {loading ? (
        <p>Loading projects...</p>
      ) : (
        <table className="w-full border mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-2 px-4 border-b">Project Name</th>
              <th className="text-left py-2 px-4 border-b">Role</th>
              <th className="text-left py-2 px-4 border-b">Start Date</th>
              <th className="text-left py-2 px-4 border-b">Status</th>
              <th className="text-left py-2 px-4 border-b">Manager</th>
            </tr>
          </thead>
          <tbody>
            {projects.length > 0 ? (
              projects.map(project => (
                <tr key={project.project_id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{project.project_name}</td>
                  <td className="py-2 px-4 border-b">{project.role}</td>
                  <td className="py-2 px-4 border-b">{project.start_date}</td>
                  <td className="py-2 px-4 border-b">{project.status}</td>
                  <td className="py-2 px-4 border-b">{project.manager}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-2 px-4 border-b text-center">No projects assigned</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeProjects;
