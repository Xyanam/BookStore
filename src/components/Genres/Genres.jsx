import React, { useState } from "react";
import classes from "./Genres.module.css";

const Genres = () => {
  const genres = [
    "Все",
    "Хоррор",
    "Фантастика",
    "Детектив",
    "Триллер",
    "Мистика",
  ];
  const [activeGenre, setActiveGenre] = useState(0);
  return (
    <div className={classes.container}>
      <ul className={classes.genresList}>
        {genres.map((genre, index) => (
          <div
            key={index}
            className={
              activeGenre === index
                ? classes.blockGenreActive
                : classes.blockGenre
            }
            onClick={() => setActiveGenre(index)}
          >
            <li className={classes.genre}>{genre}</li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Genres;
