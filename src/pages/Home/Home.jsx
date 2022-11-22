import React from "react";
import classes from "./Home.module.css";
import Genres from "../../components/Genres/Genres";
import BooksList from "../../components/BooksList/BooksList";

const Home = () => {
    return (
        <div className={classes.container}>
            <Genres />
            <BooksList />
        </div>
    );
};

export default Home;
