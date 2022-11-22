import React from "react";
import Book from "../Book/Book";
import classes from "./BooksList.module.css";

const BooksList = () => {
    return (
        <div className={classes.container}>
            <Book />
            <Book />
            <Book />
            <Book />
            <Book />
            <Book />
            <Book />
            <Book />
        </div>
    );
};

export default BooksList;
