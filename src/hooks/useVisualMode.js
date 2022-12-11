import {useState} from 'react';

export default function useVisualMode(initial) {
const [mode, setMode] = useState(initial);
const [history, setHistory] = useState([initial]);

function transition(newMode, replace = false) {
  if (replace) {
    setMode(newMode);
    setHistory((prev) => [...prev]);
  } else {
    setMode(newMode);
    setHistory((prev) => [...prev, newMode])
  }
};
function back() {
  const newHistory = [...history].pop(); 
  setHistory(newHistory);
  if(history.length >= 1) {
    setMode(history[history.length-1]);
  }
};
return {mode, transition, back};
};