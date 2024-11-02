import React, { useState } from 'react';
import { Mail, Link2, GithubIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../../utils/api';

export const InviteModal = ({ teamId, onClose }) => {
  const [inviteMethod, setInviteMethod] = useState('email');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('member');
  const [inviteLink, setInviteLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [repoUrl, setRepoUrl] = useState('');

  const handleEmailInvite = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post(`/teams/${teamId}/invite`, { email, role });
      toast.success('Invitation sent successfully!');
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Failed to send invitation');
    } finally {
      setLoading(false);
    }
  };

  const generateInviteLink = async () => {
    try {
      setLoading(true);
      const response = await api.post(`/teams/${teamId}/invite-link`);
      setInviteLink(response.data.inviteLink);
      await navigator.clipboard.writeText(response.data.inviteLink);
      toast.success('Invite link copied to clipboard!');
    } catch (error) {
      toast.error('Failed to generate invite link');
    } finally {
      setLoading(false);
    }
  };

  const handleGithubConnect = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post(`/teams/${teamId}/github`, { repoUrl });
      toast.success('GitHub repository connected successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to connect GitHub repository');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-800">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Invite Team Members</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>

        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setInviteMethod('email')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 ${
              inviteMethod === 'email' ? 'bg-indigo-600 text-white' : 'bg-gray-200'
            }`}
          >
            <Mail className="h-4 w-4" /> Email
          </button>
          <button
            onClick={() => setInviteMethod('link')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 ${
              inviteMethod === 'link' ? 'bg-indigo-600 text-white' : 'bg-gray-100'
            }`}
          >
            <Link2 className="h-4 w-4" /> Link
          </button>
          <button
            onClick={() => setInviteMethod('github')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 ${
              inviteMethod === 'github' ? 'bg-indigo-600 text-white' : 'bg-gray-100'
            }`}
          >
            <GithubIcon className="h-4 w-4" /> GitHub
          </button>
        </div>

        {inviteMethod === 'email' && (
          <form onSubmit={handleEmailInvite}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              className="mb-2 w-full rounded-lg border p-2"
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mb-2 w-full rounded-lg border p-2"
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-white"
            >
              {loading ? 'Sending...' : 'Send Invitation'}
            </button>
          </form>
        )}

        {inviteMethod === 'link' && (
          <div className="flex flex-col gap-2">
            {inviteLink && (
              <input
                type="text"
                value={inviteLink}
                readOnly
                className="w-full rounded-lg border p-2"
              />
            )}
            <button
              onClick={generateInviteLink}
              disabled={loading}
              className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-white"
            >
              {loading ? 'Generating...' : 'Generate Invite Link'}
            </button>
          </div>
        )}

        {inviteMethod === 'github' && (
          <form onSubmit={handleGithubConnect}>
            <input
              type="text"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="Enter GitHub repository URL"
              className="mb-2 w-full rounded-lg border p-2"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-white"
            >
              {loading ? 'Connecting...' : 'Connect Repository'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}; 