import React, { useLayoutEffect, useRef, useState } from "react";
import classes from "./AddShortcuts.module.css";
import Shortcut from "./Shortcut";

const AddShortcuts = (props) => {
  const [shortcutsListState, setShortcutsListState] = useState([]);
  const [shortcutInputState, setShortcutInputState] = useState(false);
  const nameInputRef = useRef(null);
  const linkInputRef = useRef(null);
  useLayoutEffect(() => {
    const localGet = JSON.parse(localStorage.getItem("shortcuts"));
    console.log("lcget: ", localGet);
    if (localGet != null && localGet != []) {
      setShortcutsListState(localGet);
    }
  }, []);

  const addShortcut = (name, link) => {
    const currentLocal = JSON.parse(localStorage.getItem("shortcuts"));
    const shortLink = "testshortlink.com";
    if (currentLocal != null && currentLocal != []) {
      // If there is already a main array with a shortcut in it, then it will just make a new copy of it with the array + the new shortcut
      let newLocal = currentLocal;
      console.log("newl: ", newLocal);
      newLocal.push({ name: name, link: link });
      localStorage.setItem("shortcuts", JSON.stringify(newLocal));
    } else {
      // If there is no current shortcuts added, it will make the main array, and add this shortcut to it
      localStorage.setItem(
        "shortcuts",
        JSON.stringify([{ name: name, link: link }])
      );
    }
  };
  return (
    <div
      className={classes.shortcutsPopup}
      style={{ padding: "3rem 1rem 3rem 1rem" }}
    >
      <div
        className={classes.shortcutsContainer}
        style={{ padding: "1rem 1rem 3rem 1rem" }}
      >
        <div className={classes.addShortcutsHeader} style={{ width: "100%" }}>
          <button
            id={classes.addShortcutsPlus}
            onClick={() => {
              setShortcutInputState(true);
            }}
          >
            &#x002B;
          </button>
          <h1 className={classes.shortcutsHeader}>Add Shortcuts</h1>
          <button
            id={classes.closeShortcuts}
            onClick={() => {
              props.hidePopup();
            }}
          >
            &#x2715;
          </button>
        </div>
        {shortcutInputState ? (
          <div className={classes.inputContainer}>
            <input
              type="text"
              className={classes.addShortcutInput}
              id={classes.addName}
              ref={nameInputRef}
              onKeyDown={(evt) => {
                // When enter is pressed in either input field, it makes sure that none of the fields are blank, then it will add the shortcut
                if (evt.key == "Enter") {
                  const nameVal = nameInputRef.current.value;
                  const linkVal = linkInputRef.current.value;
                  if (nameVal.trim() != "" && linkVal.trim() != "") {
                    addShortcut(nameVal, linkVal);
                  }
                }
              }}
            />
            <input
              type="text"
              className={classes.addShortcutInput}
              ref={linkInputRef}
              id={classes.addLink}
              onKeyDown={(evt) => {
                // When enter is pressed in either input field, it makes sure that none of the fields are blank, then it will add the shortcut
                if (evt.key == "Enter") {
                  const nameVal = nameInputRef.current.value;
                  const linkVal = linkInputRef.current.value;
                  if (nameVal.trim() != "" && linkVal.trim() != "") {
                    addShortcut(nameVal, linkVal);
                  }
                }
              }}
            />
          </div>
        ) : null}
        <div className={classes.shortcutsContainer}>
          <div className={classes.linksContainer}>
            {console.log(shortcutsListState)}
            {shortcutsListState != []
              ? shortcutsListState.map((shortcut, index) => {
                  {
                    console.log(shortcut, index);
                  }
                  return <Shortcut key={index} shortcut={shortcut} />;
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddShortcuts;
