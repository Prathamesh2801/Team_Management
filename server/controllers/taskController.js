const Task = require('../models/Task');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.createTask = async (req, res) => {
  const { title, description, status, dueDate, teamId, assignedTo } = req.body;

  if (!title || !description || !status || !dueDate) {
    return res.status(400).json({ msg: 'Please provide all required fields' });
  }

  try {
    const newTask = new Task({
      title,
      description,
      status,
      dueDate,
      user: req.user.id,
      team: teamId,
      assignedTo
    });

    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getTeamTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ team: req.params.teamId });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
