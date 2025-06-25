import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register, refresh } from "./operations";

export interface AuthSlice {
    user: {
        name: string | null;
        email: string | null;
        isAdmin: boolean,
    };
    token: string | null;
    isLoggedIn: boolean;
    isRefreshing: boolean;
}

const initialState: AuthSlice = {
    user: {
        name: null,
        email: null, 
        isAdmin: false,
    }, 
    token: null,
    isLoggedIn: false, 
    isRefreshing: false
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, action) => {
                state.user = { name: action.payload.name, email: action.payload.email, isAdmin: true };
                state.token = action.payload.token;
                state.isLoggedIn = true;
                state.isRefreshing = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                if (!action.payload) return;
                state.user = { name: action.payload.name, email: action.payload.email, isAdmin: true };
                state.token = action.payload.token;
                state.isLoggedIn = true;
                state.isRefreshing = false;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = { name: null, email: null, isAdmin: false };
                state.token = null;
                state.isLoggedIn = false;
                state.isRefreshing = false;
            })
            .addCase(refresh.rejected, (state) => {
                state.isRefreshing = false;
            });
    }
});

export default slice.reducer;