import React, { useLayoutEffect, useRef, useState } from "react";
import classes from "./AddShortcuts.module.css";
import CurrentShortcut from "./CurrentShortcut";
import Shortcut from "./Shortcut";

const AddShortcuts = (props) => {
  const [shortcutsListState, setShortcutsListState] = useState([]);
  const [shortcutInputState, setShortcutInputState] = useState(false);
  const [newShortcutObjState, setNewShortcutObjState] = useState([]);
  const linksContainerRef = useRef(null);
  const nameInputRef = useRef(null);
  const linkInputRef = useRef(null);
  useLayoutEffect(() => {
    const localGet = JSON.parse(localStorage.getItem("shortcuts"));
    if (localGet != null && localGet != []) {
      setShortcutsListState(localGet);
    }
  }, []);

  const generate20DigitNumber = () => {
    // Generate a random number between 0 and 1
    let randomNumber = Math.random();
    // Multiply the random number by 10^20 to get a 20-digit number
    randomNumber = randomNumber * Math.pow(10, 20);
    // Convert the number to a string and log it
    return randomNumber.toString();
  };

  const addShortcut = (name, link) => {
    const currentLocal = JSON.parse(localStorage.getItem("shortcuts"));
    const generatedID = generate20DigitNumber();
    if (currentLocal != null && currentLocal != []) {
      // If there is already a main array with a shortcut in it, then it will just make a new copy of it with the array + the new shortcut
      let newLocal = currentLocal;
      newLocal.push({ name: name, link: link, id: generatedID });
      localStorage.setItem("shortcuts", JSON.stringify(newLocal));

      // Adding new shortcut to the list of shortcuts that were added in this current session
      let newShortcutListCopy = newShortcutObjState.slice(0);
      newShortcutListCopy.push({
        name: name,
        link: link,
        id: generatedID,
      });
      newShortcutListCopy.reverse(); // Reversing because we want the brand new shortcuts to always be at the top
      setNewShortcutObjState(newShortcutListCopy);
    } else {
      // If there is no current shortcuts added, it will make the main array, and add this shortcut to it
      localStorage.setItem(
        "shortcuts",
        JSON.stringify([{ name: name, link: link, id: generatedID }])
      );
      setNewShortcutObjState([{ name: name, link: link, id: generatedID }]);
    }
    return { name: name, link: link, id: generatedID };
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
              if (shortcutsListState.length + newShortcutObjState.length < 8) {
                setShortcutInputState(true);
              } else {
                alert("Cant have more than 8 shortcuts");
              }
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
        {shortcutInputState || props.openAddShortcutsPopupWithAddModeOnState ? (
          <div className={classes.inputContainer}>
            <input
              type="text"
              className={classes.addShortcutInput}
              id={classes.addName}
              autocomplete="off"
              spellcheck="false"
              autocorrect="off"
              placeholder="Name"
              ref={nameInputRef}
              onKeyDown={(evt) => {
                // When enter is pressed in either input field, it makes sure that none of the fields are blank, then it will add the shortcut
                if (evt.key == "Enter") {
                  const nameVal = nameInputRef.current.value;
                  const linkVal = linkInputRef.current.value;
                  if (nameVal.trim() != "" && linkVal.trim() != "") {
                    const shortcutObject = addShortcut(nameVal, linkVal);
                    setShortcutInputState(false);
                    props.setOpenAddShortcutsPopupWithAddModeOnState(false); // Check the top of Background.js for reasoning
                  }
                }
              }}
            />
            <input
              type="text"
              className={classes.addShortcutInput}
              ref={linkInputRef}
              id={classes.addLink}
              autocomplete="off"
              spellcheck="false"
              autocorrect="off"
              placeholder="URL"
              onKeyDown={(evt) => {
                // When enter is pressed in either input field, it makes sure that none of the fields are blank, then it will add the shortcut
                if (evt.key == "Enter") {
                  const nameVal = nameInputRef.current.value;
                  const linkVal = linkInputRef.current.value;
                  if (nameVal.trim() != "" && linkVal.trim() != "") {
                    const shortcutObject = addShortcut(nameVal, linkVal);
                    setShortcutInputState(false);
                    props.setOpenAddShortcutsPopupWithAddModeOnState(false); // Check the top of Background.js for reasoning
                  }
                }
              }}
            />
          </div>
        ) : null}
        <div className={classes.shortcutsContainer}>
          <div
            className={classes.linksContainer}
            ref={linksContainerRef}
            style={{
              height:
                shortcutInputState ||
                props.openAddShortcutsPopupWithAddModeOnState
                  ? "max(15vw)"
                  : "max(1000vw)",
            }}
          >
            <CurrentShortcut
              newShortcutsObj={newShortcutObjState}
              newShortcutObjState={newShortcutObjState}
              setNewShortcutObjState={setNewShortcutObjState}
            />
            {/* This component will render a shortcut tag whenever a shortcut is added in
            this current session. These are the ones that are rendered after the code has already rendered the ones from local storage*/}

            {shortcutsListState != []
              ? shortcutsListState
                  .slice(0)
                  .reverse()
                  .map((shortcut) => {
                    return (
                      <Shortcut
                        key={shortcut.id}
                        shortcut={shortcut}
                        current={false}
                        setShortcutsListState={setShortcutsListState}
                        shortcutsListState={shortcutsListState}
                      />
                      // The 'current' prop is if this shortcut was added during this session
                    );
                  })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddShortcuts;
