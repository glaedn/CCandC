import { useState } from "react";
import RoleSelection from "./RoleSelection";
import { saveCharacter } from "../utils/storage";
import "./CharacterCreation.css";

const CharacterCreation = ({ onCreateCharacter }) => {
  const [charName, setName] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState(null);

  const handleSubmit = () => {
    const characterData = { charName, gender, role, level: 1 };
    saveCharacter(characterData);
    onCreateCharacter(characterData);
  };

  return (
    <div className="character-creation">
      <h1>Conference Calls and Confrontations</h1>
      <input
        type="text"
        placeholder="Your Name"
        value={charName}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Your Gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      />
      <RoleSelection onSelectRole={setRole} />
      <button onClick={handleSubmit} disabled={!charName || !gender || !role}>
        Start Game
      </button>
    </div>
  );
};

export default CharacterCreation;