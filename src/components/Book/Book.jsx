import React from "react";
import { Link } from "react-router-dom";
import classes from "./Book.module.css";

const Book = ({ book }) => {
  return (
    <div className={classes.block}>
      <div className={classes.blockItems}>
        <div className={classes.imgBlock}>
          <img className={classes.img} src={book.image} alt="poster" />
        </div>
        <div className={classes.info}>
          <h2 className={classes.title}>{book.title}</h2>
          <p className={classes.author}>
            {book.name} {book.surname}
          </p>
          <Link to={`/${book.book_id}`} className={classes.button}>
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Book;
