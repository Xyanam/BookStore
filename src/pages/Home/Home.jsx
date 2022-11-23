import React, { useEffect, useState } from "react";
import classes from "./Home.module.css";
import Genres from "../../components/Genres/Genres";
import BooksList from "../../components/BooksList/BooksList";
import axios from "axios";

const Home = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios
            .get("http://bookstore/bookstore.ru/books")
            .then((result) => setBooks(result.data));
    }, []);

    return (
        <div className={classes.container}>
            <Genres />
            <BooksList books={books} />
        </div>
    );
};

export default Home;
