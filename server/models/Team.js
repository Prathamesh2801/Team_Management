const mongoose = require('mongoose');

const InviteLinkSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  expiresAt: {
    type: Date,
    required: true
  },
  isUsed: {
    type: Boolean,
    default: false
  }
});

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    role: {
      type: String,
      enum: ['owner', 'admin', 'member'],
      default: 'member'
    },
    status: {
      type: String,
      enum: ['pending', 'active'],
      default: 'pending'
    },
    inviteToken: String,
    inviteExpires: Date
  }],
  goal: {
    title: String,
    description: String,
    dueDate: Date,
    status: {
      type: String,
      enum: ['not_started', 'in_progress', 'completed'],
      default: 'not_started'
    }
  },
  inviteLinks: [InviteLinkSchema],
  githubRepo: {
    owner: String,
    repo: String,
    installationId: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Team', TeamSchema);
