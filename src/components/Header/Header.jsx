import React from "react";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
const Header = () => {
  const dispatch = useDispatch();
  const { isAuth } = useAuth();
  const user = useSelector((state) => state.user);

  const logout = () => {
    toast.info("Вы вышли из аккаунта!");
    dispatch(removeUser());
  };

  return (
    <header className={classes.header}>
      <div className={classes.navigation}>
        <Link to="/" className={classes.logo}>
          <h1 className={classes.logoTitle}>
            <span className={classes.book}>BOOK</span>
            <span className={classes.store}>STORE</span>
          </h1>
        </Link>
        <div className={classes.searchBlock}>
          <input type="text" className={classes.input} placeholder="Я ищу..." />
        </div>
        <div className={classes.auth}>
          {isAuth ? (
            <div className={classes.user}>
              <div className={classes.userLogin}>{user.login}</div>
              <div className={classes.imgBlock} onClick={logout}>
                <p>Выйти</p>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login" className={classes.login}>
                <p>Вход</p>
              </Link>
              <Link to="/register" className={classes.register}>
                <p>Регистрация</p>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
