import React, { useState } from 'react';
import { Mail, Link, Github } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../../utils/api';

export const InviteModal = ({ teamId, onClose }) => {
  const [inviteMethod, setInviteMethod] = useState('email');
  const [email, setEmail] = useState('');
  const [inviteLink, setInviteLink] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailInvite = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post(`/teams/${teamId}/invite`, { email });
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
    } catch (error) {
      toast.error('Failed to generate invite link');
    } finally {
      setLoading(false);
    }
  };

  const connectGithub = () => {
    window.location.href = `${process.env.VITE_API_URL}/auth/github/connect/${teamId}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 dark:bg-neutral-900">
        <h2 className="mb-4 text-xl font-bold">Invite Team Members</h2>
        
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setInviteMethod('email')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 ${
              inviteMethod === 'email' ? 'bg-indigo-600 text-white' : 'bg-gray-100'
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
            <Link className="h-4 w-4" /> Link
          </button>
          <button
            onClick={() => setInviteMethod('github')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 ${
              inviteMethod === 'github' ? 'bg-indigo-600 text-white' : 'bg-gray-100'
            }`}
          >
            <Github className="h-4 w-4" /> GitHub
          </button>
        </div>
      </div>
    </div>
  );
}; 