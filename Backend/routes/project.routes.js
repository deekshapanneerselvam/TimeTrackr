// routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const projectController=require('../controllers/project.controller');

// Add a new employee
router.post('/', projectController.addProject);
router.get('/', projectController.getProjects);
router.get('/assigned-proj',projectController.getProjectsForEmployee);
router.get('/:projectId',projectController.getProjectById);


module.exports = router;
