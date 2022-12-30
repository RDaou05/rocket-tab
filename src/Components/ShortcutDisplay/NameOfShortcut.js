import React from "react";

const NameOfShortcut = (props) => {
  const getTextToDisplay = (originalName) => {
    const modifiedTextToShow =
      originalName.charAt(0).toUpperCase() +
      originalName.substring(1).toLowerCase();
    if (modifiedTextToShow.length > 7) {
      return (
        originalName.charAt(0).toUpperCase() +
        originalName.substring(1, 6).toLowerCase() +
        ".."
      );
    } else {
      return modifiedTextToShow;
    }
  };
  return getTextToDisplay(props.name);
};

export default NameOfShortcut;
