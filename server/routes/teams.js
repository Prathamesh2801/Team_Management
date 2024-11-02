const express = require('express');
const router = express.Router();
const { 
  createTeam, 
  getUserTeams, 
  addTeamMember,
  setTeamGoal,
  inviteTeamMember,
  generateTeamInviteLink,
  connectGithubRepo
} = require('../controllers/teamController');
const auth = require('../middleware/auth');
const githubController = require('../controllers/githubController');

router.post('/', auth, createTeam);
router.get('/', auth, getUserTeams);
router.post('/:teamId/members', auth, addTeamMember);
router.post('/:teamId/goal', auth, setTeamGoal);
router.post('/:teamId/invite', auth, inviteTeamMember);
router.post('/:teamId/invite-link', auth, generateTeamInviteLink);
router.post('/:teamId/github', auth, connectGithubRepo);
router.post('/:teamId/github/connect', auth, githubController.connectGithub);

module.exports = router;
