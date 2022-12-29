import React, { useEffect, useState } from "react";
import classes from "./Shortcut.module.css";
const Shortcut = (props) => {
  const [shortcutState, setShortcutState] = useState(props.shortcut);
  const [linkState, setLinkState] = useState(props.shortcut.link);
  const [imageIsValidState, setImageIsValidState] = useState(false);
  const [iconSourceLink, setIconSourceLink] = useState("");
  console.log(props.shortcut);
  useEffect(() => {
    const i = async () => {
      // let headers = {};
      // headers["Access-Control-Allow-Origin"] = "*";
      const response = await fetch(
        `https://www.google.com/s2/favicons?domain=${linkState}`
      );
      console.log("Res: ", response);
      if (!response.ok) {
        setImageIsValidState(false);
      } else {
        setImageIsValidState(true);
      }
      // setImageIsValidState(true);
    };
    i();
    if (
      linkState.substring(0, 5) == "http:" ||
      linkState.substring(0, 6) == "https:" ||
      linkState.substring(0, 7) == "http://" ||
      linkState.substring(0, 8) == "https://"
    ) {
      setIconSourceLink(
        `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${linkState.trim()}&size=24`
      );
    } else {
      setIconSourceLink(
        `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${linkState.trim()}&size=24`
      );
    }
  }, [linkState]);

  return (
    <div>
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
            />
          ) : null}
        </span>
        <p className={classes.shortcutName}>{shortcutState.name}</p>
      </p>
    </div>
  );
};

export default Shortcut;
