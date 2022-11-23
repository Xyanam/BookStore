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
            state.login = action.payload;
            state.password = action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
