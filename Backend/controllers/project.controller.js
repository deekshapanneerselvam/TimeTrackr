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

module.exports = {
  addProject
};
