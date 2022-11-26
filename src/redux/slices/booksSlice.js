import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  books: [],
  book: [],
  loading: true,
  error: null,
  genres: ["Все", "Хоррор", "Фантастика", "Триллер", "Детектив", "Мистика"],
};

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async function (_, { rejectWithValue }) {
    try {
      const books = await axios
        .get("http://bookstore/bookstore.ru/books")
        .then((response) => response.data);
      return books;
    } catch (error) {
      return rejectWithValue(`${error}`);
    }
  }
);

export const fetchBook = createAsyncThunk(
  "books/fetchBook",
  async function (id, { rejectWithValue }) {
    try {
      const book = await axios
        .get(`http://bookstore/bookstore.ru/books/${id}`)
        .then((response) => response.data);
      return book;
    } catch (error) {
      return rejectWithValue(`${error}`);
    }
  }
);

export const fetchBooksByGenre = createAsyncThunk(
  "books/fetchBooksByGenre",
  async function (genre, { rejectWithValue }) {
    const genres = genre > 0 ? `?genre=${genre}` : "";
    try {
      const books = await axios
        .get(`http://bookstore/bookstore.ru/books${genres}`)
        .then((response) => response.data);
      return books;
    } catch (error) {
      return rejectWithValue(`${error}`);
    }
  }
);

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks(state, action) {
      state.books = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.loading = false;
      state.books = action.payload;
    });
    builder.addCase(fetchBooks.rejected, (state) => {
      state.loading = false;
      state.error = "Server error";
    });
    builder.addCase(fetchBook.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      state.loading = false;
      state.book = action.payload;
    });
    builder.addCase(fetchBook.rejected, (state) => {
      state.loading = false;
      state.error = "Server error";
    });
    builder.addCase(fetchBooksByGenre.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBooksByGenre.fulfilled, (state, action) => {
      state.loading = false;
      state.books = action.payload;
    });
    builder.addCase(fetchBooksByGenre.rejected, (state) => {
      state.loading = false;
      state.error = "Server error";
    });
  },
});

export const { setBooks } = booksSlice.actions;

export default booksSlice.reducer;
