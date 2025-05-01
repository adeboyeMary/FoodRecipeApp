import { fetchRecipesRequest, fetchRecipesFailure, fetchRecipesSuccess } from './recipeSlice';
import { fetchFavoriteRequest, addToFavorite, favoriteRequestSuccess, favoriteRequestFailure } from './favorite-slice';
import { AppDispatch } from '.';



export const getAllRecipes = () => {
    return async (dispatch: any) => {
        try{
            dispatch(fetchRecipesRequest());
            const url = process.env.REACT_APP_BASE_URL || '';
            const response = await fetch(url);

            if (response.ok){
                const data = await response.json();
                dispatch(fetchRecipesSuccess(data.foundItems));
                localStorage.setItem('AllRecipes', data.foundItems);
            } else {
                dispatch(fetchRecipesFailure('Could not fetch Recipes'));       
                throw new Error('Could not fetch Recipes.');
            }
        } catch(error:any){
            dispatch(fetchRecipesFailure(error.message));
        }
    }
};

export const getRecipeDetailsById = (recipeId: number) => {
    return async (dispatch: any) => {
        try{
            dispatch(fetchRecipesRequest());
            const getByIdUrl =`${process.env.REACT_APP_BASE_URL}/${recipeId}`;
            const response = await fetch(getByIdUrl);
                const data = await response.json();

                if (response.ok){
                    dispatch(fetchRecipesSuccess([data]));
                } else {
                    dispatch(fetchRecipesFailure('Could not fetch Recipes Details'));  
                    throw new Error(data.message || 'Failed to fetch Recipe Details.')
                }

        } catch(error:any){
            dispatch(fetchRecipesFailure(error.message));
        }
    }
};


export const addRecipeToFavorite = (recipeId: string) => {
    return async (dispatch: AppDispatch, getState: any) => {  
        const state = getState();
        const token = state.auth.token || localStorage.getItem('token');
        console.log(token, '......Token from auth slice.....');   
   
        if(!token || token === '0'){
            return;
        }
        try{
            const addToFavoriteUrl = `${process.env.REACT_APP_API_ADD_TO_FAVORITE_URL}/${recipeId}`;
            const response = await fetch(addToFavoriteUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ recipeId })
            });
            console.log("addToFavoriteUrl:", addToFavoriteUrl);
            console.log("Authorization header:", `Bearer ${token}`);
            const data = await response.json();

            if(response.ok){
                dispatch(addToFavorite(data));
                console.log(data, 'What is in favorite?......');
                const updatedFavorites = getState().favorites.favorites;
                // localStorage.setItem(data, 'favorites');
                localStorage.setItem('favorites', JSON.stringify(updatedFavorites) );
                console.log(localStorage.getItem('favorites'), '.............favorites from local storage...........');
                console.log(data.recipe, '.............ADDITION SUCCESSFUL...........');
            } else {
                if(response.status === 401) {
                    console.log('Unauthorized, redirecting to sign-in...');
                    alert('Unauthorized, sign-in to add recipe to favorite.');
                } else{
                    dispatch(fetchRecipesFailure('Unable to add recipe to Favorite.'));
                }

                dispatch(fetchRecipesFailure('Unable to add recipe to Favorite.'));
            }
        } catch(error: any){
            dispatch(fetchRecipesFailure(error.message));
        }
    }
};

export const fetchAllFavorites = () => {
    return async(dispatch: any, getState: any) => {
        const state = getState();
        const token = state.auth.token || localStorage.getItem('token');
        console.log(token, '......Token from auth slice.....');

        if(!token || token === '0'){
            dispatch(favoriteRequestFailure('Unauthorized! Signin to view favorites..'));
            return;
        }
        dispatch(fetchFavoriteRequest());
        try {
            const getFavoriteURL = process.env.REACT_APP_API_GET_FAVORITE_URL || "";
            const response = await fetch(getFavoriteURL, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            const data = await response.json();
            console.log(data, 'fetchAllFav-data');

            if(response.ok) {
                // const data = await response.json();
                dispatch(favoriteRequestSuccess(data));
                localStorage.setItem('favorites', JSON.stringify(state.favorites));
                console.log(data, "......///data?/////.....");
            } else {
                if(response.status === 401) {
                    console.log('Unauthorized, redirecting to sign-in...');
                    console.log(localStorage.getItem('token'), '............token3...........');
                } else{
                    dispatch(favoriteRequestFailure('Unable to get Favorite.'));
                }
            }
        } 
        catch (error: any){
            console.log('Error:', error);
            dispatch(favoriteRequestFailure('Unable to fetch favorites.'));
        } 
    }
};
