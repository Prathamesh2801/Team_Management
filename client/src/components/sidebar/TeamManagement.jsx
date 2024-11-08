import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { Link } from "react-router-dom";

export const TeamManagement = ({ setTeams }) => {
  const [teams, setLocalTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await api.get("/teams");
        setLocalTeams(response.data);
        setTeams(response.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };
    fetchTeams();
  }, [setTeams]);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 px-2 py-1">
        <span className="text-sm font-medium">Teams</span>
      </div>
      <div className="space-y-1">
        {teams.map((team) => (
          <Link
            key={team._id}
            to={`/teams/${team._id}`}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100"
          >
            {team.name}
          </Link>
        ))}
      </div>
    </div>
  );
}; 