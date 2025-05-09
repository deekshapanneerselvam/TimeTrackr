const express = require('express');
const router = express.Router();
const {
  createTimesheet,
  getTimesheets,
  getAllTimeSheets,
  updateStatus,
  analysis
  
} = require('../controllers/timesheet.controller');

// POST: Add timesheet entry
router.post('/', createTimesheet);

// GET: Get all timesheets or filter by employee_id
router.get('/', getTimesheets);

router.get('/manager',getAllTimeSheets);

router.put('/status',updateStatus);

router.get('/analysis',analysis);

module.exports = router;
