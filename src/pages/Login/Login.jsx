import axios from "axios";
import React, { useState } from "react";
import classes from "./Login.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import GreenButton from "../../components/UI/GreenButton/GreenButton";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const notify = (response) => {
    if (response === 200) {
      toast.success("Успешная авторизация!");
    } else {
      toast.error("Неверный логин или пароль");
    }
  };

  const onClickRegister = (e) => {
    e.preventDefault();

    let userData = {
      login,
      password,
    };
    axios
      .post("http://bookstore/bookstore.ru/signin.php", JSON.stringify(userData))
      .then((response) => {
        notify(response.data.status);
        if (response.data.status === 200) {
          dispatch(setUser(response.data));
          navigate(-1, { replace: true });
        }
      });
  };
  return (
    <div className={classes.container}>
      <form className={classes.form} encType="multipart/form-data">
        <h1 className={classes.title}>Авторизация</h1>
        <div className={classes.block}>
          <p className={classes.label}>Логин</p>
          <Input
            name="login"
            type="text"
            placeholder="Введите логин"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div className={classes.block}>
          <p className={classes.label}>Пароль</p>
          <Input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
          />
        </div>
        <GreenButton onClick={onClickRegister}>Авторизоваться</GreenButton>
      </form>
    </div>
  );
};

export default Login;
