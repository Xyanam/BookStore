import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./AddBook.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AddBook = () => {
  const { genres } = useSelector((state) => state.books);
  const { role } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [authors, setAuthors] = useState([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [release_year, setReleaseYear] = useState("");
  const [genre, setGenre] = useState();
  const [selectedAuthor, setSelectedAuthor] = useState(1);
  const [image, setImage] = useState();

  useEffect(() => {
    axios
      .get("http://bookstore/bookstore.ru/authors")
      .then((resp) => setAuthors(resp.data));
  }, []);

  useEffect(() => {
    if (role !== "admin") {
      navigate("/");
    }
  }, [role]);

  const onFileChange = (e) => {
    let files = e.target.files;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);

    fileReader.onload = (event) => {
      setImage(event.target.result);
    };
  };

  const addBook = (e) => {
    e.preventDefault();
    let bookData = {
      title,
      text,
      release_year,
      image,
      genre_id: genre,
      author_id: selectedAuthor,
    };
    axios
      .post("http://bookstore/bookstore.ru/addBook", JSON.stringify(bookData))
      .then(() => toast.success("Книга добавлена!"))
      .catch((err) => toast.error(err));
  };

  return (
    <div className={classes.container}>
      <form className={classes.form} encType="multipart/form-data">
        <h1 className={classes.title}>Добавить книгу</h1>
        <div className={classes.block}>
          <p className={classes.label}>Заголовок</p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={classes.input}
          />
        </div>
        <div className={classes.block}>
          <p className={classes.label}>Краткое описание</p>
          <textarea
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={classes.textarea}
          />
        </div>
        <div className={classes.block}>
          <p className={classes.label}>Год издания</p>
          <input
            type="text"
            value={release_year}
            onChange={(e) => setReleaseYear(e.target.value)}
            className={classes.input}
          />
        </div>
        <div className={classes.block}>
          <p className={classes.label}>Жанр</p>
          <select className={classes.select} onChange={(e) => setGenre(e.target.value)}>
            {genres.map((genre, index) => (
              <option className={classes.option} value={index}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        <div className={classes.blockAuthor}>
          <p className={classes.label}>Автор</p>
          <select
            className={classes.select}
            onChange={(e) => setSelectedAuthor(e.target.value)}>
            {authors.length
              ? authors.map((author, index) => {
                  return (
                    <option value={index + 1}>
                      {author.name} {author.surname}
                    </option>
                  );
                })
              : ""}
          </select>
        </div>
        <div className={classes.blockUpload}>
          <input type="file" accept="image/*" onChange={onFileChange} />
          <div className={classes.imgBlock}>
            <img src={image} />
          </div>
        </div>
        <button type="submit" className={classes.button} onClick={addBook}>
          Добавить
        </button>
      </form>
    </div>
  );
};

export default AddBook;
