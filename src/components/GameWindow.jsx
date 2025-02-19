import { useState, useEffect, useRef } from "react";
import { generateResponse } from "../utils/api";
import "./GameWindow.css";

const ASCIIArt = ({ success }) => {
    const happyFace = `
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣤⠶⠶⠶⠶⠶⢦⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣠⡶⠛⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠛⢦⣄⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣰⠞⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠳⣄⠀⠀⠀⠀
⠀⠀⢠⡾⠁⠀⠀⢀⣤⣤⣤⣤⣄⠀⠀⠀⠀⠀⠀⠀⠀⣠⣤⣤⣤⡙⢷⡀⠀⠀
⠀⢠⡟⠀⠀⠀⣰⣿⣿⡇⠀⠀⠙⢷⡀⠀⠀⠀⠀⢠⣾⣿⣿⠀⠀⠹⣮⢿⡀⠀
⠀⣾⠀⠀⠀⢰⡏⠙⠛⠁⠀⠀⠀⠘⡇⠀⠀⠀⠀⣸⠋⠛⠋⠀⠀⠀⢹⠈⣧⠀
⢸⡇⠀⠀⠀⠘⣧⣤⣤⣤⣤⣤⣤⣤⡇⠀⠀⠀⠀⢸⣧⣤⣤⣤⣤⣤⣾⠀⢹⡆
⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇
⢸⡇⠀⠀⠀⠀⣰⣶⣶⣶⣶⣶⣶⣶⣶⣶⣶⣶⣶⣶⣶⣶⣶⣶⣶⡶⠀⠀⣸⠇
⠀⣿⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠁⠀⢀⡟⠀
⠀⠘⣧⠀⠀⠀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⣾⠁⠀
⠀⠀⠘⢷⡀⠀⠀⢻⣿⡻⠋⠁⠀⠀⠀⠉⠻⣿⣿⣿⣿⣿⡿⠃⠀⢠⡾⠁⠀⠀
⠀⠀⠀⠀⠻⣦⡀⠀⠙⠷⣤⣀⠀⠀⠀⠀⠀⠈⣿⣿⡿⠋⠀⣀⡴⠋⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠙⠷⣤⣀⠀⠉⠛⠓⠒⠒⠒⠚⠋⠁⣠⣤⠾⠋⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠙⠛⠶⠶⠶⠶⠶⠶⠛⠋⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀
    `;
  
    const angryFace = `
    ⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣤⣶⠶⠶⣶⣤⣤⡀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢀⣴⠾⠛⠉⠀⢠⣾⣴⡾⠛⠻⣷⣄⠀⠀⠀⠀⠀
⠀⠀⢶⣶⣶⣿⣁⠀⠀⠀⠀⢸⣿⠏⢀⣤⣶⣌⠻⣦⡀⠀⠀⠀
⠀⠀⣴⡟⠁⢉⣙⣿⣦⡀⠀⢸⡏⣴⠟⢡⣶⣿⣧⡹⣷⡀⠀⠀
⠀⣼⠏⢀⣾⠟⠛⠛⠻⣿⡆⠀⠀⢿⣄⠀⠙⠉⠹⣷⡸⣷⠀⠀
⢠⣿⠀⢸⡿⢿⠇⠀⠀⣾⠇⠀⣀⣈⠻⢷⣤⣤⣤⡾⠃⢹⣇⠀
⢸⣿⠀⢸⣧⣀⣀⣠⣾⢋⣴⢿⣿⡛⠻⣶⣤⣉⠁⠀⠀⠀⣿⠀
⠈⣿⠀⠀⠙⠛⠛⠋⠁⣼⣯⣀⣿⠿⠶⠟⠉⠛⢷⣄⠀⠀⣿⡇
⠀⣿⠀⠀⠀⠀⠀⠀⠀⣿⡏⠉⠁⠀⠀⢀⣴⢶⣄⢻⡇⠀⢸⡇
⠀⢻⣇⠀⠀⠀⠀⠀⢠⡿⢀⣀⢠⣾⠷⣾⣧⡶⠿⠟⠁⠀⣾⡇
⠀⠈⣿⣧⡀⠀⠀⣠⣿⣷⠟⢻⣿⣷⡾⠛⠉⠀⠀⠀⠀⢀⣿⠀
⠀⠀⢹⣿⢻⣦⡀⠉⠛⠛⠛⠛⠋⠁⠀⠀⠀⠀⠀⠀⠀⣼⠏⠀
⠀⠀⠀⠛⠀⠈⠻⠷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⠟⠀
    `;
  
    return (
      <pre className="ascii-art">
        {success === null ? happyFace : (success ? happyFace : angryFace)}
      </pre>
    );
  };
  
  const generateRandomDC = (eventType, currentLevel) => {
    const baseDC = eventType === "Conference Call" 
      ? Math.floor(Math.random() * 9) + 6 // 6-14
      : Math.floor(Math.random() * 7) + 10; // 10-16
    
    return baseDC + currentLevel;
  };

  const getSkillLists = () => {
    const conferenceSkills = [
      "charm", "intimidate", "insight", "persuade", 
      "mediate", "delegate", "network", "troubleshoot", 
      "adapt", "research", "diplomacy"
    ];
    
    const confrontationSkills = [
      "powerpoint", "pivot", "circleback", "leveragesynergy", 
      "delegate", "streamline", "outsource", "optimize", 
      "micdrop", "redirect"
    ];
    
    return {
      conference: conferenceSkills,
      confrontation: confrontationSkills,
      all: [...conferenceSkills, ...confrontationSkills]
    };
  };

  const getFallbackOptions = () => {
    const skills = getSkillLists().conference; // Default to conference skills
    return skills.slice(0, 4).map(skill => ({
      raw: `#${skill}: Take action`,
      displayText: `Use ${skill}`,
      skill,
      difficulty: 15 // Default difficulty
    }));
  };
  

