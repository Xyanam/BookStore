import React, { useEffect } from "react";
import classes from "./Admin.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import book from "../../assets/book.png";
import usersImg from "../../assets/users.png";
import programmer from "../../assets/programmer.png";
import { fetchUsers } from "../../redux/slices/userSlice";

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { role, users, loading } = useSelector((state) => state.user);
  const { books } = useSelector((state) => state.books);

  useEffect(() => {
    if (role !== "admin") {
      navigate("/");
    }
    dispatch(fetchUsers());
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
      </div>
      <div className={classes.programmer}>
        <img src={programmer} alt="" />
      </div>
    </div>
  );
};

export default Admin;
