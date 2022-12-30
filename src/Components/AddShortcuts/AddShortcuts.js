import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import classes from "./AddShortcuts.module.css";
import CurrentShortcut from "./CurrentShortcut";
import Shortcut from "./Shortcut";

const AddShortcuts = (props) => {
  const [shortcutsListState, setShortcutsListState] = useState([]);
  const [shortcutInputState, setShortcutInputState] = useState(false);
  const [newShortcutObjState, setNewShortcutObjState] = useState([]);
  const [editModeState, setEditModeState] = useState([false, {}]); // First element in the list is wether or not edit mode is on
  // The second element is the object of the shortcut that is being edited
  // There will also be a third one that will be added by Shortcut.js when the edit icon is clicked...
  // It will specify if the shortcut, that is being edited, was created in this current session or not (boolean value)

  const linksContainerRef = useRef(null);
  const nameInputRef = useRef(null);
  const linkInputRef = useRef(null);
  const [nameInputState, setNameInputState] = useState(null);
  const [linkInputState, setLinkInputState] = useState(null);
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

  const editShortcut = (newName, newLink) => {
    const idOfShortcutToEdit = editModeState[1].id;
    const createdInCurrentSession = editModeState[2]; // See line 13 for comment
    if (createdInCurrentSession) {
      // The 'current' prop is true if this shortcut was added during this session
      newShortcutObjState.slice(0).forEach((element, index) => {
        // NOTE: Doing .slice(0) is just a way to create a copy of an array
        if (element.id == idOfShortcutToEdit) {
          let arrayCopy = newShortcutObjState.slice(0); // Making copy of the array that stores shortcuts added in this session
          arrayCopy.splice(index, 1, {
            name: newName,
            link: newLink,
            id: idOfShortcutToEdit,
          }); // Updating the shortcut in the array copy
          setNewShortcutObjState(arrayCopy);
          // Updating (deleting the shortcut) the state the stores all the shortcuts that were added in the current session
        }
      });
    } else if (!createdInCurrentSession) {
      // The user is trying to update a shortcut that was added in a different session
      shortcutsListState.slice(0).forEach((element, index) => {
        // NOTE: Doing .slice(0) is just a way to create a copy of an array
        if (element.id == idOfShortcutToEdit) {
          let arrayCopy = shortcutsListState.slice(0); // Making copy of the array that stores shortcuts added a different session
          arrayCopy.splice(index, 1, {
            name: newName,
            link: newLink,
            id: idOfShortcutToEdit,
          }); // Updating the shortcut in the array copy
          setShortcutsListState(arrayCopy);
          // Updating (deleting the shortcut) the state the stores all the shortcuts that were added in a different session
        }
      });
    }

    // Updating the shortcut in local storage
    let currentLocalStorageSnap = JSON.parse(localStorage.getItem("shortcuts"));
    currentLocalStorageSnap.forEach((element, index) => {
      // Trying to find the id that matches with the ID that needs to be deleted
      if (element.id == idOfShortcutToEdit) {
        // Shortcut to be deleted has been found in localstorage array
        currentLocalStorageSnap.splice(index, 1, {
          name: newName,
          link: newLink,
          id: idOfShortcutToEdit,
        }); // Removes the shortcut from the array and updates original array
      }
    });
    localStorage.setItem(
      // Updating local storage with new version of array without the deleted shortcut
      "shortcuts",
      JSON.stringify(currentLocalStorageSnap)
    );
  };

  useEffect(() => {
    // When edit mode is turned on, we want to automatically set the value of the input fields to whatever the current stored values are
    // We also want to delete them when edit mode it turned off
    if (editModeState[0]) {
      setNameInputState(editModeState[1].name);
      setLinkInputState(editModeState[1].link);
    } else if (editModeState[0]) {
      setNameInputState("");
      setLinkInputState("");
    }
  }, [editModeState]);
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
        {shortcutInputState ||
        props.openAddShortcutsPopupWithAddModeOnState ||
        editModeState[0] ? (
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
              value={nameInputState}
              onChange={(evt) => {
                setNameInputState(evt.target.value);
              }}
              onKeyDown={(evt) => {
                // When enter is pressed in either input field, it makes sure that none of the fields are blank, then it will add the shortcut
                if (evt.key == "Enter") {
                  const nameVal = nameInputState;
                  const linkVal = linkInputState;
                  if (nameVal.trim() != "" && linkVal.trim() != "") {
                    if (!editModeState[0]) {
                      addShortcut(nameVal, linkVal);
                    } else if (editModeState[0]) {
                      editShortcut(nameVal, linkVal);
                      setEditModeState([false, {}]);
                    }
                    setShortcutInputState(false);
                    props.setOpenAddShortcutsPopupWithAddModeOnState(false); // Check the top of Background.js for reasoning
                  }
                }
              }}
            />
            <input
              type="text"
              className={classes.addShortcutInput}
              value={linkInputState}
              onChange={(evt) => {
                setLinkInputState(evt.target.value);
              }}
              ref={linkInputRef}
              id={classes.addLink}
              autocomplete="off"
              spellcheck="false"
              autocorrect="off"
              placeholder="URL"
              onKeyDown={(evt) => {
                // When enter is pressed in either input field, it makes sure that none of the fields are blank, then it will add the shortcut
                if (evt.key == "Enter") {
                  const nameVal = nameInputState;
                  const linkVal = linkInputState;
                  if (nameVal.trim() != "" && linkVal.trim() != "") {
                    if (!editModeState[0]) {
                      addShortcut(nameVal, linkVal);
                    } else if (editModeState[0]) {
                      editShortcut(nameVal, linkVal);
                      setEditModeState([false, {}]);
                    }
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
                props.openAddShortcutsPopupWithAddModeOnState ||
                editModeState[0]
                  ? "max(15vw)"
                  : "max(1000vw)",
            }}
          >
            <CurrentShortcut
              newShortcutsObj={newShortcutObjState}
              newShortcutObjState={newShortcutObjState}
              setNewShortcutObjState={setNewShortcutObjState}
              setEditModeState={setEditModeState}
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
                        setEditModeState={setEditModeState}
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
