const express = require('express');
const router = express.Router();
const { createTeam, getUserTeams, addTeamMember } = require('../controllers/teamController');
const auth = require('../middleware/auth');

// Create a new team
router.post('/', auth, createTeam);

// Get user's teams
router.get('/', auth, getUserTeams);

// Add a member to a team
router.post('/:teamId/members', auth, addTeamMember);

module.exports = router;
