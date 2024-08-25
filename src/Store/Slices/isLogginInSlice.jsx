import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    isLoggedIn: localStorage.getItem('userToken'),
    role: null,  
};

const authSlice = createSlice({
    name: "auth",
    initialState: INITIAL_STATE,
    reducers: {
        loginAction: (state, action) => {
            state.isLoggedIn = true;
            state.role = action.payload;             
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.role = null;   
        },
    },
});

export default authSlice.reducer;
export const { loginAction, logout } = authSlice.actions;
