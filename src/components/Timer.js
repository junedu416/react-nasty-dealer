import React from "react";
import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Timer() {
  const secondsTotal = 20; // set time for player
  const [seconds, setSeconds] = useState(secondsTotal);

  useEffect(() => {
    let playerInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        clearInterval(playerInterval);
      }
    }, 1000);
    return () => {
      clearInterval(playerInterval);
    };
  });

  const percentage = Math.round((seconds / secondsTotal) * 100);
  const style = buildStyles({
    rotation: 0,
    strokeLinecap: "round",
    textSize: "25px",
    pathTransitionDuration: 0.5,
    pathColor: "#fff",
    textColor: "#f88",
    trailColor: "transparent",
    backgroundColor: `${seconds <=6 ? "red":"#3e98c7"}`,
    textColor: "#fff"
  });

  return (
    <div style ={{marginBottom:40}}>
      {seconds !== 0 && 
      (<div style={{ maxWidth: 90 }}>
        <CircularProgressbar styles={style} value={percentage} background backgroundPadding={6} text={seconds <=6 ? "hurry!":null}/>
      </div>)}
    </div>
  );
}

export default Timer;
