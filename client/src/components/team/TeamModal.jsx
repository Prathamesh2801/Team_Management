import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../../utils/api";

export const TeamModal = ({ onClose, onCreate, initialMode = "create" }) => {
  const [mode, setMode] = useState(initialMode);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    inviteCode: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (mode === "create") {
        response = await api.post("/teams", {
          name: formData.name,
          description: formData.description
        });
        onCreate({
          ...response.data,
          isJoined: false
        });
      } else {
        response = await api.post(`/teams/join/${formData.inviteCode}`);
        onCreate({
          ...response.data,
          isJoined: true
        });
      }
      onClose();
    } catch (error) {
      console.error('Error:', error);
      toast.error(mode === "create" 
        ? "Failed to create team: " + (error.response?.data?.msg || "Unknown error")
        : "Failed to join team: " + (error.response?.data?.msg || "Unknown error")
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg dark:bg-neutral-900">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white">
            {mode === "create" ? "Create New Team" : "Join Team"}
          </h3>
          <button onClick={onClose} className="rounded-full p-1.5 text-neutral-500 hover:bg-neutral-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setMode("create")}
            className={`flex-1 rounded-lg px-4 py-2 ${mode === "create" ? "bg-indigo-600 text-white" : "bg-neutral-100"}`}
          >
            Create Team
          </button>
          <button
            onClick={() => setMode("join")}
            className={`flex-1 rounded-lg px-4 py-2 ${mode === "join" ? "bg-indigo-600 text-white" : "bg-neutral-100"}`}
          >
            Join Team
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "create" ? (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-200">
                  Team Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-neutral-200 p-2.5 dark:border-neutral-700 dark:bg-neutral-800"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-200">
                  Description (Optional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-lg border border-neutral-200 p-2.5 dark:border-neutral-700 dark:bg-neutral-800"
                  rows="3"
                />
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-200">
                Invite Code
              </label>
              <input
                type="text"
                value={formData.inviteCode}
                onChange={(e) => setFormData({ ...formData, inviteCode: e.target.value })}
                className="w-full rounded-lg border border-neutral-200 p-2.5 dark:border-neutral-700 dark:bg-neutral-800"
                placeholder="Enter invite code"
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-white hover:bg-indigo-700"
          >
            {mode === "create" ? "Create Team" : "Join Team"}
          </button>
        </form>
      </div>
    </div>
  );
}; 