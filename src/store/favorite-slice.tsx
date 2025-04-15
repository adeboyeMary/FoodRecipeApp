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
                // title: action.payload.title,
                // image: action.payload.image
                recipe: {
                    id: action.payload.id,
                    title: action.payload.title,
                    image: action.payload.image
                }
            }
            console.log("initial array before addition :", [...state.favorites]);

            const isFavorite = state.favorites.some(fav => fav.id === newFavorite.id);

            if(!isFavorite){
                state.favorites.push(newFavorite); // Add to favorites
            } else {
                alert(`Recipe already in favorites.`);
                console.log(`Recipe already in favorites.`);
            }
            console.log("initial array after addition :", [...state.favorites]);
            state.loading = false;
        },

        favoriteRequestSuccess (state, action: PayloadAction<ApiFavorite[]>) {
            state.favorites = action.payload.map((fav) => ({
                id: fav.id,
                // title: fav.title,
                // image: fav.image,
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