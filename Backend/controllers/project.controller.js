const Project= require('../models/project.model');

// controllers/projectController.js

const addProject = async (req, res) => {
  try {
    const { project_id, project_name, client, created_at } = req.body;

    // Check for missing fields
    if (!project_id || !project_name || !client || !created_at) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check for existing project ID
    const existingProject = await Project.findOne({ project_id });
    if (existingProject) {
      return res.status(409).json({ error: 'Project ID already exists' });
    }

    // Create new project
    const newProject = new Project({
      project_id,
      project_name,
      client,
      created_at
    });

    await newProject.save();

    res.status(201).json(newProject);
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getProjects = async (req, res) => {
    try {
      const projects = await Project.find(); // newest first
      res.status(200).json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ error: 'Failed to fetch projects' });
    }
  };

  const getProjectById = async (req, res) => {
    try {
      const { projectId } = req.params; 
      console.log("backend",projectId);

      const project = await Project.findOne({ project_id: projectId });
  
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      res.status(200).json(project);
    } catch (error) {
      console.error('Error fetching project by ID:', error);
      res.status(500).json({ error: 'Failed to fetch project' });
    }
  };
  

  

module.exports = {
  addProject,
  getProjects,
  getProjectById,
};
