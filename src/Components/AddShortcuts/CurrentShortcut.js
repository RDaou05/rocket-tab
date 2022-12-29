import React from "react";
import Shortcut from "./Shortcut";

const CurrentShortcut = (props) => {
  console.log("BUT: ", props.newShortcutsObj);
  const generate20DigitNumber = () => {
    // Generate a random number between 0 and 1
    let randomNumber = Math.random();
    // Multiply the random number by 10^20 to get a 20-digit number
    randomNumber = randomNumber * Math.pow(10, 20);
    // Convert the number to a string and log it
    return randomNumber.toString();
  };
  // Generate a random number between 0 and 1
  let randomNumber = Math.random();
  // Multiply the random number by 10^20 to get a 20-digit number
  randomNumber = randomNumber * Math.pow(10, 20);
  // Convert the number to a string and log it
  console.log(randomNumber.toString());

  return (
    <div>
      {props.newShortcutsObj.map((shortcut) => (
        <Shortcut key={generate20DigitNumber()} shortcut={shortcut} />
      ))}
    </div>
  );
};

export default CurrentShortcut;
