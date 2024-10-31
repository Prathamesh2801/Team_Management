import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import api from "../../utils/api";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

export const TeamProjects = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
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
      setTeams(response.data);
    } catch (error) {
      console.error("Error fetching teams:", error);
      toast.error("Failed to load teams");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-neutral-900">
        <p className="text-center text-gray-500">Loading teams...</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-neutral-900">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Team Projects
        </h2>
        <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
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
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {team.name}
              </h3>
              {team.goal && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  Goal: {team.goal.title}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 