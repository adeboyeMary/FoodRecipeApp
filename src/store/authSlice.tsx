import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./types";


const storedUser = localStorage.getItem('user');
let parsedUser: User = {username: '', password: ''};

if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
  try {
    parsedUser = JSON.parse(storedUser);
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
    
    // initialState: {
    //     //It sets to true or false based on the presence of token. So if there is token, isLoggedIn is true.
    //     isLoggedIn: !!localStorage.getItem('token'),  //It sets to true or false based on the presence of token.
    //     // user: JSON.parse(localStorage.getItem('user') || '{}'),
    //     user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}'!) : {username: '', password: ''},
    //     loading: false,
    //     error: null
    // },
    reducers: {
        fetchLoginRequest (state){
            state.loading = true;
            state.isLoggedIn = false;
            state.error = null;
        },
        fetchLoginSuccess (state, action){
            // const { user, token, refreshToken } = action.payload;
            state.loading = false;
            state.isLoggedIn = true;
            state.user = {
                username: action.payload.username,
                password: action.payload.password
            };
            state.token = action.payload.authorizationToken;
            console.log('LOGIN PAYLOAD:', action.payload);
            state.refreshToken = action.payload.refreshToken;
            state.error = null;

            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('refreshToken', action.payload.refreshToken);
            localStorage.setItem('user', JSON.stringify(action.payload.username));
        },
        fetchLoginFailure (state, action) {
            state.loading = false;
            state.error = action.payload
        },
        setUser(state, action: PayloadAction<{ username: string; password: string }>) {
            state.user = action.payload;
        },
        fetchLogoutSuccess(state){
            state.isLoggedIn = false;
            state.error = null;
            state.user = { username: '', password: '' };
            state.loading = false;
            state.token = null;

            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }
});



export const {fetchLoginRequest, fetchLoginSuccess, fetchLoginFailure, fetchLogoutSuccess, setUser} = authSlice.actions;
export default authSlice;