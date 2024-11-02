const Team = require('../models/Team');

const checkRole = (allowedRoles) => async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.teamId);
    if (!team) {
      return res.status(404).json({ msg: 'Team not found' });
    }

    // Check if user is owner
    if (team.owner.toString() === req.user.id) {
      return next();
    }

    // Check member role
    const member = team.members.find(m => m.user.toString() === req.user.id);
    if (!member || !allowedRoles.includes(member.role)) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    next();
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

module.exports = checkRole; 