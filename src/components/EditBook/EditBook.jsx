import React, { useEffect, useState } from "react";
import classes from "./EditBook.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchBook } from "../../redux/slices/booksSlice";
import Input from "../UI/Input/Input";

const EditBook = ({ book, setIsVisibleEdit }) => {
  const dispatch = useDispatch();
  const { genres } = useSelector((state) => state.books);

  useEffect(() => {
    axios
      .get("http://bookstore/bookstore.ru/authors")
      .then((resp) => setAuthors(resp.data));
  }, []);

  const [authors, setAuthors] = useState([]);
  const [title, setTitle] = useState(book[0].title);
  const [release_year, setReleaseYear] = useState(book[0].release_year);
  const [text, setText] = useState(book[0].text);
  const [genre, setGenre] = useState();
  const [selectedAuthor, setSelectedAuthor] = useState(1);

  const updateBook = () => {
    let bookData = {
      book_id: book[0].book_id,
      authorId: selectedAuthor,
      genreId: genre,
      title,
      release_year,
      text,
    };
    axios
      .patch(
        `http://bookstore/bookstore.ru/books/${book[0].book_id}`,
        JSON.stringify(bookData)
      )
      .then(() => {
        dispatch(fetchBook(book[0].book_id));
        setIsVisibleEdit(false);
      });
  };

  return (
    <div>
      <div className={classes.blockInput}>
        <p className={classes.label}>Заголовок</p>
        <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className={classes.blockInput}>
        <p className={classes.label}>Год издания</p>
        <Input
          type="text"
          value={release_year}
          onChange={(e) => setReleaseYear(e.target.value)}
        />
      </div>
      <div className={classes.blockInput}>
        <p className={classes.label}>Краткое описание</p>
        <textarea
          type="text"
          className={classes.textarea}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className={classes.blockInput}>
        <p className={classes.label}>Жанр</p>
        <select className={classes.select} onChange={(e) => setGenre(e.target.value)}>
          {genres.map((genre, index) => (
            <option key={index} className={classes.option} value={index}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <div className={classes.blockInput}>
        <p className={classes.label}>Автор</p>
        <select
          className={classes.select}
          onChange={(e) => setSelectedAuthor(e.target.value)}>
          {authors.length
            ? authors.map((author) => {
                return (
                  <option key={author.author_id} value={author.author_id}>
                    {author.name} {author.surname}
                  </option>
                );
              })
            : ""}
        </select>
      </div>
      <button className={classes.button} onClick={updateBook}>
        Обновить
      </button>
    </div>
  );
};

export default EditBook;
