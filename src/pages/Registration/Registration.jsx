import axios from "axios";
import React, { useState } from "react";
import classes from "./Registration.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import Input from "../../components/UI/Input/Input";

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role] = useState("user");

  const notify = (response) => {
    if (response === true) {
      toast.success("Успешная регистрация!");
    } else {
      toast.error("Логин уже используется");
    }
  };

  const onClickRegister = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      let userData = {
        login,
        password,
        role: "user",
      };
      axios
        .post("http://bookstore/bookstore.ru/register.php", JSON.stringify(userData))
        .then((resp) => {
          notify(resp.data.result);
          if (resp.data.result === true) {
            dispatch(
              setUser({
                user_id: resp.data.id,
                login,
                role,
              })
            );
            navigate(-1, { replace: true });
          }
        });
    } else {
      toast.error("Повторный пароль введен не верно");
    }
  };

  return (
    <div className={classes.container}>
      <ToastContainer position="top-center" />
      <form className={classes.form} encType="multipart/form-data">
        <h1 className={classes.title}>Регистрация</h1>
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
        <div className={classes.block}>
          <p className={classes.label}>Повторите пароль</p>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Повторите пароль"
          />
        </div>
        <button type="submit" className={classes.button} onClick={onClickRegister}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default Registration;
