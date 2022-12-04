import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader/Loader";
import classes from "./Users.module.css";
import trash from "../../../assets/trash.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchUsers } from "../../../redux/slices/userSlice";
const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, loading, role } = useSelector((state) => state.user);

  const deleteUser = (user_id) => {
    fetch(`http://bookstore/bookstore.ru/users`, {
      method: "DELETE",
      body: JSON.stringify({ user_id: +user_id }),
    });
  };

  const banUser = (user_id, banned) => {
    let banData = {
      user_id,
      banned,
    };
    axios
      .post("http://bookstore/bookstore.ru/banUser", JSON.stringify(banData))
      .then(() => dispatch(fetchUsers()));
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
        <div className={classes.tableBlocks}>
          {loading ? (
            <Loader />
          ) : (
            users.map((user) => {
              return (
                <div key={user.user_id} className={classes.block}>
                  <p>ID: {user.user_id}</p>
                  <p>{user.login}</p>
                  <p>Role: {user.role}</p>
                  <img
                    src={trash}
                    className={classes.icon}
                    alt="delete"
                    onClick={() => deleteUser(user.user_id)}
                  />
                  <button
                    className={classes.btnBan}
                    onClick={() =>
                      user.banned === "1"
                        ? banUser(user.user_id, 0)
                        : banUser(user.user_id, 1)
                    }>
                    {user.banned === "1" ? "Разблокировать" : "Заблокировать"}
                  </button>
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
