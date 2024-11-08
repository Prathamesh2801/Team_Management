import { useState } from "react";
import { TeamManagement } from "../components/sidebar/TeamManagement";
import { TeamProjects } from "../components/dashboard/TeamProjects";

export const YourParentComponent = () => {
  const [teams, setTeams] = useState([]);

  return (
    <div>
      <TeamManagement setTeams={setTeams} />
      <TeamProjects setTeams={setTeams} />
    </div>
  );
}; 