const GameWindow = ({ character, setCharacter }) => {
  const [storyLine, setStoryLine] = useState("");
  const [eventType, setEventType] = useState("Conference Call");
  const [eventText, setEventText] = useState("");
  const [responseOptions, setResponseOptions] = useState([]);
  const [level, setLevel] = useState(1);
  const [lastRoll, setLastRoll] = useState(null);
  const [meter, setMeter] = useState(0);
  const [choiceCount, setChoiceCount] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const levelRef = useRef(level);
  const prevChoiceCountRef = useRef(choiceCount);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    levelRef.current = level;
  }, [level]);

  useEffect(() => {
    if (meter >= 5 && eventType !== "Confrontation") {
      setEventType("Confrontation");
    } else if (meter <= 4 && eventType !== "Conference Call") {
      setEventType("Conference Call");
    }
  }, [meter, eventType]);

  useEffect(() => {
    if (choiceCount > 0 && choiceCount % 10 === 0 && prevChoiceCountRef.current !== choiceCount) {
      setLevel((prev) => prev + 1);
      setShowLevelUpModal(true);
      prevChoiceCountRef.current = choiceCount; // Update the ref to the current choiceCount
    }
  }, [choiceCount]);

  const handleLevelUp = (selectedSkills) => {
    setCharacter(prev => ({
      ...prev,
      role: {
        ...prev.role,
        stats: Object.fromEntries(
          Object.entries(prev.role.stats).map(([skill, value]) => [
            skill,
            selectedSkills.includes(skill) ? value + 2 : value
          ])
        )
      }
    }));
    setShowLevelUpModal(false);
  };

  const handleOptionSelect = async (option) => {
    if (isLoading) return;
    // Update story with player choice
    setStoryLine(prev => `${prev}\nPlayer chose: ${option.displayText}`);
    setIsLoading(true);
    try {
      // Extract skill and difficulty
      const parts = option.raw.split("#").map(s => s.trim());
      if (parts.length < 2) {
        throw new Error("Invalid option format");
      }
    
      // Use the displayed DC
      const difficulty = option.difficulty;
      const skillLevel = character.role.stats[option.skill] || 0;
        
      // Calculate success
      const roll = Math.floor(Math.random() * 20) + 1;
      const total = roll + skillLevel;
      const success = total >= difficulty;
      
      console.log(`Roll: ${roll} + ${skillLevel} = ${total} vs DC ${difficulty}`);

    
    setChoiceCount((prev) => {
        const newCount = prev + 1;
        console.log(`Choices = ${newCount}`); // Log the updated value
        return newCount;
      });
    console.log (`Choices = ${choiceCount}`);

    setMeter(prev => {
        let newMeter = prev;
        
        if (roll === 1) {
          newMeter = Math.min(10, newMeter + 5);
          console.log("Critical failure - meter +5");
        } else if (roll === 20) {
          newMeter = Math.max(0, newMeter - 5);
          console.log("Critical success - meter -5");
        }
        
        if (success) {
          newMeter = Math.max(0, newMeter - 1);
          console.log("Success - meter -1");
        } else {
          newMeter = Math.min(10, newMeter + 1);
          console.log("Failure - meter +1");
        }
      
        console.log("New Meter Value:", newMeter);
        return newMeter;
      });
      
    // Store the roll result
    setLastRoll({
      text: `${option.displayText}`,
      roll,
      total,
      difficulty,
      success,
    });
    

    console.log(lastRoll);

    // Generate new response
    await handleGenerateResponse();
} catch (error) {
    console.error("Error handling option:", error);
    setEventText("Something went wrong with that choice. Please try again.");
} finally {
    setIsLoading(false);
  }
};

