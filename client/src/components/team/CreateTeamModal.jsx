import { useState } from "react";
import { X } from "lucide-react";
import api from "../../utils/api";
import { toast } from "react-hot-toast";

export const CreateTeamModal = ({ onClose, onCreate, team = null }) => {
  const [teamData, setTeamData] = useState({
    name: team?.name || "",
    description: team?.description || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (team) {
      try {
        const response = await api.put(`/teams/${team._id}`, teamData);
        onCreate(response.data, true);
      } catch (error) {
        toast.error('Failed to update team');
      }
    } else {
      onCreate(teamData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg dark:bg-neutral-900 dark:ring-1 dark:ring-white/10">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white">
            {team ? 'Edit Team' : 'Create New Team'}
          </h3>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-200">
              Team Name
            </label>  
            <input
              type="text"
              value={teamData.name}
              onChange={(e) =>
                setTeamData({ ...teamData, name: e.target.value })
              }
              required
              className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-neutral-900 placeholder-neutral-400 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-neutral-800 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500 dark:focus:border-indigo-500"
              placeholder="Enter team name"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-200">
              Description (Optional)
            </label>
            <textarea
              value={teamData.description}
              onChange={(e) =>
                setTeamData({...teamData, description: e.target.value })
              }
              className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-neutral-900 placeholder-neutral-400 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-neutral-800 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-500 dark:focus:border-indigo-500"
              placeholder="Enter team description"
              rows="3"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-neutral-100 px-4 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-200 focus:ring-2 focus:ring-neutral-500/20 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {team ? 'Update Team' : 'Create Team'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTeamModal;
