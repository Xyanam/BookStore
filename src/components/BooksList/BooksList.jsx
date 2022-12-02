import React from "react";
import { useSelector } from "react-redux";
import Book from "../Book/Book";
import classes from "./BooksList.module.css";

const BooksList = () => {
  const { books, loading } = useSelector((state) => state.books);
  return (
    <div className={classes.container}>
      {loading ? (
        <h1>Книги не найдено</h1>
      ) : (
        books.map((book) => <Book key={book.book_id} book={book} />)
      )}
    </div>
  );
};

export default BooksList;
