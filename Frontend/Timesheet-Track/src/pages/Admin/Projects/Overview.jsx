import React from 'react';

const Overview = ({ project }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="border p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Totals</h2>
        <p>Total Hours: {project.total_hours ? project.total_hours : '0.00'} H</p>
      </div>

      <div className="border p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Project Details</h2>
        <p>Client: {project.client}</p>
        <p>Project: {project.project_name}</p>
        <p>Created at: {new Date(project.created_at).toLocaleDateString()}</p>
        <p>Custom ID: {project.project_id}</p>
        <p className="italic">{project.description || 'No description'}</p>
      </div>
    </div>
  );
};

export default Overview;
