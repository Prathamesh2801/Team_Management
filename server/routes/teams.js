const express = require('express');
const router = express.Router();
const { 
  createTeam, 
  getUserTeams, 
  updateTeam,
  deleteTeam,
  generateInviteLink,
  joinTeamWithInvite
} = require('../controllers/teamController');
const auth = require('../middleware/auth');

router.post('/', auth, createTeam);
router.get('/', auth, getUserTeams);
router.put('/:teamId', auth, updateTeam);
router.delete('/:teamId', auth, deleteTeam);
router.post('/:teamId/invite', auth, generateInviteLink);
router.post('/join/:inviteCode', auth, joinTeamWithInvite);

module.exports = router;
