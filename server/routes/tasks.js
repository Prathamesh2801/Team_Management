const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Task = require('../models/Task'); // Assuming you have a Task model

// Middleware for authenticating using JWT
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// @route   GET api/tasks
// @desc    Get all tasks of the logged-in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }); // Fetch tasks by user ID
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/tasks
// @desc    Create a task
// @access  Private (Requires authentication)
router.post('/', auth, async (req, res) => {
  const { title, description, status, dueDate } = req.body;

  if (!title || !description || !status || !dueDate) {
    return res.status(400).json({ msg: 'Please provide all required fields' });
  }

  try {
    const newTask = new Task({
      title,
      description,
      status,
      dueDate,
      user: req.user.id // Associate the task with the logged-in user
    });

    const task = await newTask.save();
    res.status(201).json({ msg: 'Task created successfully', task });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
