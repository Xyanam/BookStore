import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBook } from "../../redux/slices/booksSlice";
import { useAuth } from "../../hooks/useAuth";
import classes from "./BookInfo.module.css";
import Loader from "../Loader/Loader";
import CommentsBlock from "../CommentsBlock/CommentsBlock";
import Rating from "../Rating/Rating";
import pencil from "../../assets/pencil.svg";
import deleteIcon from "../../assets/delete.svg";
import EditBook from "../EditBook/EditBook";
import { toast } from "react-toastify";

const BookInfo = () => {
  const { id } = useParams();
  const { book, loading } = useSelector((state) => state.books);
  const { role } = useSelector((state) => state.user);
  const { isAuth } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isVisibleEdit, setIsVisibleEdit] = useState(false);

  useEffect(() => {
    dispatch(fetchBook(id));
  }, [id, dispatch]);

  const deleteBook = (book_id) => {
    fetch("http://bookstore/bookstore.ru/deleteBook", {
      method: "DELETE",
      body: JSON.stringify({ book_id }),
    })
      .then(() => {
        navigate("/");
        toast.success("Книга удалена");
      })
      .catch((error) => toast.error(error));
  };

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
              <div className={classes.rating}>
                <div className={classes.rate}>
                  <p>{book[0].rating}</p>
                </div>
              </div>
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
              {!isVisibleEdit ? (
                <>
                  <div className={classes.info}>
                    <h2 className={classes.title}>{book[0].title}</h2>
                    <div className={classes.blockAuthors}>
                      <p className={classes.infoItems}>Авторы:</p>
                      {book[0].authors.map((author) => {
                        return (
                          <p key={author.author_id} className={classes.infoItems}>
                            {author.name} {author.surname}
                          </p>
                        );
                      })}
                    </div>
                    <div className={classes.blockAuthors}>
                      <p className={classes.infoItems}>Жанры:</p>
                      {book[0].genres.map((genre) => {
                        return (
                          <p key={genre.genre_id} className={classes.infoItems}>
                            {genre.genre}
                          </p>
                        );
                      })}
                    </div>
                    <p className={classes.infoItems}>
                      Год выпуска: {book[0].release_year}
                    </p>
                  </div>
                  <div className={classes.descriptionBook}>
                    <p className={classes.description}>{book[0].text}</p>
                  </div>
                </>
              ) : (
                <>
                  <EditBook book={book} setIsVisibleEdit={setIsVisibleEdit} />
                </>
              )}

              {role === "admin" && (
                <div className={classes.adminActions}>
                  <div
                    className={classes.editButtonBlock}
                    onClick={() => setIsVisibleEdit(!isVisibleEdit)}>
                    <img src={pencil} alt="edit" className={classes.pencil} />
                    <span>{isVisibleEdit ? "Скрыть" : "Редактировать"}</span>
                  </div>
                  <div
                    className={classes.editButtonBlock}
                    onClick={() => deleteBook(book[0].book_id)}>
                    <img src={deleteIcon} alt="edit" className={classes.pencil} />
                    <span>Удалить</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <CommentsBlock book_id={id} />
        </div>
      )}
    </>
  );
};

export default BookInfo;
