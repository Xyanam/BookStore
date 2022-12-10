import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./AddBook.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Input from "../../../components/UI/Input/Input";

const AddBook = () => {
  const { genres } = useSelector((state) => state.books);
  const { role } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [isVisibleAuthor, setIsVisibleAuthor] = useState(false);

  const [authors, setAuthors] = useState([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [release_year, setReleaseYear] = useState("");
  const [genre, setGenre] = useState();
  const [selectedAuthor, setSelectedAuthor] = useState(1);
  const [image, setImage] = useState();
  const [secondAuthor, setSecondAuthor] = useState(null);
  const [secondGenre, setSecondGenre] = useState(null);

  const [authorName, setAuthorName] = useState("");
  const [authorSurname, setAuthorSurname] = useState("");

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
      secondAuthorId: secondAuthor,
      secondGenreId: secondGenre,
    };
    axios
      .post("http://bookstore/bookstore.ru/addBook", JSON.stringify(bookData))
      .then(() => {
        toast.success("Книга добавлена!");
        setTitle("");
        setText("");
        setReleaseYear("");
        setImage("");
      })
      .catch((err) => toast.error(err));
  };

  const addAuthor = (e) => {
    e.preventDefault();
    let authorData = {
      name: authorName,
      surname: authorSurname,
    };
    axios.post("http://bookstore/bookstore.ru/addAuthor", JSON.stringify(authorData));
    axios
      .get("http://bookstore/bookstore.ru/authors")
      .then((resp) => setAuthors(resp.data))
      .then(() => {
        toast.success("Автор добавлен");
        setAuthorName("");
        setAuthorSurname("");
      });
  };

  return (
    <div className={classes.container}>
      <form className={classes.form} encType="multipart/form-data">
        <h1 className={classes.title}>Добавить книгу</h1>
        <div className={classes.block}>
          <p className={classes.label}>Заголовок</p>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введите заголовок"
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
          <Input
            type="text"
            value={release_year}
            onChange={(e) => setReleaseYear(e.target.value)}
            placeholder="Год издания"
          />
        </div>
        <div className={classes.block}>
          <p className={classes.label}>Жанр</p>
          <select className={classes.select} onChange={(e) => setGenre(e.target.value)}>
            {genres.map((genre, index) => (
              <option key={index} className={classes.option} value={index}>
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
              ? authors.map((author) => {
                  return (
                    <option key={author.author_id} value={author.author_id}>
                      {author.name} {author.surname}
                    </option>
                  );
                })
              : ""}
          </select>
          <p
            className={classes.addAuthorTitle}
            onClick={() => setIsVisibleAuthor(!isVisibleAuthor)}>
            Добавить автора +
          </p>
          {isVisibleAuthor && (
            <div className={classes.addAuthorBlock}>
              <input
                type="text"
                className={classes.input}
                placeholder="Введите имя..."
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
              />
              <input
                type="text"
                className={classes.input}
                placeholder="Введите фамилию..."
                value={authorSurname}
                onChange={(e) => setAuthorSurname(e.target.value)}
              />
              <button className={classes.buttonAddAuthor} onClick={addAuthor}>
                Добавить автора
              </button>
            </div>
          )}
        </div>
        <div className={classes.blockAuthor}>
          <p className={classes.label}>Второй автор</p>
          <select
            className={classes.select}
            onChange={(e) => setSecondAuthor(e.target.value)}>
            <option value={null}>Нет</option>
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
        <div className={classes.block}>
          <p className={classes.label}>Второй жанр</p>
          <select
            className={classes.select}
            onChange={(e) => setSecondGenre(e.target.value)}>
            <option value={null}>Нет</option>
            {genres.map((genre, index) => (
              <option key={index} className={classes.option} value={index}>
                {genre}
              </option>
            ))}
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
