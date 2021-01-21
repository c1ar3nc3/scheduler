import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function (newMode, replace = false) {
    if (replace) {
      setMode(newMode);
      setHistory([...history.slice(0, -1), newMode])
    } else {
      setMode(newMode);
      const newHistory = [...history, newMode];
      setHistory(newHistory);
    }
  }

  const back = function () {
    if (history.length < 2) {
      return;
    } else {
      setHistory(history.slice(0, -1));
      setMode(history[history.length - 2]);
    }
  }
  return {mode, transition, back}
}