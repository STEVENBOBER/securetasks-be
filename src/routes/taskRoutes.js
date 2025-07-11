const express = require('express');
const { getTasks, createTask, deleteTask } = require('../controllers/taskController');
const protect = require('../middlewares/authMiddleware');
const allowRoles = require('../middlewares/roleMiddleware');
const validateTask = require('../middlewares/validateTask');
const router = express.Router();

router.use(protect);
router.get('/', getTasks);
router.post('/', validateTask, createTask);
router.delete('/:id', allowRoles('admin'), deleteTask);

module.exports = router;