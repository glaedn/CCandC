import { useState } from "react";
import CharacterCreation from "./components/CharacterCreation";
import GameWindow from "./components/GameWindow";
import "./styles.css";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [character, setCharacter] = useState(null);

  const handleCharacterCreation = (characterData) => {
    setCharacter(characterData);
    setGameStarted(true);
  };

  return (
    <div className="app">
      {!gameStarted ? (
        <CharacterCreation onCreateCharacter={handleCharacterCreation} />
      ) : (
        <GameWindow character={character} setCharacter={setCharacter} />
      )}
    </div>
  );
}

export default App;