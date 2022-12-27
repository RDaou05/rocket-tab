import React from "react";
import clases from "./Shortcut.module.css";
const Shortcut = (props) => {
  return (
    <div>
      {props.name} and {props.shortLink} and {props.link}
    </div>
  );
};

export default Shortcut;
