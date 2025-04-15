import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Recipe, RecipeState } from "./types";


const initialState:RecipeState = {
    recipes: [],
    filteredRecipes: [],
    loading: false,
    error: null
}

const recipesSlice = createSlice({
    name: 'recipes',
   initialState,
   reducers: {
    fetchRecipesRequest (state) {       //when the request to get recipes from the backend is sent.
        state.loading = true;
    },
    fetchRecipesSuccess(state, action: PayloadAction<Recipe[]>) {        //When the request to get the recipes is successful.
        state.loading = false;
        state.recipes = Array.isArray(action.payload) ? action.payload : [];
    },
   
    fetchRecipesFailure(state, action: PayloadAction<string>) {      //When the request to get recipes are not successful.
        state.loading = false;
        state.error = action.payload;
    },

    filterRecipes (state, action: PayloadAction<keyof Recipe>) {
        const category = action.payload;
        state.filteredRecipes = state.recipes.filter((recipe) => recipe[category] === true );
    },

    resetFilter(state) {
        state.filteredRecipes = state.recipes;
    }
   }
});


export const { fetchRecipesRequest, fetchRecipesSuccess, fetchRecipesFailure,filterRecipes, resetFilter } = recipesSlice.actions;

export default recipesSlice;