import React, { useRef } from "react";
import classes from "./Clock.module.css";
const Clock = () => {
  const clockRef = useRef(null);

  function LeadingZero(number) {
    return ("0" + number).slice(-2);
  }

  function GetTimeString() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let symbol = "AM";

    if (hours == 0) {
      hours = 12;
    }

    if (hours > 12) {
      hours = hours - 12;
      symbol = "PM";
    }

    clockRef.current.textContent = `${LeadingZero(hours)}:${LeadingZero(
      minutes
    )} ${symbol}`;
  }

  setInterval(() => {
    GetTimeString();
  }, 1000);

  return (
    <div style={{ fontFamily: "Josefin Sans, sans-serif" }}>
      <h1 ref={clockRef} id={classes.clock}></h1>
    </div>
  );
};

export default Clock;
