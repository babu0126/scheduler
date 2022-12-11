import {useState} from 'react';

export default function useVisualMode(initial) {
const [mode, setMode] = useState(initial);
const [history, setHistory] = useState([initial]);

function transition(newMode, replace = false) {
  setMode(newMode);
  replace ? setHistory((prev) => [...prev]) : setHistory((prev) => [...prev, newMode]);
};
function back() {
  const newHistory = [...history];
  newHistory.pop();
  setHistory(newHistory);
  if(history.length >= 1) {
    setMode(newHistory[newHistory.length-1]);
  }
};
return {mode, transition, back};
};