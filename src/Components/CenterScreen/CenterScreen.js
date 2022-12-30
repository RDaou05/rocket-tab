import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import classes from "./CenterScreen.module.css";
import Clock from "./Clock";
import PromptForName from "../NamePopup/PromptForName";
import ShortcutDisplay from "../ShortcutDisplay/ShortcutDisplay";

const CenterScreen = (props) => {
  const [promptForNameState, setPromptForNameState] = useState(false);
  const nameGreet = useRef(null);
  const searchBoxRef = useRef(null);
  const nameFromLocal = localStorage.getItem("name");

  const setNewName = (name) => {
    localStorage.setItem("name", name);
  };
  useLayoutEffect(() => {
    if (nameFromLocal == null) {
      setPromptForNameState(true);
    } else {
      nameGreet.current.textContent =
        "Hello " + nameFromLocal + ", what are you looking for?";
    }
  }, []);
  useLayoutEffect(() => {
    if (!promptForNameState) {
      nameGreet.current.textContent = `Hello ${localStorage.getItem(
        "name"
      )}, what are you looking for?`;
    }
  }, [promptForNameState]);
  return (
    <div className={classes.centerComponents}>
      {promptForNameState ? (
        <PromptForName
          setNewName={setNewName}
          close={() => {
            setPromptForNameState(false);
          }}
        />
      ) : (
        <>
          <Clock />
          <h1
            id={classes.helloText}
            ref={nameGreet}
            onClick={() => {
              setPromptForNameState(true);
            }}
          >
            Hello, what are you looking for?
          </h1>
          <input
            type="text"
            id={classes.searchBox}
            ref={searchBoxRef}
            autocomplete="off"
            spellcheck="false"
            autocorrect="off"
            onKeyDown={(evt) => {
              if (evt.key == "Enter") {
                window.location.href =
                  "http://google.com/search?q=" + searchBoxRef.current.value;
              }
            }}
          />
          <ShortcutDisplay
            openShortcutPopup={() => {
              props.openShortcutPopup();
            }}
          />
        </>
      )}
    </div>
  );
};

export default CenterScreen;
