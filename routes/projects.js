const router = require('express').Router();
const ProjectController = require('../controllers/projectsController');
const TaskController = require('../controllers/tasksController');

router.post('/', ProjectController.projectCreation);
router.post('/:projectId/tasks', TaskController.taskCreation);

router.patch(
  '/:projectId/assign-manager',
  ProjectController.assignProjectManager
);
router.patch(
  '/:projectId/tasks/:taskId/assign-staff',
  TaskController.assignStaffToTask
);

module.exports = router;
