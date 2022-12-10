import React from "react";
import classes from "./GreenButton.module.css";

const GreenButton = ({ children, onClick }) => {
  return (
    <>
      <button className={classes.button} onClick={onClick}>
        {children}
      </button>
    </>
  );
};

export default GreenButton;
