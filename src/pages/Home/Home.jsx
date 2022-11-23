import React, { useEffect, useState } from "react";
import classes from "./Home.module.css";
import Genres from "../../components/Genres/Genres";
import BooksList from "../../components/BooksList/BooksList";
import axios from "axios";
import Loader from "../../components/Loader/Loader";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    axios.get("http://bookstore/bookstore.ru/books").then((result) => {
      setBooks(result.data);
      setLoader(false);
    });
  }, []);

  return (
    <div className={classes.container}>
      <Genres />
      {loader ? (
        <Loader />
      ) : (
        <>
          <BooksList books={books} />
        </>
      )}
    </div>
  );
};

export default Home;
