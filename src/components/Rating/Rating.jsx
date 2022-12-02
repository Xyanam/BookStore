import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./Rating.module.css";

const Rating = () => {
  const { book } = useSelector((state) => state.books);
  const { id } = useSelector((state) => state.user);

  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);

  useEffect(() => {
    let data = {
      user_id: id,
      book_id: book[0].book_id,
    };
    axios
      .post("http://bookstore/bookstore.ru/ratingUser", JSON.stringify(data))
      .then((resp) => {
        resp.data === null ? setCurrentValue(0) : setCurrentValue(resp.data.rating);
      });
  }, [currentValue]);

  const handleClick = (value) => {
    setCurrentValue(value);
    let likeData = {
      user_id: id,
      book_id: book[0].book_id,
      rating: value,
    };
    axios.post(`http://bookstore/bookstore.ru/books/${id}`, JSON.stringify(likeData));
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  return (
    <div className={classes.container}>
      <div className={classes.stars}>
        {stars.map((_, index) => {
          return (
            <svg
              key={index}
              className={classes.star}
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              fill={(hoverValue || currentValue) > index ? "#ED8A19" : "gray"}
              viewBox="0 0 47.94 47.94"
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}>
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
      <div className={classes.ratingUser}>
        <div className={classes.rating}>
          <p>Ваша оценка:</p>
          <div
            className={classes.rate}
            style={{
              backgroundColor:
                currentValue == 3 ? "orange" : currentValue > 3 ? "green" : "red",
            }}>
            <p>{currentValue}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rating;
