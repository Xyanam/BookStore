import React, { useEffect } from "react";
import classes from "./Admin.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import book from "../../assets/book.png";
import usersImg from "../../assets/users.png";
import programmer from "../../assets/programmer.png";
import comment from "../../assets/comment.svg";
import { fetchUsers } from "../../redux/slices/userSlice";
import { fetchComments } from "../../redux/slices/commentsSlice";
import { fetchBooks } from "../../redux/slices/booksSlice";

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comments);
  const { role, users, loading } = useSelector((state) => state.user);
  const { books } = useSelector((state) => state.books);

  useEffect(() => {
    if (role !== "admin") {
      navigate("/");
    }
    dispatch(fetchUsers());
    dispatch(fetchComments());
    dispatch(fetchBooks());
  }, [role]);

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.block}>
          <div className={classes.info}>
            <div className={classes.imgBlock}>
              <img src={book} alt="" />
            </div>
            <div className={classes.count}>
              <span>Всего книг:</span>
              <p>{books.length}</p>
            </div>
          </div>
        </div>
        <div className={classes.block}>
          <div className={classes.info}>
            <div className={classes.imgBlock}>
              <img src={usersImg} alt="" />
            </div>
            <div className={classes.count}>
              <span>Пользователей:</span>
              <p>{loading ? "Загрузка.." : users.length}</p>
            </div>
          </div>
        </div>
        <div className={classes.block}>
          <div className={classes.info}>
            <div className={classes.imgBlock}>
              <img src={comment} alt="" />
            </div>
            <div className={classes.count}>
              <span>Комментариев:</span>
              <p>{loading ? "Загрузка.." : comments.length}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.programmer}>
        <img src={programmer} alt="programmer" />
      </div>
    </div>
  );
};

export default Admin;
