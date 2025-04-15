import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import RecipesList from "../components/recipeList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { getAllRecipes } from "../store/recipesThunk";
import { Recipe } from "../store/types";
import { filterRecipes, resetFilter } from "../store/recipeSlice";


const RecipePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { recipes, loading, error, filteredRecipes } = useSelector((state: RootState) => state.recipes);

    useEffect(() => {
        dispatch(getAllRecipes());
    }, [dispatch]);

    const categoryClickHandler = (category: keyof Recipe) => {
        dispatch(filterRecipes(category))
    };
   
    if(!Array.isArray){
        return <p>No recipes found.</p>
    }

    return(
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-5 w-[97%] m-auto">
            <SideBar onCategoryClick={categoryClickHandler} onReset={() => dispatch(resetFilter())} />

            <div className="col-span-1 md:col-span-1 lg:col-span-3 m-auto md:m-0 lg:m-0">
                {}
               {loading ? (<p className="font-bold text-red-500 text-center mt-[10rem]">Loading...</p>):(
                <RecipesList filteredRecipes={filteredRecipes.length > 0 ? filteredRecipes : recipes } />
               )}
               {error && <p className="font-bold text-red-500 text-center mt-[10rem]">{error}</p>}
            </div>
        </div>
    )
};

export default RecipePage;