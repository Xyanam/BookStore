import React, { useEffect, useState } from "react";
import classes from "./BookInfo.module.css";
import Comment from "../Comment/Comment";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useAuth } from "../../hooks/useAuth";

const BookInfo = () => {
  const { id } = useParams();
  const [book, setBook] = useState();
  const [loader, setLoader] = useState(true);
  const { isAuth } = useAuth();

  useEffect(() => {
    setLoader(true);
    axios.get(`http://bookstore/bookstore.ru/books/${id}`).then((response) => {
      setBook(response.data);
      setLoader(false);
    });
  }, [id]);

  return (
    <div className={classes.wrapper}>
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className={classes.block}>
            <div className={classes.blockImg}>
              <img src={book.image} className={classes.img} alt="" />
            </div>
            <div className={classes.infoBlock}>
              <div className={classes.info}>
                <h2 className={classes.title}>{book.title}</h2>
                <p className={classes.infoItems}>Автор: Стивен Кинг</p>
                <p className={classes.infoItems}>Жанр: Хоррор</p>
                <p className={classes.infoItems}>
                  Год выпуска: {book.release_year}
                </p>
              </div>
              <div className={classes.descriptionBook}>
                <p className={classes.description}>{book.text}</p>
              </div>
            </div>
          </div>

          <div className={classes.commentsBlock}>
            <h1 style={{ textAlign: "center" }}>Комментарии</h1>
            {isAuth ? (
              <>
                <div className={classes.commentList}>
                  <Comment />
                </div>
              </>
            ) : (
              "Зарегайся"
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BookInfo;
