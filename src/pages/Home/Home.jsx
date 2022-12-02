import React, { useEffect } from "react";
import classes from "./Home.module.css";
import Genres from "../../components/Genres/Genres";
import BooksList from "../../components/BooksList/BooksList";
import Loader from "../../components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../redux/slices/booksSlice";

const Home = () => {
  const { loading } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <div className={classes.container}>
      <Genres />
      {loading ? (
        <Loader />
      ) : (
        <>
          <BooksList />
        </>
      )}
    </div>
  );
};

export default Home;
