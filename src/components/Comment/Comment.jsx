import React from "react";
import classes from "./Comment.module.css";

const Comment = ({ comments }) => {
  return (
    <div className={classes.block}>
      <div className={classes.comment}>
        <h2 className={classes.author}>{comments.login}</h2>
        <p className={classes.text}>{comments.text}</p>
      </div>
    </div>
  );
};

export default Comment;
