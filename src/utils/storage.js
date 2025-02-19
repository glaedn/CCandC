export const saveCharacter = (character) => {
    localStorage.setItem("character", JSON.stringify(character));
  };
  
  export const loadCharacter = () => {
    return JSON.parse(localStorage.getItem("character"));
  };