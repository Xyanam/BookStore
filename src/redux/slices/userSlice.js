import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  id: null,
  login: null,
  role: null,
  loading: false,
  error: null,
  users: [],
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async function (_, { rejectWithValue }) {
    try {
      const users = await axios
        .get("http://bookstore/bookstore.ru/users")
        .then((response) => response.data);
      return users;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.user_id;
      state.login = action.payload.login;
      state.role = action.payload.role;
    },
    removeUser(state) {
      state.id = null;
      state.login = null;
      state.role = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.loading = false;
      state.error = "server error";
    });
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
