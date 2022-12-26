import React from "react";
import classes from "./AddShortcuts.module.css";

const AddShortcuts = (props) => {
  return (
    <div className={classes.shortcutsPopup}>
      <div className={classes.shortcutsContainer}>
        <button
          id={classes.closeName}
          onClick={() => {
            props.close();
          }}
        >
          &#x2715;
        </button>

        <div className={classes.shortcutsContainer}>
          <h1 className={classes.shortcutsHeader}>Add Shortcuts</h1>
        </div>
      </div>
    </div>
  );
};

export default AddShortcuts;
