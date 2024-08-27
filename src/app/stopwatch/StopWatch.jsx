import { useState, useEffect, useRef } from "react";

const Timer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const start = () => {
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const pause = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
  };

  const reset = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    setTime(0);
  };

  const resume = () => {
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  return (
    <div>
      <h1>Stopwatch</h1>
      <p>{time}s</p>
      {!isRunning && time === 0 && <button onClick={start}>Start</button>}
      {isRunning && <button onClick={pause}>Pause</button>}
      {!isRunning && time > 0 && (
        <>
          <button onClick={resume}>Resume</button>
          <button onClick={reset}>Reset</button>
        </>
      )}
    </div>
  );
};

export default Timer;
