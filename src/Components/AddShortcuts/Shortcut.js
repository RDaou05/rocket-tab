import React, { useEffect, useLayoutEffect, useState } from "react";
import classes from "./Shortcut.module.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
const Shortcut = (props) => {
  let shortcutObj;
  let linkFromShortcutObj;

  const [imageIsValidState, setImageIsValidState] = useState(false);
  const [iconSourceLink, setIconSourceLink] = useState("");
  const [hoveringOnShortcutState, setHoveringOnShortcutState] = useState(false);
  const a = () => {
    if (props.current) {
      // We are iterating through the list of shortcuts to see the position of where this shortcut is in the list
      // The reason we are finding the shortcut from the list, rather than using the object of the shortcut given to us from the 'shortcuts' props...
      // Is because the 'shortcuts' prop is not a state. It's the value given to us from when we map out this component
      // The reason we need it to be a state is so this component will update when the shortcut is changed
      // So when the user updates the link or the name, this whole Shortcut.js component will re render
      props.newShortcutObjState.forEach((shortcut, indexNum) => {
        if (props.shortcut.id == shortcut.id) {
          shortcutObj = props.newShortcutObjState[indexNum];
          linkFromShortcutObj = props.newShortcutObjState[indexNum].link;
        }
      });
    } else if (!props.current) {
      props.shortcutsListState.forEach((shortcut, indexNum) => {
        if (props.shortcut.id == shortcut.id) {
          shortcutObj = props.shortcutsListState[indexNum];
          linkFromShortcutObj = props.shortcutsListState[indexNum].link;
        }
      });
    }
  };
  a();
  useEffect(() => {
    if (
      linkFromShortcutObj.substring(0, 5) == "http:" ||
      linkFromShortcutObj.substring(0, 6) == "https:" ||
      linkFromShortcutObj.substring(0, 7) == "http://" ||
      linkFromShortcutObj.substring(0, 8) == "https://"
    ) {
      setIconSourceLink(
        `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${linkFromShortcutObj.trim()}&size=24`
      );
    } else {
      setIconSourceLink(
        `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${linkFromShortcutObj.trim()}&size=24`
      );
    }
  }, [props.shortcutsListState, props.newShortcutObjState]);

  return (
    <div
      className={classes.mainShortcutDiv}
      onMouseEnter={() => {
        setHoveringOnShortcutState(true);
      }}
      onMouseLeave={() => {
        setHoveringOnShortcutState(false);
      }}
    >
      {hoveringOnShortcutState ? (
        <div className={classes.iconContainer}>
          <FaRegTrashAlt
            className={classes.changeShortcutIcon}
            style={{ cursor: "pointer", fontSize: "1em" }}
            onClick={() => {
              if (props.current) {
                // The 'current' prop is true if this shortcut was added during this session
                props.newShortcutObjState.slice(0).forEach((element, index) => {
                  // NOTE: Doing .slice(0) is just a way to create a copy of an array
                  if (element.id == shortcutObj.id) {
                    let arrayCopy = props.newShortcutObjState.slice(0); // Making copy of the array that stores shortcuts added in this session
                    arrayCopy.splice(index, 1); // Deleting the shortcut from the array copy
                    props.setNewShortcutObjState(arrayCopy);
                    // Updating (deleting the shortcut) the state the stores all the shortcuts that were added in the current session
                  }
                });
              } else if (!props.current) {
                // The user is trying to delete a shortcut that was added in a different session
                props.shortcutsListState.slice(0).forEach((element, index) => {
                  // NOTE: Doing .slice(0) is just a way to create a copy of an array
                  if (element.id == shortcutObj.id) {
                    let arrayCopy = props.shortcutsListState.slice(0); // Making copy of the array that stores shortcuts added a different session
                    arrayCopy.splice(index, 1); // Deleting the shortcut from the array copy
                    props.setShortcutsListState(arrayCopy);
                    // Updating (deleting the shortcut) the state the stores all the shortcuts that were added in a different session
                  }
                });
              }

              // Deleting the shortcut from local storage
              let currentLocalStorageSnap = JSON.parse(
                localStorage.getItem("shortcuts")
              );
              currentLocalStorageSnap.forEach((element, index) => {
                // Trying to find the id that matches with the ID that needs to be deleted
                if (element.id == shortcutObj.id) {
                  // Shortcut to be deleted has been found in localstorage array
                  currentLocalStorageSnap.splice(index, 1); // Removes the shortcut from the array and updates original array
                }
              });
              localStorage.setItem(
                // Updating local storage with new version of array without the deleted shortcut
                "shortcuts",
                JSON.stringify(currentLocalStorageSnap)
              );
            }}
          />
          <TiPencil
            className={classes.changeShortcutIcon}
            style={{
              cursor: "pointer",
              marginLeft: "0.5em",
              fontSize: "1.2em",
            }}
            onClick={() => {
              props.setEditModeState([true, shortcutObj, props.current]);
            }}
          />
        </div>
      ) : null}
      <p
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span>
          {iconSourceLink != "" ? (
            <img
              src={iconSourceLink}
              style={{ marginRight: "0.5em" }}
              className={classes.shortcutIcon}
            />
          ) : null}
        </span>
        <p className={classes.shortcutName}>{shortcutObj.name}</p>
      </p>
    </div>
  );
};

export default Shortcut;
