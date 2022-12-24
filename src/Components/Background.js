import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import classes from "./Background.module.css";
import backgroundList from "../infoFiles/backgrounds";
import defaultClasses from "./DefaultBackground.module.css";

const Background = () => {
  const [backgroundState, setBackgroundState] = useState();
  const backgroundRef = useRef(null);
  const width = 1920;
  const height = 1080;
  const bgLocal = localStorage.getItem("bg");
  useEffect(() => {
    if (bgLocal == "Tropical beach") {
      backgroundRef.current.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1548041347-390744c58da6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&q=100&w=1920&h=1080)";
    } else if (bgLocal == "Iceland waterfall") {
      backgroundRef.current.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1548049983-5be60c9bc004?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&q=100&w=1920&h=1080')";
    } else if (bgLocal == "Forest") {
      backgroundRef.current.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1473448912268-2022ce9509d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&q=100&w=1920&h=1080')";
    } else if (bgLocal == "Sunset beach") {
      backgroundRef.current.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1547532182-bf296f6be875?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&q=100&w=1920&h=1080')";
    } else if (bgLocal == "Sunset forest") {
      backgroundRef.current.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1547989453-11e67ffb3885?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&q=100&w=1920&h=1080')";
    } else if (bgLocal == "Sunset path") {
      backgroundRef.current.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1496614932623-0a3a9743552e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&q=100&w=1920&h=1080')";
    }
    if (bgLocal == null) {
      document.body.style.background = // Default gradient
        "linear-gradient(45deg, #b16cff, #4460ff, #b16cff, #4460ff)";
    } else {
      //   backgroundRef.current.style.background = "none";
    }
  }, []);
  return <div className={classes.background} ref={backgroundRef}></div>;
};

export default Background;
