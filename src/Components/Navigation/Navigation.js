import React, { useState } from "react";
import classes from "./Navigation.module.css";
import { AiFillPicture, AiOutlinePaperClip } from "react-icons/ai";
const Navigation = (props) => {
  const [hoverState, setHoverState] = useState(false);

  return (
    <div
      className={classes.navBar}
      onMouseLeave={() => {
        setHoverState(false);
      }}
      onMouseEnter={() => {
        setHoverState(true);
      }}
    >
      <div
        className={classes.backgroundDiv}
        onClick={() => {
          props.openPopup();
        }}
      >
        {hoverState ? (
          <h2
            style={{
              cursor: "pointer",
              color: "white",
              fontFamily: "Josefin Sans, sans-serif",
              fontWeight: "100",
            }}
          >
            Background
          </h2>
        ) : (
          <AiFillPicture id={classes.backgroundIcon} />
        )}
      </div>
      <div
        className={classes.shortcutsDiv}
        onClick={() => {
          props.openShortcutsPopup();
        }}
      >
        {hoverState ? (
          <h2
            style={{
              cursor: "pointer",
              color: "white",
              fontFamily: "Josefin Sans, sans-serif",
              fontWeight: "100",
            }}
          >
            Shortcuts
          </h2>
        ) : (
          <AiOutlinePaperClip id={classes.linkIcon} />
        )}
      </div>
    </div>
  );
};

export default Navigation;
