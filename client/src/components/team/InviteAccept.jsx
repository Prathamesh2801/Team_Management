import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import  api  from '../../utils/api';

export const InviteAccept = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const acceptInvite = async () => {
      try {
        await api.post(`/teams/invite/${token}/accept`);
        toast.success('Invitation accepted successfully!');
        navigate('/dashboard');
      } catch (error) {
        toast.error(error.response?.data?.msg || 'Failed to accept invitation');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    acceptInvite();
  }, [token, navigate]);

  if (loading) {
    return <div>Accepting invitation...</div>;
  }

  return null;
}; 