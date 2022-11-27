import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  login: null,
  role: null,
};

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
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
