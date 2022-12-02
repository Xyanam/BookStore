import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  comments: [],
  loading: false,
  error: null,
};

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async function (_, { rejectWithValue }) {
    try {
      const comments = await axios
        .get("http://bookstore/bookstore.ru/comments")
        .then((response) => response.data);
      return comments;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    });
    builder.addCase(fetchComments.rejected, (state) => {
      state.loading = false;
      state.error = "Server error";
    });
  },
});

export default commentsSlice.reducer;
