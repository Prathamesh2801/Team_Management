import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import api from "../../utils/api";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { TeamModal } from "../team/TeamModal";
import { InviteLinkModal } from "../team/InviteLinkModal";

export const TeamProjects = ({ setTeams }) => {
  const [teams, setLocalTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [editingTeam, setEditingTeam] = useState(null);
  const [inviteLink, setInviteLink] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchTeams();
    }
  }, [user]);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const response = await api.get("/teams");
      setLocalTeams(response.data);
      setTeams(response.data);
    } catch (error) {
      console.error("Error fetching teams:", error);
      toast.error("Failed to load teams");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTeam = async (teamData) => {
    try {
      const response = await api.post("/teams", teamData);
      setLocalTeams((prevTeams) => [...prevTeams, response.data]);
      setTeams((prevTeams) => [...prevTeams, response.data]);
      toast.success("Team created successfully!");
    } catch (error) {
      console.error("Error creating team:", error);
      toast.error("Failed to create team");
    }
  };

  const handleInvite = (teamId) => {
    setSelectedTeamId(teamId);
    setShowInviteModal(true);
  };

  const handleEditTeam = (team) => {
    setEditingTeam(team);
    setShowCreateModal(true);
  };

  const handleDeleteTeam = async (teamId) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      try {
        await api.delete(`/teams/${teamId}`);
        setLocalTeams(teams.filter(team => team._id !== teamId));
        toast.success('Team deleted successfully!');
      } catch (error) {
        console.error('Error deleting team:', error);
        toast.error('Failed to delete team');
      }
    }
  };

  // Optional: Display invite link in a modal or toast
  const handleCloseInviteLink = () => {
    setInviteLink(""); // Clear invite link when closing
  };

  if (loading) {
    return (
      <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-neutral-900">
        <p className="text-center text-gray-500">Loading teams...</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-neutral-200 p-6 dark:bg-neutral-900">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Team Projects
        </h2>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          New Team
        </button>
      </div>

      {teams.length === 0 ? (
        <p className="text-center text-gray-500">No teams found</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {teams.map((team) => (
            <div
              key={team._id}
              className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {team.name}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditTeam(team)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTeam(team._id)}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
              {team.goal && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  Goal: {team.goal.title}
                </p>
              )}
              <button
                onClick={() => handleInvite(team._id)}
                className="mt-2 text-sm text-indigo-600 hover:text-indigo-700"
              >
                Invite Members
              </button>
            </div>
          ))}
        </div>
      )}

      {showCreateModal && (
        <TeamModal 
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateTeam}
        />
      )}

      {showInviteModal && (
        <InviteLinkModal 
          teamId={selectedTeamId}
          onClose={() => setShowInviteModal(false)}
        />
      )}

      {inviteLink && (
        <div className="toast">
          <p>Invite Link: {inviteLink}</p>
          <button onClick={handleCloseInviteLink}>Close</button>
        </div>
      )}
    </div>
  );
};
