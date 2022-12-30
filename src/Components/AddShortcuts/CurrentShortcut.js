import React from "react";
import Shortcut from "./Shortcut";

const CurrentShortcut = (props) => {
  // Generate a random number between 0 and 1
  let randomNumber = Math.random();
  // Multiply the random number by 10^20 to get a 20-digit number
  randomNumber = randomNumber * Math.pow(10, 20);
  // Convert the number to a string and log it

  return props.newShortcutsObj.map((shortcut, index) => (
    <Shortcut
      key={shortcut.id}
      index={index}
      newShortcutObjState={props.newShortcutObjState}
      setNewShortcutObjState={props.setNewShortcutObjState}
      shortcut={shortcut}
      current={true}
      setEditModeState={props.setEditModeState}
    />
    // The 'current' prop is if this shortcut was added during this session
  ));
};

export default CurrentShortcut;
