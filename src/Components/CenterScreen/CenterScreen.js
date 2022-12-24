import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import classes from "./CenterScreen.module.css";
import PromptForName from "./PromptForName";

const CenterScreen = () => {
  const [promptForNameState, setPromptForNameState] = useState(false);
  const nameGreet = useRef(null);
  const nameFromLocal = localStorage.getItem("name");

  const setNewName = (name) => {
    localStorage.setItem("name", name);
    nameGreet.current.textContent = "Hello ${name}, what are you looking for?";
  };
  useLayoutEffect(() => {
    if (nameFromLocal == null) {
      setPromptForNameState(true);
    } else {
      nameGreet.current.textContent =
        "Hello " + nameFromLocal + ", what are you looking for?";
    }
  }, []);
  return (
    <div>
      {promptForNameState ? (
        <PromptForName setNewName={setNewName} />
      ) : (
        <>
          <h1 ref={nameGreet}>Hello, what are you looking for?</h1>
          <input type="text" id={classes.searchBox} />
        </>
      )}
    </div>
  );
};

export default CenterScreen;
