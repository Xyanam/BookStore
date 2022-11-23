import React from "react";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";

const Header = () => {
    return (
        <header className={classes.header}>
            <div className={classes.navigation}>
                <div className={classes.logo}>
                    <h1 className={classes.logoTitle}>
                        <span className={classes.book}>BOOK</span>
                        <span className={classes.store}>STORE</span>
                    </h1>
                </div>
                <div className={classes.searchBlock}>
                    <input
                        type="text"
                        className={classes.input}
                        placeholder="Я ищу..."
                    />
                </div>
                <div className={classes.auth}>
                    <Link to="/" className={classes.login}>
                        <p>Вход</p>
                    </Link>
                    <Link to="/register" className={classes.register}>
                        <p>Регистрация</p>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
