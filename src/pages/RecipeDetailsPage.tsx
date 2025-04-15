import { useEffect, useState } from "react";

import RecipeDetails from "../components/RecipeDetails";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetailsById } from "../store/recipesThunk";
import { AppDispatch } from "../store";


const RecipeDetailsPage = () => {
    const { recipeId } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const recipes = useSelector((state:any) => state.recipes.recipes);
    const loading = useSelector((state:any) => state.recipes.loading);
    const error = useSelector((state:any) => state.recipes.error);
    
    const convertIdToNumber = recipeId ? parseInt(recipeId, 10) : undefined;

    useEffect(() => {
        if(convertIdToNumber){
            dispatch(getRecipeDetailsById(convertIdToNumber));
        }
    }, [convertIdToNumber, dispatch]);


    return (
        <div>
             {!loading && <RecipeDetails recipes={recipes} />}
            {loading && <p className="font-bold text-red-500 text-center">loading...</p>}
            {error && <p className="font-bold text-red-500 text-center">{error}</p>}
        </div>
    )
};

export default RecipeDetailsPage;