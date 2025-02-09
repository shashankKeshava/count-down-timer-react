import { useState } from "react";
import "./styles.css";

export default function App() {
  const [count, setCounter] = useState(0);
  const [formattedTime, setFormattedTime] = useState(0);
  const [intervalID, setIntervalID] = useState(0);

  function handleSubmit() {
    if (intervalID) {
      clearInterval(intervalID);
    }

    setFormattedTime(parseInt(count, 10));
    const id = setInterval(() => {
      setFormattedTime((prevState) => {
        if (prevState <= 0) {
          clearInterval(id);
          return 0;
        }
        return prevState - 1;
      });
    }, 1000);
    setIntervalID(id);
  }

  function handleReset() {
    clearInterval(intervalID);
    setFormattedTime(0);
  }

  function handlePause() {
    clearInterval(intervalID);
  }

  function handleResume() {
    if (intervalID) {
      clearInterval(intervalID);
    }

    const id = setInterval(() => {
      setFormattedTime((prevState) => {
        if (prevState <= 0) {
          clearInterval(id);
          return 0;
        }
        return prevState - 1;
      });
    }, 1000);
    setIntervalID(id);
  }

  function prettyTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  }

  return (
    <div className="App">
      <h1>Count down timer</h1>
      <input
        type="number"
        placeholder="Enter time"
        onChange={(e) => setCounter(e.target.value)}
      />
      <button type="primary" onClick={handleSubmit}>
        Submit
      </button>
      <div>
        <button type="primary" onClick={handlePause}>
          Pause
        </button>
        <button type="primary" onClick={handleResume}>
          Resume
        </button>
        <button type="primary" onClick={handleReset}>
          Reset
        </button>
      </div>
      <div>{prettyTime(formattedTime)}</div>
    </div>
  );
}
