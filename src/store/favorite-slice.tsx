import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FavoriteState, ApiFavorite } from './types';


const initialState:FavoriteState = {
    favorites: Array.isArray(JSON.parse(localStorage.getItem("favorites") || "[]"))
    ? JSON.parse(localStorage.getItem("favorites") || "[]")
    : [], 
    loading: false,
    error: null
}


const favoriteSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        fetchFavoriteRequest (state) {       //when the request to get recipes from the backend is sent.
            state.loading = true;
        },

        addToFavorite (state, action: PayloadAction<{id: string, title: string, image: string}>) {
            const newFavorite = {
                id: action.payload.id,
                recipe: {
                    id: action.payload.id,
                    title: action.payload.title,
                    image: action.payload.image
                }
            }
            const isFavorite = state.favorites.some(fav => fav.id === newFavorite.id);

            if(!isFavorite){
                state.favorites = [...state.favorites, newFavorite];
            } else {
                state.favorites = state.favorites.filter(fav => fav.id !== newFavorite.id);
            }
            state.loading = false;
        },

        favoriteRequestSuccess (state, action: PayloadAction<ApiFavorite[]>) {
            state.favorites = action.payload.map((fav) => ({
                id: fav.id,
                recipe: {
                    id: fav.recipe.id,
                    title: fav.recipe.title,  // Extract title from the first recipe
                    image: fav.recipe.image,
                }
            }));
            state.loading = false;
        },
        favoriteRequestFailure (state, action: PayloadAction<string | null>) {
            state.error = action.payload;
            state.loading = false;
        }
    }
});

export const { addToFavorite,fetchFavoriteRequest, favoriteRequestSuccess, favoriteRequestFailure } = favoriteSlice.actions;
export default favoriteSlice;