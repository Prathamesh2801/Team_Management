import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../../utils/api';

export const InviteHandler = ({ teamId }) => {
  const [inviteType, setInviteType] = useState('email');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('member');
  
  const handleEmailInvite = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/teams/${teamId}/invite`, { email, role });
      toast.success('Invitation sent successfully!');
      setEmail('');
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Failed to send invitation');
    }
  };

  const generateInviteLink = async () => {
    try {
      const response = await api.post(`/teams/${teamId}/invite-link`);
      navigator.clipboard.writeText(response.data.inviteLink);
      toast.success('Invite link copied to clipboard!');
    } catch (error) {
      toast.error('Failed to generate invite link');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <button
          onClick={() => setInviteType('email')}
          className={`px-4 py-2 rounded ${
            inviteType === 'email' ? 'bg-indigo-600 text-white' : 'bg-gray-200'
          }`}
        >
          Email Invite
        </button>
        <button
          onClick={() => setInviteType('link')}
          className={`px-4 py-2 rounded ${
            inviteType === 'link' ? 'bg-indigo-600 text-white' : 'bg-gray-200'
          }`}
        >
          Generate Link
        </button>
      </div>

      {inviteType === 'email' ? (
        <form onSubmit={handleEmailInvite} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            className="w-full p-2 border rounded"
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded"
          >
            Send Invitation
          </button>
        </form>
      ) : (
        <button
          onClick={generateInviteLink}
          className="w-full bg-indigo-600 text-white py-2 rounded"
        >
          Generate Invite Link
        </button>
      )}
    </div>
  );
}; 