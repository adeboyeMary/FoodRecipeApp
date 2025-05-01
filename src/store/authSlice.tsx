import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./types";


const storedUser = localStorage.getItem('user');
let parsedUser: User = { username: '' };

if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
  try {
    parsedUser = { username: storedUser }; 
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
    localStorage.removeItem("user"); // Remove corrupted user data
  }
}
  
const authSlice = createSlice({
    name: 'authentication',
    initialState: {
        isLoggedIn: !!localStorage.getItem('token'),
        user: parsedUser,
        loading: false,
        error: null,
        token: localStorage.getItem('token'),
        refreshToken: localStorage.getItem('refreshToken'),
    },
    reducers: {
        fetchLoginRequest (state){
            state.loading = true;
            state.isLoggedIn = false;
            state.error = null;
        },
        fetchLoginSuccess (state, action){
            state.loading = false;
            state.isLoggedIn = true;
            state.user = action.payload.username;
            state.token = action.payload.authorizationToken;
            state.refreshToken = action.payload.refreshToken;
            state.error = null;

            localStorage.setItem('token', action.payload.authorizationToken);
            localStorage.setItem('refreshToken', action.payload.refreshToken);
            localStorage.setItem('user', (action.payload.username));
        },
        fetchLoginFailure (state, action) {
            state.loading = false;
            state.error = action.payload
        },
        setUser(state, action: PayloadAction<{ username: string }>) {
            state.user = action.payload;
        },
        fetchLogoutSuccess(state){
            state.isLoggedIn = false;
            state.error = null;
            state.user = { username: '' };
            state.loading = false;
            state.token = null;
            state.refreshToken = null;

            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('refreshToken');
        }
    }
});

export const {fetchLoginRequest, fetchLoginSuccess, fetchLoginFailure, fetchLogoutSuccess, setUser} = authSlice.actions;
export default authSlice;