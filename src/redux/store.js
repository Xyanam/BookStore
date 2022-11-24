import { configureStore } from "@reduxjs/toolkit";
import booksSlice from "./slices/booksSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    books: booksSlice,
  },
});
