const express = require('express');
const router = express.Router();
const { createTeam, getUserTeams, addTeamMember, setTeamGoal } = require('../controllers/teamController');
const auth = require('../middleware/auth');

// Create a new team
router.post('/', auth, createTeam);

// Get user's teams
router.get('/', auth, getUserTeams);

// Add a member to a team
router.post('/:teamId/members', auth, addTeamMember);

// Set team goal
router.post('/:teamId/goal', auth, setTeamGoal);

module.exports = router;
