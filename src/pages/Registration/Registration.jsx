import axios from "axios";
import React, { useState } from "react";
import classes from "./Registration.module.css";
const Registration = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const onClickRegister = (e) => {
        e.preventDefault();

        let userData = [login, password];

        axios
            .post("http://bookstore/bookstore.ru/register.php", userData)
            .then((resp) => console.log(resp));
    };

    return (
        <div className={classes.container}>
            <form className={classes.form}>
                <h1 className={classes.title}>Регистрация</h1>
                <div className={classes.block}>
                    <p className={classes.label}>Логин</p>
                    <input
                        type="text"
                        className={classes.input}
                        placeholder="Введите логин"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                </div>
                <div className={classes.block}>
                    <p className={classes.label}>Пароль</p>
                    <input
                        type="password"
                        className={classes.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Введите пароль"
                    />
                </div>
                <div className={classes.block}>
                    <p className={classes.label}>Повторите пароль</p>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={classes.input}
                        placeholder="Повторите пароль"
                    />
                </div>
                <button
                    type="submit"
                    className={classes.button}
                    onClick={onClickRegister}
                >
                    Зарегистрироваться
                </button>
            </form>
        </div>
    );
};

export default Registration;
