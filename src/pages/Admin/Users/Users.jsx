import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader/Loader";
import classes from "./Users.module.css";
import trash from "../../../assets/trash.png";
import { useNavigate } from "react-router-dom";
const Users = () => {
  const navigate = useNavigate();

  const { users, loading, role } = useSelector((state) => state.user);

  const deleteUser = (user_id) => {
    fetch(`http://bookstore/bookstore.ru/users`, {
      method: "DELETE",
      body: JSON.stringify({ user_id: +user_id }),
    });
  };
  useEffect(() => {
    if (role !== "admin") {
      navigate("/");
    }
  }, [role]);

  return (
    <div className={classes.container}>
      <h1 style={{ textAlign: "center" }}>Пользователи</h1>
      <div className={classes.blockWrapper}>
        <div className={classes.tableTitle}>
          <p>ID</p>
          <p>Логин</p>
          <p>Роль</p>
        </div>
        <div className={classes.tableBlocks}>
          {loading ? (
            <Loader />
          ) : (
            users.map((user) => {
              return (
                <div className={classes.block}>
                  <p>{user.user_id}</p>
                  <p>{user.login}</p>
                  <p>{user.role}</p>
                  <img
                    src={trash}
                    className={classes.icon}
                    alt="delete"
                    onClick={() => deleteUser(user.user_id)}
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

export default Users;
