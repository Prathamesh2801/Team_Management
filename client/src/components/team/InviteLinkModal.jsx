import { useState } from "react";
import { X, Copy, Check } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../../utils/api";

export const InviteLinkModal = ({ teamId, onClose }) => {
  const [role, setRole] = useState("member");
  const [inviteLink, setInviteLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateInviteLink = async () => {
    try {
      setLoading(true);
      const response = await api.post(`/teams/${teamId}/invite`, { role });
      const link = `${window.location.origin}/join/${response.data.inviteCode}`;
      setInviteLink(link);
    } catch (error) {
      toast.error("Failed to generate invite link");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      toast.success("Invite link copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg dark:bg-neutral-900">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-2xl font-semibold">Invite Team Members</h3>
          <button onClick={onClose} className="rounded-full p-1.5 hover:bg-neutral-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Member Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 w-full rounded-lg border p-2"
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>

          <button
            onClick={generateInviteLink}
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            {loading ? "Generating..." : "Generate Invite Link"}
          </button>

          {inviteLink && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between rounded-lg border p-3">
                <input
                  type="text"
                  value={inviteLink}
                  readOnly
                  className="flex-1 bg-transparent"
                />
                <button
                  onClick={copyToClipboard}
                  className="ml-2 rounded-lg p-2 hover:bg-neutral-100"
                >
                  {copied ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 