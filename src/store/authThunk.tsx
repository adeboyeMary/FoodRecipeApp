import { AppDispatch } from ".";
import { jwtDecode } from "jwt-decode";
import { fetchAllFavorites } from "./recipesThunk";
import { fetchLoginRequest, fetchLoginSuccess, fetchLoginFailure, fetchLogoutSuccess } from "./authSlice";


export const SignInThunk = (username: string, password: string) => {
    return async(dispatch: AppDispatch) => {
        dispatch(fetchLoginRequest());

        if (username.trim() === '' || password.length < 8){
            dispatch(fetchLoginFailure('Enter valid input!'));
            return;
        }
        console.log("Attempting to sign in with:", username, password);
        try{
            const url = process.env.REACT_APP_SIGNIN_URL || '';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),

            });
            const data = await response.json();
            console.log(data, "....sign in data......");
           
            if(response.ok){
                dispatch(fetchLoginSuccess(data));
                dispatch(fetchAllFavorites());
                localStorage.setItem('token', data.authorizationToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                // localStorage.setItem('user', JSON.stringify({username: data.username}));
                localStorage.setItem('user', (data.username));


                console.log(localStorage.getItem('user'), '...what user is saved in local storage');
                console.log(data, '...login successful......');
                window.location.href = '/';     //redirect to home after successful login.
            } else{
                if(data.message === 'User not found'){
                    dispatch(fetchLoginFailure('User not found. Please SignUp.'));
                    window.location.href = '/SignUp';
                } else{
                    dispatch(fetchLoginFailure(data?.message || 'SignIn failed. Please try again.'));
                }
            }
        } catch (error: any){
            console.error('Error:', error); // To catch unexpected errors
            dispatch(fetchLoginFailure(error?.message || 'An error occurred!'));
        }
    }
};

export const SignUpThunk = (username: string, password: string) => {
    return async(dispatch: AppDispatch) => {
        dispatch(fetchLoginRequest());
        if(username.trim() === '' || password.length < 8){
            dispatch(fetchLoginFailure('Enter valid inputs!'));
            return;
        }

        try{
            const url = process.env.REACT_APP_SIGNUP_URL || '';
             const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
            });
            const data = await response.json();
            if(response.ok){
                dispatch(fetchLoginFailure('Successful! Proceed to Sign in.'));
                dispatch(fetchLoginSuccess(data));
            } else {
                dispatch(fetchLoginFailure('Unable to sign up, please try again later.'));
                throw new Error(data?.message || 'Failed to sign up.');
            }

        } catch(error: any){
            dispatch(fetchLoginFailure(error.message));
        }
    }
};

 export const logoutThunk = () => {
    return (dispatch: AppDispatch) => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        dispatch(fetchLogoutSuccess());
    }
  };

const refreshTokenThunk = () => {
    return async(dispatch: AppDispatch, getState: any) => {
        dispatch(fetchLoginRequest());
        const state = getState();
        const refreshToken = state.auth.refreshToken || localStorage.getItem('refreshToken');
        const user = state.auth.user || localStorage.getItem('user') || { username: '' } ;

        if (!refreshToken || refreshToken.length === 0) {
            console.log('No refresh token found*****');
            dispatch(logoutThunk());
            return; 
        }

        try{
            console.log('.....logic starting....');
            const refreshTokenUrl = process.env.REACT_APP_REFRESH_TOKEN_URL || '';
            const response = await fetch(refreshTokenUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({refreshToken}),
            });
            const newTokenResponseData = await response.json();
            console.log('.....response gotten....');

            if(response.ok){         
                dispatch(fetchLoginSuccess({
                    token: newTokenResponseData.authorizationToken, // keep old one or get from response if renewed
                    refreshToken: newTokenResponseData.refreshToken || refreshToken,
                    user: user
                }));
                localStorage.setItem('token', newTokenResponseData.authorizationToken);
                localStorage.setItem('user', (user.username));

                console.log(localStorage.getItem('token'), '......new token.....');
                console.log(newTokenResponseData.authorizationToken, '......refreshed token.....');
               console.log('......refreshed successfully!.....');

            } else{
                if(response.status === 403){
                    dispatch(logoutThunk());
                    alert('imma quickly log you out dear.');
                } else{
                    dispatch(fetchLoginFailure('Unable to refresh.'));
                    throw new Error(newTokenResponseData?.message || 'Refresh failed!');
                }
            }
        } catch(error: any){
            dispatch(fetchLoginFailure(error.message));
        }
    }
};

let refreshTimeout: ReturnType<typeof setTimeout>;

export const startTokenRefresh = () => {
    console.log('now in startTokenRefresh....');
    return async (dispatch: AppDispatch, getState: any) => {
        if(refreshTimeout) {
            clearTimeout(refreshTimeout); // Clear previous timer
        }

        const state = getState();
        const token = state.auth.token || localStorage.getItem('token');

        if(!token) {
            console.log('No token');
            return;   //do not refresh.
        }

        const decodedToken = jwtDecode(token) as { exp: number };
        const tokenExpiryTime = decodedToken.exp * 1000;
        const currentTime = new Date().getTime();
        const timeUntilTokenExpires = tokenExpiryTime - currentTime;

        if(timeUntilTokenExpires <= 0) {
            dispatch(refreshTokenThunk());   // Token has expired, refresh it
          
        } else {
            const delay = Math.max(timeUntilTokenExpires - 1000, 0);

            refreshTimeout = setTimeout(() => {
                dispatch(refreshTokenThunk());
            }, delay );   // Refresh the token a second before it expires
            console.log('now at the end of startTokenRefresh....');

        }
    }
};
