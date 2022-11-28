import React, { useEffect } from "react";
import classes from "./Admin.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import book from "../../assets/book.png";
import users from "../../assets/users.png";
import programmer from "../../assets/programmer.png";

const Admin = () => {
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.user);
  const { books } = useSelector((state) => state.books);

  useEffect(() => {
    if (role !== "admin") {
      navigate("/");
    }
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
              <img src={users} alt="" />
            </div>
            <div className={classes.count}>
              <span>Пользователей:</span>
              <p>21</p>
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
