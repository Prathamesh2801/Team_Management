const mongoose = require('mongoose');

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
    email: String,
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
  inviteLinks: [{
    code: {
      type: String,
      sparse: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    expiresAt: Date
  }],
  goal: {
    title: String,
    description: String,
    dueDate: Date
  },
  githubRepo: {
    owner: String,
    repo: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Team', TeamSchema);
