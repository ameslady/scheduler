import { useState } from 'react';

export default function useVisualMode(initial) {
  const [ mode, setMode ] = useState(initial);
  const [ history, setHistory ] = useState([initial]); 
  
  function transition(newMode, replace = false) {
    const currentHistory = [...history];

    if (replace) {
      currentHistory.pop();
    }
   
    setHistory([...currentHistory, newMode])
    setMode(newMode);
  };
  
  function back() {
    const newHistory = [...history];
    
    if (history.length > 1) {
      newHistory.pop();
      setHistory(newHistory);
      const prevMode = newHistory[newHistory.length - 1];
      setMode(prevMode);
    }
  };

  return { mode, transition, back };
};