const express = require('express');
const router = express.Router();
const { getAllTasks, createTask, getTeamTasks } = require('../controllers/taskController');
const auth = require('../middleware/auth');

router.get('/', auth, getAllTasks);
router.post('/', auth, createTask);
router.get('/team/:teamId', auth, getTeamTasks);

module.exports = router;
