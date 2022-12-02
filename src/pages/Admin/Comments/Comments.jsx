import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchComments } from "../../../redux/slices/commentsSlice";
import classes from "./Comments.module.css";
import Loader from "../../../components/Loader/Loader";
import trash from "../../../assets/trash.png";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Comments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchComments());
  }, []);

  const deleteComment = (comment_id) => {
    fetch(`http://bookstore/bookstore.ru/books/1`, {
      method: "DELETE",
      body: JSON.stringify({ comment_id }),
    })
      .then(() => {
        dispatch(fetchComments());
        toast.success("Комментарий удален");
      })
      .catch((error) => toast.error(error));
  };

  const { comments, loading } = useSelector((state) => state.comments);
  const { role } = useSelector((state) => state.user);

  useEffect(() => {
    if (role !== "admin") {
      navigate("/");
    }
  }, [role]);

  return (
    <div className={classes.container}>
      <h1 style={{ textAlign: "center" }}>Комментарии</h1>
      <div className={classes.blockWrapper}>
        <div className={classes.tableTitle}>
          <p>Пользователь</p>
          <p>Книга</p>
          <p>Текст комментария</p>
        </div>
        <div className={classes.tableBlocks}>
          {loading ? (
            <Loader />
          ) : (
            comments.map((comment) => {
              return (
                <div key={comment.comment_id} className={classes.block}>
                  <p>{comment.login}</p>
                  <Link className={classes.bookTitle} to={`/${comment.book_id}`}>
                    {comment.title}
                  </Link>
                  <p className={classes.text}>{comment.text.slice(0, 60)}...</p>
                  <img
                    src={trash}
                    className={classes.icon}
                    alt="delete"
                    onClick={() => deleteComment(comment.comment_id)}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
