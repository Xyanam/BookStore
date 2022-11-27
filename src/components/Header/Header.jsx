import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { setBooks } from "../../redux/slices/booksSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { isAuth } = useAuth();

  const { login, role } = useSelector((state) => state.user);

  const [search, setSearch] = useState("");
  const [selectedSearch, setSelectedSearch] = useState("title");

  useEffect(() => {
    axios
      .get(`http://bookstore/bookstore.ru/books?${selectedSearch}=${search}`)
      .then((response) => dispatch(setBooks(response.data)));
  }, [search, dispatch]);

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
          <select
            name="Искать по"
            onChange={(e) => setSelectedSearch(e.target.value)}
            className={classes.select}>
            <option disabled className={classes.option}>
              Искать по:
            </option>
            <option value="title" className={classes.option}>
              Названию
            </option>
            <option value="author" className={classes.option}>
              Автору
            </option>
          </select>
          <input
            type="text"
            className={classes.input}
            placeholder="Я ищу..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className={classes.auth}>
          {role === "admin" && (
            <Link to="/admin" className={classes.admin}>
              <p>Админ Панель</p>
            </Link>
          )}
          {isAuth ? (
            <div className={classes.user}>
              <div className={classes.userLogin}>{login}</div>
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
