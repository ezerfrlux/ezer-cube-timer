import { useState, useCallback } from "react";

const faces = ["U", "D", "L", "R", "F", "B"];
const modifiers = ["", "'", "2"];

export const useScramble = () => {
  const [scramble, setScramble] = useState<string>("");

  const generateNewScramble = useCallback(() => {
    const moveCount = Math.floor(Math.random() * (25 - 21 + 1)) + 21;
    const newScramble: string[] = [];

    let lastFace = "";

    for (let i = 0; i < moveCount; i++) {
      let randomFace: string;
      do {
        randomFace = faces[Math.floor(Math.random() * faces.length)];
      } while (randomFace === lastFace);

      const randomModifier =
        modifiers[Math.floor(Math.random() * modifiers.length)];
      newScramble.push(`${randomFace}${randomModifier}`);
      lastFace = randomFace;
    }
    const scrambleString = newScramble.join(" ");
    setScramble(scrambleString);
    return scrambleString;
  }, []);

  return { scramble, generateNewScramble };
};
