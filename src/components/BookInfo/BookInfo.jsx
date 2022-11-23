import React from "react";
import classes from "./BookInfo.module.css";
import Comment from "../Comment/Comment";

const BookInfo = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.block}>
        <div className={classes.blockImg}></div>
        <div className={classes.infoBlock}>
          <div className={classes.info}>
            <h2 className={classes.title}>Кладбище домашних животных</h2>
            <p className={classes.infoItems}>Автор: Стивен Кинг</p>
            <p className={classes.infoItems}>Жанр: Хоррор</p>
            <p className={classes.infoItems}>Год выпуска: 2019</p>
          </div>
          <div className={classes.descriptionBook}>
            <p className={classes.description}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum blanditiis quam, ea animi ad tenetur aspernatur
              exercitationem itaque, id quod reprehenderit voluptatibus corrupti
              qui ipsum officia quisquam neque! Voluptate quaerat aperiam
              accusamus fugit est voluptatum cumque perferendis, consequuntur
              laborum rerum incidunt labore nulla possimus laboriosam dolor
              tempore commodi, accusantium illo.
            </p>
          </div>
        </div>
      </div>

      <div className={classes.commentsBlock}>
        <h1 style={{ textAlign: "center" }}>Комментарии</h1>
        <div className={classes.commentList}>
          <Comment />
          <Comment />
          <Comment />
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
