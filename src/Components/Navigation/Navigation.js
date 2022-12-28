import React, { useState } from "react";
import classes from "./Navigation.module.css";
import { AiFillPicture, AiOutlinePaperClip } from "react-icons/ai";
import { FaRocket } from "react-icons/fa";
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
      <ul
        style={{
          padding: "0",
          listStyle: "none",
          marginBottom: "0",
        }}
        id={classes.rocketUI}
      >
        <li>
          <FaRocket id={classes.rocket} />
        </li>
      </ul>
      <ul
        style={{
          padding: "0",
          listStyle: "none",
          lineHeight: "4rem",
          marginTop: "0",
        }}
      >
        <li>
          <div
            className={classes.backgroundDiv}
            onClick={() => {
              props.openPopup();
            }}
          >
            {hoverState ? (
              <a
                href="#"
                id={classes.backgroundNav}
                style={{
                  margin: "0",
                  textDecoration: "none",
                  fontSize: "1.5rem",
                  float: "left",
                }}
              >
                <AiFillPicture />
                <h2
                  style={{
                    fontSize: "1em",
                    fontWeight: "100",
                    margin: "0",
                    marginLeft: "0.5em",
                  }}
                >
                  Background
                </h2>
              </a>
            ) : (
              <AiFillPicture
                id={classes.backgroundIcon}
                style={{ fontSize: "1.5rem" }}
              />
            )}
          </div>
        </li>
        <li>
          <div
            className={classes.shortcutsDiv}
            onClick={() => {
              props.openShortcutsPopup();
            }}
          >
            {hoverState ? (
              <a
                href="#"
                id={classes.linkNav}
                style={{
                  margin: "0",
                  textDecoration: "none",
                  fontSize: "1.5rem",
                  float: "left",
                }}
              >
                <AiOutlinePaperClip style={{ fontSize: "1.5rem" }} />{" "}
                <h2
                  style={{
                    fontSize: "1em",
                    fontWeight: "100",
                    margin: "0",
                    marginLeft: "0.5em",
                  }}
                >
                  Shortcuts
                </h2>
              </a>
            ) : (
              <AiOutlinePaperClip id={classes.linkIcon} />
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
