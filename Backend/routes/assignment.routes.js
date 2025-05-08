const express = require('express');
const router = express.Router();
const {
  assignEmployee,
  getProjectAssignments
} = require('../controllers/assignment.controller');

// POST: Assign employee to project
router.post('/', assignEmployee);

// GET: Get employees for a project
router.get('/project/:project_id', getProjectAssignments);

module.exports = router;
