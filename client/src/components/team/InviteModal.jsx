import React, { useState } from "react";
import { Mail, Link2, GithubIcon, X } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../../utils/api";

export const InviteModal = ({ teamId, onClose }) => {
  const [inviteMethod, setInviteMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");
  const [inviteLink, setInviteLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [repoUrl, setRepoUrl] = useState("");

  const handleEmailInvite = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post(`/teams/${teamId}/invite`, { email, role });
      toast.success("Invitation sent successfully!");
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to send invitation");
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
      toast.success("Invite link copied to clipboard!");
    } catch (error) {
      toast.error("Failed to generate invite link");
    } finally {
      setLoading(false);
    }
  };

  const handleGithubConnect = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post(`/teams/${teamId}/github`, { repoUrl });
      toast.success("GitHub repository connected successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to connect GitHub repository");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg dark:bg-neutral-900 dark:ring-1 dark:ring-white/10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Invite Team Members
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-6 flex gap-2">
          {[
            { id: "email", icon: Mail, label: "Email" },
            { id: "link", icon: Link2, label: "Link" },
            { id: "github", icon: GithubIcon, label: "GitHub" },
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setInviteMethod(id)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                inviteMethod === id
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 dark:bg-neutral-800 dark:text-gray-300 dark:hover:bg-neutral-700"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {inviteMethod === "email" && (
          <form onSubmit={handleEmailInvite} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-600 dark:bg-neutral-800 dark:text-white dark:placeholder-gray-400"
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-600 dark:bg-neutral-800 dark:text-white"
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Invitation"}
            </button>
          </form>
        )}

        {inviteMethod === "link" && (
          <div className="space-y-4">
            {inviteLink && (
              <input
                type="text"
                value={inviteLink}
                readOnly
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-900 dark:border-gray-600 dark:bg-neutral-800 dark:text-white"
              />
            )}
            <button
              onClick={generateInviteLink}
              disabled={loading}
              className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate Invite Link"}
            </button>
          </div>
        )}

        {inviteMethod === "github" && (
          <form onSubmit={handleGithubConnect} className="space-y-4">
            <input
              type="text"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="Enter GitHub repository URL"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Connecting..." : "Connect Repository"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default InviteModal;
