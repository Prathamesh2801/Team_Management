const Team = require('../models/Team');
const User = require('../models/User');

exports.createTeam = async (req, res) => {
  try {
    const { name } = req.body;
    
    const newTeam = new Team({
      name,
      owner: req.user.id,
      members: [req.user.id]
    });

    const team = await newTeam.save();
    res.json(team);
  } catch (err) {
    console.error('Error creating team:', err);
    res.status(500).json({ msg: 'Server error while creating team' });
  }
};

exports.getUserTeams = async (req, res) => {
  try {
    // Find teams where the user is either an owner or a member
    const teams = await Team.find({
      $or: [
        { owner: req.user.id },
        { members: req.user.id }
      ]
    });
    
    res.json(teams);
  } catch (err) {
    console.error('Error fetching teams:', err);
    res.status(500).json({ msg: 'Server error while fetching teams' });
  }
};

exports.addTeamMember = async (req, res) => {
  try {
    const { email } = req.body;
    const team = await Team.findById(req.params.teamId);
    
    if (!team) {
      return res.status(404).json({ msg: 'Team not found' });
    }
    
    if (team.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    if (team.members.includes(user._id)) {
      return res.status(400).json({ msg: 'User already in team' });
    }
    
    team.members.push(user._id);
    await team.save();
    
    await User.findByIdAndUpdate(user._id, { $push: { teams: team._id } });
    
    res.json(team);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.setTeamGoal = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { title, description, dueDate } = req.body;

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ msg: 'Team not found' });
    }

    if (team.owner.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Only team owner can set team goals' });
    }

    team.goal = { title, description, dueDate };
    await team.save();

    res.json(team);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
