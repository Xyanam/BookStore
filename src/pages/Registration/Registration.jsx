import axios from "axios";
import React, { useState } from "react";
import classes from "./Registration.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const [role, setRole] = useState("user");

  const notify = (response) => {
    if (response === true) {
      toast.success("Успешная регистрация!");
    } else {
      toast.error("Логин уже используется");
    }
  };

  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const onClickRegister = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      let userData = {
        login,
        password,
        image,
        role: "user",
      };

      axios
        .post(
          "http://bookstore/bookstore.ru/register.php",
          JSON.stringify(userData)
        )
        .then((resp) => {
          notify(resp.data.result);
          if (resp.data.result === true) {
            dispatch(
              setUser({
                login,
                password,
                image,
                role,
              })
            );
            navigate("/");
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
          <input
            name="login"
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
            name="password"
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
        <div className={classes.block}>
          <p className={classes.label}>Аватарка</p>
          <input type="file" id="input" onChange={imageHandler} required />
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
