import React, { useState } from "react";
import classes from "./Sidebar.module.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [activeNavigation, setActiveNavigation] = useState(0);

  const sidebarNav = [
    {
      name: "Статистика",
      path: "/admin",
    },
    {
      name: "Добавить книгу",
      path: "/admin/addBook",
    },
    {
      name: "Комментарии",
      path: "/admin/comments",
    },
    {
      name: "Пользователи",
      path: "/admin/users",
    },
  ];

  return (
    <div className={classes.sidebar}>
      <div className={classes.navigation}>
        {sidebarNav.map((nav, index) => {
          return (
            <Link
              to={nav.path}
              key={index}
              className={
                activeNavigation === index
                  ? classes.sidebarItemsActive
                  : classes.sidebarItems
              }
              onClick={() => setActiveNavigation(index)}>
              <p>{nav.name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
