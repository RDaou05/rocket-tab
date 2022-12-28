import React, { useEffect, useState } from "react";
import classes from "./Shortcut.module.css";
const Shortcut = (props) => {
  const [shortcutState, setShortcutState] = useState(props.shortcut);
  const [linkState, setLinkState] = useState(props.shortcut.link);
  const [imageIsValidState, setImageIsValidState] = useState(false);
  const [iconSourceLink, setIconSourceLink] = useState("");
  useEffect(() => {
    const i = async () => {
      const response = await fetch(
        `https://www.google.com/s2/favicons?domain=${linkState}`
      );
      if (!response.ok) {
        setImageIsValidState(false);
      } else {
        setImageIsValidState(true);
      }
    };
    i();
  }, [linkState]);

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
  return (
    <div>
      <p>
        <span>
          {setIconSourceLink != "" ? <img src={setIconSourceLink} /> : null}
        </span>
        {shortcutState.name}
      </p>
    </div>
  );
};

export default Shortcut;
