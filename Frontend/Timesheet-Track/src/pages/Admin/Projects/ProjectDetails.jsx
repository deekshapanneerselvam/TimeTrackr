import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Overview from './Overview';
import Members from './Members';
import Tasks from './Tasks';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/projects/${projectId}`);
        if (response.ok) {
          const data = await response.json();
          setProject(data);
        } else {
          console.error('Error fetching project details');
        }
      } catch (err) {
        console.error('Error fetching project:', err);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview project={project} />;
      case 'members':
        return <Members project={project}/>;
      case 'tasks':
        return <Tasks />;
      default:
        return null;
    }
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold mb-6">Project: {project.project_name}</h1>
      <div className="flex space-x-4 border-b mb-6">
        {['overview', 'members', 'tasks'].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 text-sm font-medium border-b-2 transition ${
              activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-blue-600'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {renderContent()}
    </div>
  );
};

export default ProjectDetails;
