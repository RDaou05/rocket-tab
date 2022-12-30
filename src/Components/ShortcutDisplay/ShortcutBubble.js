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
    let sourceLink;
    if (
      linkState.substring(0, 5) == "http:" ||
      linkState.substring(0, 6) == "https:" ||
      linkState.substring(0, 7) == "http://" ||
      linkState.substring(0, 8) == "https://"
    ) {
      sourceLink = `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${linkState.trim()}&size=48`;
      setIconSourceLink(sourceLink);
    } else {
      sourceLink = `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${linkState.trim()}&size=48`;
      setIconSourceLink(sourceLink);
    }

    // Sometimes, the favicon grabber link can return an image thats smaller than 48px (even though we specify 48 in the link)
    // So if this happens, we just show a box with the first letter of the name, instead of showing the image (favicon)
    // The way we check if the size is being rendered as a smaller size, is by creating a dummy image with that same source url...
    // and checking if the width is what it's supposed to be
    // Then we obviously delete the dummy element after were done
    let testElement = document.createElement("img");
    testElement.style.display = "none";
    testElement.id = `testImage${shortcutState.id}`;
    testElement.src = sourceLink;
    document.body.appendChild(testElement);

    setTimeout(() => {
      if (document.getElementById(`testImage${shortcutState.id}`).width != 48) {
        setImageIsValidState(false);
      } else {
        setImageIsValidState(true);
      }
      document.getElementById(`testImage${shortcutState.id}`).remove(); // Delete dummy element
    }, 500);
  }, [linkState]);

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
