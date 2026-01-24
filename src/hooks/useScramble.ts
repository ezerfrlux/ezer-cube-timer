import { useState, useCallback } from "react";

const faces = ["U", "D", "L", "R", "F", "B"];
const modifiers = ["", "'", "2"];

export const useScramble = () => {
  const [scramble, setScramble] = useState<string>("");

  const generateNewScramble = useCallback(() => {}, []);

  return { scramble };
};
