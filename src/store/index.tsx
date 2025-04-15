import { configureStore } from "@reduxjs/toolkit";

import recipesSlice from "./recipeSlice";
import authSlice from "./authSlice";
import favoriteSlice from "./favorite-slice";


const store = configureStore({
    reducer: {auth: authSlice.reducer, recipes: recipesSlice.reducer, favorites: favoriteSlice.reducer }
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;