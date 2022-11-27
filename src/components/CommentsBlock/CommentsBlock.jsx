import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./CommentsBlock.module.css";
import Comment from "../Comment/Comment";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { fetchBook } from "../../redux/slices/booksSlice";
const CommentsBlock = ({ book_id }) => {
  const dispatch = useDispatch();
  const { isAuth } = useAuth();
  const { book } = useSelector((state) => state.books);
  const { id } = useSelector((state) => state.user);
  const [commentText, setCommentText] = useState("");

  const sendComment = () => {
    if (commentText.length > 3) {
      let commentData = {
        user_id: id,
        book_id,
        text: commentText,
      };
      axios
        .post("http://bookstore/bookstore.ru/books", commentData)
        .then(() => {
          dispatch(fetchBook(book_id));
          setCommentText("");
          toast.success("Комментарий добавлен");
        })
        .catch((error) => toast.error(error));
    } else {
      toast.error("Вы ввели меньше 3 символов");
    }
  };

  return (
    <div className={classes.commentsBlock}>
      <h1 style={{ textAlign: "center" }}>Комментарии</h1>
      {isAuth ? (
        <>
          <div className={classes.blockInput}>
            <textarea
              className={classes.commentInput}
              placeholder="Напишите что вы думаете о книге..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button className={classes.button} onClick={sendComment}>
              Отправить
            </button>
          </div>
        </>
      ) : (
        <div className={classes.nonAuth}>
          <p className={classes.textNonAuth}>
            Чтобы написать комментарий,{" "}
            <Link to="/login" className={classes.link}>
              авторизуйтесь
            </Link>{" "}
            или{" "}
            <Link to="/register" className={classes.link}>
              зарегистрируйтесь
            </Link>
          </p>
        </div>
      )}
      <div className={classes.commentList}>
        {!book[1].length ? (
          <p className={classes.empty}>
            Тут пусто!
            <br />
            Будьте первым, кто напишет комментарий!
          </p>
        ) : (
          book[1].map((comments) => (
            <Comment key={comments.comment_id} comments={comments} book_id={book_id} />
          ))
        )}
      </div>
    </div>
  );
};

export default CommentsBlock;
