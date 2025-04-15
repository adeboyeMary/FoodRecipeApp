import { AppDispatch } from ".";
import { jwtDecode } from "jwt-decode";
import { fetchLoginRequest, fetchLoginSuccess, fetchLoginFailure, fetchLogoutSuccess } from "./authSlice";


export const SignInThunk = (username: string, password: string) => {
    return async(dispatch: AppDispatch) => {
        dispatch(fetchLoginRequest());

        if (username.trim() === '' || password.length < 8){
            dispatch(fetchLoginFailure('Enter valid input!'));
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
                localStorage.setItem('token', data.authorizationToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                localStorage.setItem('user', JSON.stringify(data.username));

                console.log(localStorage.getItem('user'), '...what user is saved in local storage');
                console.log(data, '...login successful......');
                
                dispatch(startTokenRefresh());
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
        console.log('logout done and dusted!');
        dispatch(fetchLogoutSuccess());
        // window.location.href = '/';
    }
  };

const refreshTokenThunk = () => {
    return async(dispatch: AppDispatch, getState: any) => {
        dispatch(fetchLoginRequest());
        const state = getState();
        const refreshToken = state.auth.refreshToken || localStorage.getItem('refreshToken');

        // const refreshToken = localStorage.getItem('refreshToken');
        console.log("......refreshToken....", refreshToken);

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
                    token: newTokenResponseData.authorizationToken, refreshToken, // keep old one or get from response if renewed
                    user: JSON.parse(localStorage.getItem('user') || '{}'),
                }));
                localStorage.setItem('token', newTokenResponseData.authorizationToken);
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

// let refreshTimeout: ReturnType<typeof setTimeout>;

export const startTokenRefresh = () => {
    return async (dispatch: AppDispatch, getState: any) => {
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
            setTimeout(() => {
                dispatch(refreshTokenThunk());
            }, timeUntilTokenExpires - 1000);   // Refresh the token a second before it expires
        }

        // if (refreshTimeout) clearTimeout(refreshTimeout);
        
        // refreshTimeout = setTimeout(async () => {
        //     try {
        //       console.log('attempting token refresh...');
        //       await dispatch(refreshTokenThunk());  //with await if this fails, it jumps to the catch block and skips the next dispatch
      
        //       //Only reschedule if refresh didn't throw or fail
        //       dispatch(startTokenRefresh());
        //     }  catch(error: any) {
        //         console.error("Token refresh failed:", error);
        //         dispatch(logoutThunk());
        //         alert('Token refresh failed! Session expired. Please log in again.');
        //     }
        // }, 120000);  //2 minutes
    }
};

// export const refreshTokenBeforeExpiry = () => {
//     const tokenExpiryTime = localStorage.getItem("tokenExpiry"); // You store the expiry time when you get the token
//     const currentTime = new Date().getTime();

//     const timeUntilExpiry = tokenExpiryTime - currentTime;

//     if (timeUntilExpiry > 0) {
//         setTimeout(() => {
//             refreshToken();
//         }, timeUntilExpiry - 1000); // Refresh the token a second before it expires
//     }
// };
