import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    const currentHistory = [...history];

    if (replace) {
      currentHistory.pop();
    }

    setHistory([...currentHistory, newMode]);
    setMode(newMode);
  }

  function back() {
    const currentHistory = [...history];

    if (history.length > 1) {
      currentHistory.pop();
      setHistory(currentHistory);
      const prevMode = currentHistory[currentHistory.length - 1];
      setMode(prevMode);
    }
  }

  return { mode, transition, back };
}
