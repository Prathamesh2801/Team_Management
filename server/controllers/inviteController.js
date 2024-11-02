const Team = require('../models/Team');
const crypto = require('crypto');

exports.generateTeamInviteLink = async (req, res) => {
  try {
    const { teamId } = req.params;
    const team = await Team.findById(teamId);
    
    if (!team) {
      return res.status(404).json({ msg: 'Team not found' });
    }

    // Check if user has permission
    if (team.owner.toString() !== req.user.id && 
        !team.members.some(m => m.user.toString() === req.user.id && m.role === 'admin')) {
      return res.status(403).json({ msg: 'Not authorized to generate invite links' });
    }

    // Generate unique invite code
    const inviteCode = crypto.randomBytes(6).toString('hex');
    
    team.inviteLinks = team.inviteLinks || [];
    team.inviteLinks.push({
      code: inviteCode,
      createdBy: req.user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    });

    await team.save();

    res.json({ 
      inviteLink: `${process.env.CLIENT_URL}/join-team/${inviteCode}`,
      expiresAt: team.inviteLinks[team.inviteLinks.length - 1].expiresAt
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
}; 