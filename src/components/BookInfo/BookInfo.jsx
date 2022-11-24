import React, { useEffect } from "react";
import classes from "./BookInfo.module.css";
import Comment from "../Comment/Comment";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { fetchBook } from "../../redux/slices/booksSlice";

const BookInfo = () => {
  const { id } = useParams();
  const { loading, book } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const { isAuth } = useAuth();

  useEffect(() => {
    dispatch(fetchBook(id));
  }, [id, dispatch]);

  return (
    <div className={classes.wrapper}>
      {loading ? (
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
                <p className={classes.infoItems}>
                  Автор: {book.name} {book.surname}
                </p>
                <p className={classes.infoItems}>Жанр: {book.genre}</p>
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
