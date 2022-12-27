import React, { useState } from "react";
import classes from "./Shortcut.module.css";
const Shortcut = (props) => {
  const [shortcutState, setShortcutState] = useState(props.shortcut);

  return (
    <div>
      <p>
        {shortcutState.name} and {shortcutState.link}
      </p>
    </div>
  );
};

export default Shortcut;
