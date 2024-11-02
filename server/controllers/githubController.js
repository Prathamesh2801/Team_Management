const axios = require('axios');
const Team = require('../models/Team');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

exports.connectGithubRepo = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { installationId, owner, repo } = req.body;

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ msg: 'Team not found' });
    }

    // Save GitHub repository info
    team.githubRepo = { installationId, owner, repo };
    await team.save();

    // Fetch collaborators from GitHub
    const githubToken = await getGithubInstallationToken(installationId);
    const collaborators = await getRepoCollaborators(owner, repo, githubToken);

    // Add collaborators to team invites
    for (const collaborator of collaborators.data) {
      if (!team.members.some(m => m.email === collaborator.email)) {
        team.members.push({
          email: collaborator.email,
          role: 'member',
          status: 'pending',
          inviteToken: crypto.randomBytes(20).toString('hex'),
          inviteExpires: Date.now() + 7 * 24 * 60 * 60 * 1000,
          inviteSource: 'github'
        });
        
        // Send invitation email
        await sendEmail({
          email: collaborator.email,
          subject: `Invitation to join ${team.name} from GitHub`,
          message: `You've been invited to join ${team.name} as a GitHub collaborator.`
        });
      }
    }

    await team.save();
    res.json({ msg: 'GitHub repository connected and collaborators invited' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.handleGithubCallback = async (req, res) => {
  try {
    const { code, teamId } = req.query;
    
    // Exchange code for access token
    const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code
    }, {
      headers: { Accept: 'application/json' }
    });

    const accessToken = tokenResponse.data.access_token;

    // Get repo collaborators
    const collaborators = await axios.get('https://api.github.com/user/repos', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });

    // Add collaborators to team
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ msg: 'Team not found' });
    }

    // Process collaborators and add them to team
    for (const collaborator of collaborators.data) {
      // Add logic to invite GitHub users
    }

    res.redirect(`${process.env.CLIENT_URL}/teams/${teamId}`);
  } catch (error) {
    console.error('GitHub integration error:', error);
    res.status(500).json({ msg: 'GitHub integration failed' });
  }
};

exports.connectGithub = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { code } = req.query;

    // Exchange code for access token
    const tokenRes = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code
    });

    // Save GitHub connection to team
    const team = await Team.findByIdAndUpdate(teamId, {
      githubIntegration: {
        accessToken: tokenRes.data.access_token,
        connectedAt: new Date()
      }
    });

    res.redirect(`${process.env.CLIENT_URL}/teams/${teamId}`);
  } catch (error) {
    console.error('GitHub connection error:', error);
    res.redirect(`${process.env.CLIENT_URL}/error?message=github_connection_failed`);
  }
}; 