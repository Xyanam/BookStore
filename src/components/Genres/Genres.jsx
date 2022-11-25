import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooksByGenre } from "../../redux/slices/booksSlice";
import classes from "./Genres.module.css";

const Genres = () => {
  const dispatch = useDispatch();
  const { genres } = useSelector((state) => state.books);

  const [activeGenre, setActiveGenre] = useState(0);
  return (
    <div className={classes.container}>
      <ul className={classes.genresList}>
        {genres.map((genre, index) => (
          <div
            key={index}
            className={
              activeGenre === index ? classes.blockGenreActive : classes.blockGenre
            }
            onClick={() => {
              dispatch(fetchBooksByGenre(index));
              setActiveGenre(index);
            }}>
            <li className={classes.genre}>{genre}</li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Genres;
