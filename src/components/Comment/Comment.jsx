import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBook } from "../../redux/slices/booksSlice";
import classes from "./Comment.module.css";

const Comment = ({ comments, book_id }) => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user);

  const deleteComment = (comment_id) => {
    fetch(`http://bookstore/bookstore.ru/books/${book_id}`, {
      method: "DELETE",
      body: JSON.stringify({ comment_id }),
    }).then(() => dispatch(fetchBook(book_id)));
  };

  return (
    <div className={classes.block}>
      <div className={classes.comment}>
        <h2 className={classes.author}>{comments.login}</h2>
        <span>{comments.date}</span>
        <p className={classes.text}>{comments.text}</p>

        {comments.user_id === id ? (
          <button onClick={() => deleteComment(comments.comment_id)}>Удалить</button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Comment;
