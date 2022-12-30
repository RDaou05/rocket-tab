import React, { useState } from "react";
import ShortcutBubble from "./ShortcutBubble";
import classes from "./ShortcutDisplay.module.css";
import { AiOutlinePlus } from "react-icons/ai";
const ShortcutDisplay = (props) => {
  const AddShortcutBubble = () => {
    return (
      <div
        className={classes.addShortcutBubble}
        onClick={() => {
          props.openShortcutPopup();
        }}
      >
        <div className={classes.plusContainer}>
          <AiOutlinePlus id={classes.plus} />
        </div>
      </div>
    );
  };
  return (
    <div className={classes.bubbleContainer}>
      {JSON.parse(localStorage.getItem("shortcuts")) != null ? (
        <>
          {JSON.parse(localStorage.getItem("shortcuts")).length > 0 ? (
            JSON.parse(localStorage.getItem("shortcuts"))
              .slice(0)
              .reverse()
              .map((shortcut) => (
                <ShortcutBubble key={shortcut.id} shortcut={shortcut} />
              ))
          ) : (
            <AddShortcutBubble />
          )}
        </>
      ) : (
        <AddShortcutBubble />
      )}
    </div>
  );
};

export default ShortcutDisplay;
