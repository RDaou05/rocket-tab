import React, { useLayoutEffect, useState } from "react";
import classes from "./AddShortcuts.module.css";
import Shortcut from "./Shortcut";

const AddShortcuts = (props) => {
  const [shortcutsListState, setShortcutsListState] = useState([]);
  useLayoutEffect(() => {
    const localGet = localStorage.getItem("shortcuts");
    console.log("lcget: ", localGet);
    if (localGet != null && localGet != []) {
      setShortcutsListState(localGet);
    }
  }, [shortcutsListState]);

  const addShortcut = (name, link) => {
    const currentLocal = localStorage.getItem("shortcuts");
    const shortLink = "testshortlink.com";
    if (currentLocal != null && currentLocal != []) {
      // If there is already a main array with a shortcut in it, then it will just make a new copy of it with the array + the new shortcut
      let newLocal = currentLocal;
      console.log("newl: ", newLocal);
      newLocal.push(JSON.stringify({ name: name, link: link }));
      localStorage.setItem("shortcuts", newLocal);
    } else {
      // If there is no current shortcuts added, it will make the main array, and add this shortcut to it
      localStorage.setItem("shortcuts", [
        JSON.stringify({ name: name, link: link }),
      ]);
    }
  };
  return (
    <div
      className={classes.shortcutsPopup}
      style={{ padding: "1rem 1rem 3rem 1rem" }}
    >
      <div
        className={classes.shortcutsContainer}
        style={{ padding: "1rem 1rem 3rem 1rem" }}
      >
        <div className={classes.addShortcutsHeader} style={{ width: "100%" }}>
          <button
            id={classes.addShortcutsPlus}
            onClick={() => {
              addShortcut("Youtube", "youtube.com");
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

        <div className={classes.shortcutsContainer}>
          <div className={classes.linksContainer}>
            {console.log(shortcutsListState)}
            {shortcutsListState != []
              ? shortcutsListState.map((shortcut, index) => {
                  <Shortcut key={index} shortcutStringified={shortcut} />;
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddShortcuts;
