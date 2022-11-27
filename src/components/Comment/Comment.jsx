import React from "react";
import classes from "./Comment.module.css";
import trash from "../../assets/trash.png";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchBook } from "../../redux/slices/booksSlice";

const Comment = ({ comments, book_id }) => {
  const dispatch = useDispatch();
  const { id, role } = useSelector((state) => state.user);

  const deleteComment = (comment_id) => {
    fetch(`http://bookstore/bookstore.ru/books/${book_id}`, {
      method: "DELETE",
      body: JSON.stringify({ comment_id }),
    })
      .then(() => {
        dispatch(fetchBook(book_id));
        toast.success("Комментарий удален");
      })
      .catch((error) => toast.error(error));
  };

  return (
    <div className={classes.block}>
      <div className={classes.comment}>
        <div className={classes.commentHead}>
          <h2 className={classes.author}>{comments.login}</h2>
          <span className={classes.vertical}>|</span>
          <span className={classes.date}>{comments.date}</span>
        </div>
        <p className={classes.text}>{comments.text}</p>
      </div>
      <div className={classes.trashIconBlock}>
        {comments.user_id === id || role === "admin" ? (
          <img
            src={trash}
            alt="delete"
            className={classes.delete}
            onClick={() => deleteComment(comments.comment_id)}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Comment;
