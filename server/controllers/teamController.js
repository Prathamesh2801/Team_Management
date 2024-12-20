const Team = require('../models/Team');
const User = require('../models/User');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

exports.createTeam = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    const newTeam = new Team({
      name,
      description,
      owner: req.user.id,
      members: [{
        user: req.user.id,
        role: 'owner'
      }]
    });

    const team = await newTeam.save();
    
    // Generate an invite link for the team
    const inviteCode = crypto.randomBytes(6).toString('hex');
    team.inviteLinks = team.inviteLinks || [];
    team.inviteLinks.push({
      code: inviteCode,
      createdBy: req.user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    });

    await team.save();

    // Send the invite link back in the response
    res.status(201).json({
      team,
      inviteLink: `${process.env.CLIENT_URL}/join/${inviteCode}`
    });
  } catch (err) {
    console.error('Error creating team:', err);
    res.status(500).json({ msg: err.message || 'Server error while creating team' });
  }
};

exports.getUserTeams = async (req, res) => {
  try {
    const teams = await Team.find({
      $or: [
        { owner: req.user.id },
        { 'members.user': req.user.id }
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

exports.inviteTeamMember = async (req, res) => {
  try {
    const { email, role } = req.body;
    const { teamId } = req.params;

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ msg: 'Team not found' });
    }

    // Check if user has permission to invite
    if (team.owner.toString() !== req.user.id) {
      const memberRole = team.members.find(m => m.user.toString() === req.user.id)?.role;
      if (memberRole !== 'admin') {
        return res.status(403).json({ msg: 'Not authorized to invite members' });
      }
    }

    // Generate invite token
    const inviteToken = crypto.randomBytes(20).toString('hex');
    const inviteExpires = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days

    // Add member with pending status
    team.members.push({
      email,
      role,
      status: 'pending',
      inviteToken,
      inviteExpires
    });

    await team.save();

    // Send invitation email
    const inviteUrl = `${process.env.CLIENT_URL}/invite/${inviteToken}`;
    await sendEmail({
      email,
      subject: `Invitation to join ${team.name}`,
      message: `You've been invited to join ${team.name}. Click here to accept: ${inviteUrl}`
    });

    res.json({ msg: 'Invitation sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.generateTeamInviteLink = async (req, res) => {
  try {
    const { teamId } = req.params;
    const team = await Team.findById(teamId);
    
    if (!team) {
      return res.status(404).json({ msg: 'Team not found' });
    }

    // Generate a unique invite code
    let inviteCode;
    do {
      inviteCode = crypto.randomBytes(6).toString('hex');
    } while (team.inviteLinks.some(link => link.code === inviteCode)); // Ensure it's unique

    team.inviteLinks = team.inviteLinks || [];
    team.inviteLinks.push({
      code: inviteCode,
      createdBy: req.user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    });

    await team.save();
    res.json({ 
      inviteLink: `${process.env.CLIENT_URL}/join/${inviteCode}`,
      expiresAt: team.inviteLinks[team.inviteLinks.length - 1].expiresAt
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.connectGithubRepo = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { repoUrl } = req.body;
    
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ msg: 'Team not found' });
    }

    // Extract owner and repo from GitHub URL
    const [owner, repo] = repoUrl.split('/').slice(-2);
    
    team.githubRepo = { owner, repo };
    await team.save();

    // Initialize GitHub webhook
    await setupGithubWebhook(owner, repo, teamId);
    
    res.json({ msg: 'GitHub repository connected successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.updateTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { name, description } = req.body;
    
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ msg: 'Team not found' });
    }

    if (team.owner.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized to update team' });
    }

    team.name = name;
    team.description = description;
    await team.save();

    res.json(team);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.deleteTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const team = await Team.findById(teamId);
    
    if (!team) {
      return res.status(404).json({ msg: 'Team not found' });
    }

    if (team.owner.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized to delete team' });
    }

    await team.remove();
    res.json({ msg: 'Team deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.generateInviteLink = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { role = 'member' } = req.body;
    
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ msg: 'Team not found' });
    }

    // Check if user has permission
    const member = team.members.find(m => m.user.toString() === req.user.id);
    if (!member || !['owner', 'admin'].includes(member.role)) {
      return res.status(403).json({ msg: 'Not authorized to generate invite links' });
    }

    const inviteCode = crypto.randomBytes(6).toString('hex');
    team.inviteLinks.push({
      code: inviteCode,
      role,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    });

    await team.save();
    res.json({ inviteCode });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.joinTeamWithInvite = async (req, res) => {
  try {
    const { inviteCode } = req.params;
    
    const team = await Team.findOne({ 'inviteLinks.code': inviteCode });
    if (!team) {
      return res.status(404).json({ msg: 'Invalid invite code' });
    }

    const invite = team.inviteLinks.find(link => link.code === inviteCode);
    if (new Date() > invite.expiresAt) {
      return res.status(400).json({ msg: 'Invite link has expired' });
    }

    if (!team.members.some(m => m.user.toString() === req.user.id)) {
      team.members.push({
        user: req.user.id,
        role: invite.role
      });
      await team.save();
    }

    res.json(team);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
