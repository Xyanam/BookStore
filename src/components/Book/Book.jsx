import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Book.module.css";

const Book = ({ book }) => {
  const stars = Array(5).fill(0);
  const [activeStar] = useState(book.rating);
  return (
    <div className={classes.block}>
      <div className={classes.blockItems}>
        <div className={classes.imgBlock}>
          <img className={classes.img} src={book.image} alt="poster" />
        </div>
        <div className={classes.info}>
          <h2 className={classes.title}>{book.title}</h2>
          <p className={classes.author}>
            {book.name} {book.surname}
          </p>
          <div className={classes.stars}>
            {stars.map((_, index) => {
              return (
                <svg
                  fill={activeStar > index ? "#ED8A19" : "gray"}
                  className={classes.star}
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 47.94 47.94">
                  <path
                    d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757
	c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042
	c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685
	c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528
	c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956
	C22.602,0.567,25.338,0.567,26.285,2.486z"
                  />
                </svg>
              );
            })}
          </div>
          <Link to={`/${book.book_id}`} className={classes.button}>
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Book;
