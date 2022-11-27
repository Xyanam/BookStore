import React, { useEffect } from "react";
import classes from "./Admin.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.user);

  useEffect(() => {
    if (role !== "admin") {
      navigate("/");
    }
  }, [role]);

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}></div>
      <div className={classes.content}></div>
    </div>
  );
};

export default Admin;
