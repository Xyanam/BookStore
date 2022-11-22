import React from "react";
import classes from "./Book.module.css";

const Book = () => {
    return (
        <div className={classes.block}>
            <div className={classes.blockItems}>
                <div className={classes.imgBlock}></div>
                <div className={classes.info}>
                    <h2 className={classes.title}>
                        Кладбище домашних животных
                    </h2>
                    <p className={classes.author}>Стивен Кинг</p>
                    <button className={classes.button}>Подробнее</button>
                </div>
            </div>
        </div>
    );
};

export default Book;
