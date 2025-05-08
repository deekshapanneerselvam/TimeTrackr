// routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/empController');

// Add a new employee
router.post('/', employeeController.createEmployee);


// Get all employees
router.get('/', employeeController.getAllEmployees);

router.delete('/:id',employeeController.deleteEmployee);

router.put('/:id',employeeController.updateEmployee);



module.exports = router;
