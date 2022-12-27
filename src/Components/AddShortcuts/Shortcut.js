import React from "react";
import clases from "./Shortcut.module.css";
const Shortcut = (props) => {
  const shortcutObj = JSON.parse(props.shortcutStringified);
  const name = shortcutObj.name;
  const link = shortcutObj.link;
  return (
    <div>
      {props.name} and {props.link}
    </div>
  );
};

export default Shortcut;
