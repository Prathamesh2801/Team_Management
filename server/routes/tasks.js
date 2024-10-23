const express = require('express');
const router = express.Router();
const { getAllTasks, createTask, getTeamTasks, createSubtask } = require('../controllers/taskController');
const auth = require('../middleware/auth');

router.get('/', auth, getAllTasks);
router.post('/', auth, createTask);
router.get('/team/:teamId', auth, getTeamTasks);
router.post('/subtask', auth, createSubtask);

module.exports = router;
