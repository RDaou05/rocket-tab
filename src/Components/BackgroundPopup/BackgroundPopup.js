import React from "react";
import classes from "./BackgroundPopup.module.css";

const BackgroundPopup = (props) => {
  return (
    <>
      <div className={classes.backgroundPopup}>
        <div className={classes.pictureContainer}>
          <button
            className={classes.backgroundImage}
            id={classes.backgroundImage2}
            onClick={() => {
              props.changeBg("Tropical beach");
              props.hidePopup();
            }}
          ></button>
          <button
            className={classes.backgroundImage}
            id={classes.backgroundImage3}
            onClick={() => {
              props.changeBg("Iceland waterfall");
              props.hidePopup();
            }}
          ></button>
          <button
            className={classes.backgroundImage}
            id={classes.backgroundImage4}
            onClick={() => {
              props.changeBg("Forest");
              props.hidePopup();
            }}
          ></button>
          <button
            className={classes.backgroundImage}
            id={classes.backgroundImage5}
            onClick={() => {
              props.changeBg("Sunset beach");
              props.hidePopup();
            }}
          ></button>
          <button
            className={classes.backgroundImage}
            id={classes.backgroundImage6}
            onClick={() => {
              props.changeBg("Sunset forest");
              props.hidePopup();
            }}
          ></button>
          <button
            className={classes.backgroundImage}
            id={classes.backgroundImage7}
            onClick={() => {
              props.changeBg("Sunset path");
              props.hidePopup();
            }}
          ></button>
        </div>
        <div className={classes.deleteButtonContainer}>
          <button
            id={classes.deleteBackground}
            onClick={() => {
              props.changeBg(null);
              props.hidePopup();
            }}
          >
            Clear Background
          </button>
        </div>
      </div>
    </>
  );
};

export default BackgroundPopup;
