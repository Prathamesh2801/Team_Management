const Task = require('../models/Task');
const Team = require('../models/Team');

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

  if (!title || !description || !status || !dueDate || !teamId) {
    return res.status(400).json({ msg: 'Please provide all required fields' });
  }

  try {
    // Check if the user is a member of the team
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ msg: 'Team not found' });
    }
    if (!team.members.includes(req.user.id)) {
      return res.status(403).json({ msg: 'You are not a member of this team' });
    }

    // If assignedTo is provided, check if the assigned user is a team member
    if (assignedTo && !team.members.includes(assignedTo)) {
      return res.status(400).json({ msg: 'Assigned user is not a team member' });
    }

    const newTask = new Task({
      title,
      description,
      status,
      dueDate,
      user: req.user.id,
      team: teamId,
      assignedTo: assignedTo || req.user.id // If not assigned, default to the creator
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

exports.createSubtask = async (req, res) => {
  const { title, description, status, dueDate, teamId, assignedTo, parentTaskId } = req.body;

  if (!title || !description || !status || !dueDate || !teamId || !parentTaskId) {
    return res.status(400).json({ msg: 'Please provide all required fields' });
  }

  try {
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ msg: 'Team not found' });
    }
    if (!team.members.includes(req.user.id)) {
      return res.status(403).json({ msg: 'You are not a member of this team' });
    }

    const parentTask = await Task.findById(parentTaskId);
    if (!parentTask) {
      return res.status(404).json({ msg: 'Parent task not found' });
    }

    if (assignedTo && !team.members.includes(assignedTo)) {
      return res.status(400).json({ msg: 'Assigned user is not a team member' });
    }

    const newSubtask = new Task({
      title,
      description,
      status,
      dueDate,
      user: req.user.id,
      team: teamId,
      assignedTo: assignedTo || req.user.id,
      parentTask: parentTaskId
    });

    const subtask = await newSubtask.save();
    res.json(subtask);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
