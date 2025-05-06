// routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const projectController=require('../controllers/project.controller');

// Add a new employee
router.post('/', projectController.addProject);

module.exports = router;