const parseResponse = (response) => {
    const normalized = response.replace(/\s+/g, " ").trim();
    
    // Initialize defaults
    let eventType = "Conference Call";
    let eventText = "The meeting takes an unexpected turn...";
    let optionsString = [
      "#charm: Smooth things over",
      "#insight: Look for underlying issues",
      "#mediate: Propose a compromise",
      "#adapt: Pivot to new approach"
    ].join(" | ");
    let summary = "The story continues...";
  
    // Try to parse the response
    const parts = normalized.split("||").map(p => p.trim().replace(/undefined/g, "")); // Add cleanup here
    
    if (parts.length >= 4) {
      eventType = parts[0];
      eventText = parts[1];
      optionsString = parts[2];
      summary = parts[3];
    } else {
      // Fallback parsing
      const optionRegex = /#([a-z]+):\s*([^#]+)/gi;
      const matches = [...normalized.matchAll(optionRegex)];
      
      if (matches.length >= 4) {
        optionsString = matches.map(m => 
          `#${m[1]}: ${m[2].trim()}`
        ).join(" | ");
        
        eventText = normalized.replace(optionRegex, "").replace(/\|\|/g, "").trim();
        eventType = normalized.includes("Confrontation") ? "Confrontation" : "Conference Call";
      }
    }
  
    // Clean all text fields
    eventText = eventText.replace(/undefined/g, "").trim();
    summary = summary.replace(/undefined/g, "").trim();
    console.log("Parsed Event Text:", eventText)
    return {
      eventType,
      eventText,
      optionsString,
      summary
    };
  };


  const getPrompt = () => {

    return `
    STRICT FORMATTING RULES:
    Conference Call Skills: ${getSkillLists().conference.join(", ")}
    Confrontation Actions: ${getSkillLists().confrontation.join(", ")}

    Current Encounter Type: ${eventType}
    MUST USE ONLY ${eventType === "Conference Call" 
      ? "CONFERENCE SKILLS" 
      : "CONFRONTATION ACTIONS"}

    EVENT_TYPE || EVENT_TEXT || OPTIONS || SUMMARY

    1. EVENT_TYPE: "Conference Call" or "Confrontation" ONLY
    2. EVENT_TEXT: 2-3 sentences describing the situation. NEVER INCLUDE # HERE
    3. OPTIONS: Exactly 4 options separated by |, each with:
       #SKILL: Description
    4. SUMMARY: Story continuation for next prompt

    Current State:
    - Player: ${character.charName} (Level ${level})
    - Role: ${character.role.name}
    - Meter: ${meter}/10 (${meter >= 5 ? 'Confrontation' : 'Conference Call'})
    - Last Roll: ${lastRoll ? `${lastRoll.roll} (${lastRoll.success ? 'Success' : 'Fail'})` : 'None'}
    - Player's Latest Response: ${lastRoll ? `${lastRoll.text}` : 'N/A'}

    RULES: 
    - Conference skills: ${Object.keys(character.role.stats).join(', ')}
    - ${eventType === 'Confrontation' ? 'USE CONFRONTATION SKILLS' : 'USE CONFERENCE SKILLS'}
    - NEVER USE MARKDOWN. ONLY PLAIN TEXT WITH || AND | DELIMITERS
    - The tension of the call goes from 0 t0 10 based on the Meter, currently it is at ${meter},
    if it is lower than 3 the call should be lighthearted and fun, if it is higher than 5 there is a conflict.
    - If the Last Roll was a failure, the event text should show the player fumbling.

    EXAMPLE FORMAT:
    ${eventType} || The client questions... || 
    #${getSkillLists()[eventType === "Conference Call" ? "conference" : "confrontation"][0]}: Response text |
    #${getSkillLists()[eventType === "Conference Call" ? "conference" : "confrontation"][1]}: Response text || 
    Summary: Client expressed concerns...
 `};

 const handleGenerateResponse = async () => {
    try {
      const response = await generateResponse(getPrompt());
      console.log("API Response:", response);
  
      // Initialize all variables
      let newEventType = eventType;
      let newEventText = "The conversation continues...";
      let optionsString = "";
      let newSummary = storyLine;
  
      // Parse the response
      const parsed = parseResponse(response);
      
      // Update values from parsed response
      newEventType = parsed.eventType || eventType;
      newEventText = parsed.eventText || newEventText;
      optionsString = parsed.optionsString || optionsString;
      newSummary = parsed.summary || newSummary;
  
      // Set state with parsed values
      setEventType(newEventType);
      setEventText(newEventText);
      setStoryLine(newSummary);
  
      // Parse options
      const options = optionsString.split("|").map(opt => {
        const clean = opt.trim();
        const skillPart = clean.startsWith("#") ? clean.slice(1) : clean;
        const [skillKey, ...descParts] = skillPart.split(":");
        const skill = skillKey.trim().toLowerCase();
        
        // Validate skill
        const validSkills = getSkillLists()[newEventType === "Conference Call" 
          ? "conference" 
          : "confrontation"];
        
        const validSkill = validSkills.includes(skill) 
          ? skill 
          : validSkills[0];
      
        // Generate random DC for this option
        const dc = generateRandomDC(newEventType, level); // Pass current level
        console.log("Processed Event Text:", newEventText);
        return {
          raw: `#${validSkill}: ${descParts.join(":").trim()} #difficulty: ${dc}`,
          displayText: descParts.join(":").trim() || "Take action",
          skill: validSkill,
          difficulty: dc,
        };
      });
  
      setResponseOptions(options.slice(0, 4)); // Ensure exactly 4 options
      startTypewriterEffect(newEventText);
      
    } catch (error) {
      console.error("API Error:", error);
      setEventText("Connection issue... Pretend you heard static on the line!");
      setResponseOptions(getFallbackOptions());
    }
  };
    
  const startTypewriterEffect = (text) => {
    setDisplayedText(""); 
    setShowOptions(false);
    
    // Ensure text starts clean
    const cleanText = (text || "")
      .replace(/undefined/g, "")
      .trim()
      .replace(/^ /, "") // Remove leading space
      .replace(/\s+/g, " ");
  
    let currentIndex = 0;
    console.log("Clean Text for Typewriter:", cleanText);
    const interval = setInterval(() => {
      if (currentIndex <= cleanText.length) { // Changed to <=
        setDisplayedText(prev => cleanText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        setShowOptions(true);
      }
    }, 30);
  };

  useEffect(() => {
    handleGenerateResponse();
  }, []);

  const LevelUpModal = ({ skills, onSelect, onConfirm }) => {
    const [selectedSkills, setSelectedSkills] = useState([]);
  
    const handleSelect = (skill) => {
      setSelectedSkills(prev => {
        if (prev.includes(skill)) {
          return prev.filter(s => s !== skill);
        } else if (prev.length < 10) {
          return [...prev, skill];
        }
        return prev;
      });
    };
  
    return (
      <div className="level-up-modal">
        <h2>Level Up! Choose 10 skills to improve</h2>
        <div className="skill-grid">
          {Object.entries(skills).map(([skill, value]) => (
            <div
              key={skill}
              className={`skill-card ${selectedSkills.includes(skill) ? 'selected' : ''}`}
              onClick={() => handleSelect(skill)}
            >
              <div className="skill-name">{skill}</div>
              <div className="skill-value">{value}</div>
              {selectedSkills.includes(skill) && (
                <div className="skill-bonus">+2</div>
              )}
            </div>
          ))}
        </div>
        <button 
          onClick={() => {
            onSelect(selectedSkills);
            onConfirm();
          }}
          disabled={selectedSkills.length !== 10}
        >
          Confirm Selection
        </button>
      </div>
    );
  };

  return (
    <div className="game-window">
      <div className="ascii-container">
      <ASCIIArt success={lastRoll?.success} />
      <div className="meter-display">Tension Level: {meter}/10</div>
      
      {showLevelUpModal && <div className="modal-backdrop"><LevelUpModal
        skills={character.role.stats}
        onSelect={handleLevelUp}
        onConfirm={() => setShowLevelUpModal(false)}
      /></div>}
    </div>
    <div className="typewriter-container">
      <div className="event-text">
        {displayedText}
        {!showOptions && <span className="cursor">|</span>}
      </div>
    </div>
      {lastRoll && (
        <div className={`roll-details ${lastRoll.success ? "success" : "fail"}`}>
          <div>Action: {lastRoll.text}</div>
          <div>Roll: {lastRoll.roll} + {lastRoll.total - lastRoll.roll} = {lastRoll.total}</div>
          <div>Difficulty: {lastRoll.difficulty}</div>
          <div>Result: {lastRoll.success ? "SUCCESS" : "FAILURE"}</div>
        </div>
      )}

    <div className="response-options">
      {responseOptions.map((option, index) => (
    <div
      key={index}
      className={`response-card ${isLoading ? 'disabled' : ''}`}
      onClick={() => handleOptionSelect(option)}
    >
      <div className="skill-type">{option.skill}</div>
      <div className="option-text">{option.displayText}</div>
      <div className="difficulty">
        DC: {option.difficulty} (Base {option.difficulty - level} + Level {level})
      </div>
    </div>
  ))}
</div>
      {/* Character Sheet */}
      <div className="character-sheet">
        <h2>Character Sheet</h2>
        <div className="stats-grid">
          {Object.entries(character.role.stats).map(([stat, value]) => (
            <div key={stat} className="stat-item">
              <span className="stat-name">{stat}:</span>
              <span className="stat-value">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameWindow;