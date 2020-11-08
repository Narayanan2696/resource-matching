const router = require('express').Router();
const EmployeeController = require('../controllers/employeesController');

router.post('/', EmployeeController.employeeCreation);

module.exports = router;
