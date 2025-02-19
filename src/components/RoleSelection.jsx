import { useState } from "react";
import "./RoleSelection.css";

const roles = [
  {
    id: 1,
    name: "Project Manager",
    stats: {
      charm: 1,
      intimidate: 1,
      insight: 2,
      persuade: 2,
      mediate: 1,
      delegate: 2,
      network: 1,
      troubleshoot: 0,
      adapt: 1,
      research: 0,
      diplomacy: 2,
      powerpoint: 1,
      pivot: 1,
      circleback: 2,
      leveragesynergy: 2,
      delegate: 2,
      streamline: 1,
      outsource: 1,
      optimize: 1,
      micDrop: 0,
      redirect: 1,
    },
},
{
      id: 2,
      name: "IT Specialist",
      stats: {
        charm: 0,
        intimidate: 1,
        insight: 1,
        persuade: 0,
        mediate: 0,
        delegate: 1,
        network: 1,
        troubleshoot: 2,
        adapt: 2,
        research: 2,
        diplomacy: 0,
        powerpoint: 1,
        pivot: 2,
        circleback: 1,
        leveragesynergy: 1,
        streamline: 2,
        outsource: 1,
        optimize: 2,
        micdrop: 0,
        redirect: 1,
    },
},
{
    id: 3,
    name: "Sales Representative",
    stats: {
      charm: 2,
      intimidate: 1,
      insight: 1,
      persuade: 2,
      mediate: 1,
      delegate: 0,
      network: 2,
      troubleshoot: 0,
      adapt: 1,
      research: 1,
      diplomacy: 2,
      powerpoint: 2,
      pivot: 1,
      circleback: 1,
      leveragesynergy: 1,
      streamline: 1,
      outsource: 0,
      optimize: 1,
      micdrop: 2,
      redirect: 2,
    },

  },
  {
    id: 4,
    name: "HR Coordinator",
    stats: {
      charm: 1,
      intimidate: 0,
      insight: 2,
      persuade: 1,
      mediate: 2,
      delegate: 1,
      network: 1,
      troubleshoot: 0,
      adapt: 1,
      research: 1,
      diplomacy: 2,
      powerpoint: 0,
      pivot: 2,
      circleback: 2,
      leveragesynergy: 1,
      streamline: 1,
      outsource: 1,
      optimize: 1,
      micdrop: 0,
      redirect: 2,
    },
  },
  {
    id: 5,
    name: "Marketing Specialist",
    stats: {
      charm: 2,
      intimidate: 0,
      insight: 1,
      persuade: 2,
      mediate: 1,
      delegate: 0,
      network: 2,
      troubleshoot: 1,
      adapt: 2,
      research: 1,
      diplomacy: 1,
      powerpoint: 2,
      pivot: 1,
      circleback: 1,
      leveragesynergy: 2,
      streamline: 1,
      outsource: 1,
      optimize: 1,
      micdrop: 1,
      redirect: 1,
    },
  },
  {
    id: 6,
    name: "Executive Assistant",
    stats: {
      charm: 1,
      intimidate: 0,
      insight: 2,
      persuade: 1,
      mediate: 2,
      delegate: 1,
      network: 1,
      troubleshoot: 1,
      adapt: 2,
      research: 1,
      diplomacy: 2,
      powerpoint: 1,
      pivot: 2,
      circleback: 2,
      leveragesynergy: 1,
      streamline: 1,
      outsource: 1,
      optimize: 1,
      micdrop: 0,
      redirect: 2,
    },
  },

];

const RoleSelection = ({ onSelectRole }) => {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleSelectRole = (role) => {
    setSelectedRole(role);
    onSelectRole(role);
  };

  return (
    <div className="role-selection">
      <h2>Select Your Role</h2>
      {roles.map((role) => (
        <div
          key={role.id}
          className={`role-card ${selectedRole === role ? "selected" : ""}`}
          onClick={() => handleSelectRole(role)}
        >
          <h3>{role.name}</h3>
          <div className="stats-grid">
            {Object.entries(role.stats).map(([stat, value]) => (
              <div key={stat} className="stat-item">
                <span className="stat-name">{stat}:</span>
                <span className="stat-value">{value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoleSelection;