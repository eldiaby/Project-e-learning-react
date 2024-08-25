import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    isLoggedIn: localStorage.getItem('userToken'),
};

const authSlice = createSlice({
    name: "auth",
    initialState: INITIAL_STATE,
    reducers: {
        login: (state) => {
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.isLoggedIn = false;
        },
    },
});

export default authSlice.reducer;

export const { login, logout } = authSlice.actions;
