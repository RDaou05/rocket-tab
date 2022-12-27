import React, { useEffect, useRef, useState } from "react";
import classes from "./PromptForName.module.css";

const PromptForName = (props) => {
  const nameRef = useRef(null);
  const [nameSetState, setNameSetState] = useState();
  useEffect(() => {
    if (localStorage.getItem("name") == null) {
      setNameSetState(false);
    } else {
      setNameSetState(true);
    }
  }, []);

  return (
    <div
      className={classes.namePopup}
      style={{ padding: nameSetState ? "1rem 1rem 3rem 1rem" : "3em" }}
    >
      {nameSetState ? (
        <button
          id={classes.closeName}
          onClick={() => {
            props.close();
          }}
        >
          &#x2715;
        </button>
      ) : null}

      <div
        className={classes.nameContainer}
        style={{ padding: nameSetState ? "1rem 1rem 3rem 1rem" : "3rem" }}
      >
        <h1 className={classes.nameHeader}>What's your name?</h1>
        <input
          type="text"
          className={classes.nameInput}
          ref={nameRef}
          onKeyDown={(evt) => {
            if (evt.key == "Enter") {
              if (!nameRef.current.value.trim() == "") {
                props.setNewName(nameRef.current.value);
                props.close();
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default PromptForName;
