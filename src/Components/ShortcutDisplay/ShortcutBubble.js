import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import NameOfShortcut from "./NameOfShortcut";
import classes from "./ShortcutBubble.module.css";

const ShortcutBubble = (props) => {
  const [shortcutState, setShortcutState] = useState(props.shortcut);
  const [linkState, setLinkState] = useState(props.shortcut.link);
  const [imageIsValidState, setImageIsValidState] = useState(true);
  const [iconSourceLink, setIconSourceLink] = useState();
  const favicon = useRef(null);
  const listOfColors = ["red", "green", "blue"];
  useLayoutEffect(() => {
    const i = async () => {
      const response = await fetch(
        `https://www.google.com/s2/favicons?domain=${linkState}`
      );
      console.log("Res: ", response);
      if (!response.ok) {
        setImageIsValidState(false);
      } else {
        setImageIsValidState(true);
      }
    };
    // i();
    // setImageIsValidState(true);
    if (
      linkState.substring(0, 5) == "http:" ||
      linkState.substring(0, 6) == "https:" ||
      linkState.substring(0, 7) == "http://" ||
      linkState.substring(0, 8) == "https://"
    ) {
      setIconSourceLink(
        `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${linkState.trim()}&size=48`
      );
    } else {
      setIconSourceLink(
        `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${linkState.trim()}&size=48`
      );
    }
  }, [linkState]);
  useEffect(() => {
    console.log("CURRENT: ", favicon.current);
    console.log("CURR W: ", favicon.current.width);
    if (favicon.current.width != 48) {
      setImageIsValidState(false);
    } else {
      setImageIsValidState(true);
    }
  }, [iconSourceLink]);
  return (
    <div
      className={classes.shortcutBubble}
      onClick={() => {
        if (
          linkState.substring(0, 5) == "http:" ||
          linkState.substring(0, 6) == "https:" ||
          linkState.substring(0, 7) == "http://" ||
          linkState.substring(0, 8) == "https://"
        ) {
          window.location = linkState;
        } else {
          window.location = "http://" + linkState;
          // Incase the user is trying to access a website that is not http, but https instead, the browser just automatically changes it
        }
      }}
    >
      {imageIsValidState ? (
        <div>
          <img ref={favicon} src={iconSourceLink} />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            borderRadius: "1vh",
            alignSelf: "center",
            cursor: "pointer",
            justifyContent: "center",
            padding:
              shortcutState.name.charAt(1).trim() == ""
                ? ".5% 1.2%"
                : ".5% .5%",
            backgroundColor: "#251e1e",
            width: "48px",
            height: "48px",
          }}
        >
          <div
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "1.5rem",
              color: "white",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
            }}
          >
            {`${shortcutState.name.charAt(0).toUpperCase()}${shortcutState.name
              .charAt(1)
              .toLowerCase()}`}
          </div>
        </div>
      )}

      {imageIsValidState ? (
        <p style={{ color: "wheat" }}>
          <NameOfShortcut name={shortcutState.name} />
        </p>
      ) : (
        <p style={{ marginBottom: "0", marginTop: "1.3em", color: "wheat" }}>
          <NameOfShortcut name={shortcutState.name} />
        </p>
      )}
    </div>
  );
};

export default ShortcutBubble;
