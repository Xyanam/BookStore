import React from "react";
import Book from "../Book/Book";
import classes from "./BooksList.module.css";

const BooksList = ({ books }) => {
    return (
        <div className={classes.container}>
            {books.map((book) => (
                <Book key={book.id} book={book} />
            ))}
        </div>
    );
};

export default BooksList;
