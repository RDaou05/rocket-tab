import React, { useEffect, useRef } from "react";
import classes from "./Clock.module.css";

const Clock = () => {
  const clockRef = useRef(null);

  useEffect(() => {
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

      let res = `${LeadingZero(hours)}:${LeadingZero(minutes)} ${symbol}`;

      if (res.substring(0, 1) == "0") {
        res = res.substring(1);
      }

      clockRef.current.textContent = res;
    }

    GetTimeString();
    setInterval(() => {
      GetTimeString();
    }, 1000);
  }, []);

  return (
    <div style={{ fontFamily: "Josefin Sans, sans-serif" }}>
      <h1 ref={clockRef} id={classes.clock}></h1>
    </div>
  );
};

export default Clock;
