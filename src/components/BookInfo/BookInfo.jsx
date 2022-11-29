import React, { useEffect } from "react";
import classes from "./BookInfo.module.css";
import { useParams, Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchBook } from "../../redux/slices/booksSlice";
import CommentsBlock from "../CommentsBlock/CommentsBlock";
import Rating from "../Rating/Rating";
import { useAuth } from "../../hooks/useAuth";

const BookInfo = () => {
  const { id } = useParams();
  const { book, loading } = useSelector((state) => state.books);
  const { isAuth } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBook(id));
  }, [id, dispatch]);

  return (
    <>
      {book.length === 0 ? (
        <div className={classes.notFound}>
          <h1>Книга не найдена!</h1>
        </div>
      ) : loading ? (
        <Loader />
      ) : (
        <div className={classes.wrapper}>
          <div className={classes.block}>
            <div className={classes.blockImg}>
              <img src={book[0].image} className={classes.img} alt="" />
              {isAuth ? (
                <Rating />
              ) : (
                <p className={classes.textNonAuth}>
                  Чтобы оценить книгу,{" "}
                  <Link to="/login" className={classes.link}>
                    авторизуйтесь
                  </Link>{" "}
                  или{" "}
                  <Link to="/register" className={classes.link}>
                    зарегистрируйтесь
                  </Link>
                </p>
              )}
            </div>
            <div className={classes.infoBlock}>
              <div className={classes.info}>
                <h2 className={classes.title}>{book[0].title}</h2>
                <p className={classes.infoItems}>
                  Автор: {book[0].name} {book[0].surname}
                </p>
                <p className={classes.infoItems}>Жанр: {book[0].genre}</p>
                <p className={classes.infoItems}>Год выпуска: {book[0].release_year}</p>
              </div>
              <div className={classes.descriptionBook}>
                <p className={classes.description}>{book[0].text}</p>
              </div>
            </div>
          </div>
          <CommentsBlock book_id={id} />
        </div>
      )}
    </>
  );
};

export default BookInfo;
