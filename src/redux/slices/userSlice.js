import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  login: null,
  password: null,
  image: null,
  role: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.login = action.payload.login;
      state.password = action.payload.password;
      state.image = action.payload.image;
      state.role = action.payload.role;
    },
    removeUser(state) {
      state.login = null;
      state.password = null;
      state.image = null;
      state.role = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
