import React from "react";
import BookInfo from "../../components/BookInfo/BookInfo";
import classes from "./AboutBook.module.css";

const AboutBook = () => {
  return (
    <div className={classes.container}>
      <BookInfo />
    </div>
  );
};

export default AboutBook;
