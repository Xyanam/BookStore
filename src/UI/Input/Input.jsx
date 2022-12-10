import React from "react";
import classes from "./Input.module.css";

const Input = ({ name, type, placeholder, value, onChange }) => {
  return (
    <>
      <input
        name={name}
        type={type}
        className={classes.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default Input;
