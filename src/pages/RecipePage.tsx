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
	const [currentPage, setCurrentPage] = useState<number>(1);

    // const itemsPerPage = 6;
    console.log(filteredRecipes, '............filteredRecipes.........');
	// const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);

    useEffect(() => {
        dispatch(getAllRecipes());
    }, [dispatch]);

    const categoryClickHandler = (category: keyof Recipe) => {
        dispatch(filterRecipes(category))
    };

    // const startIndex = (currentPage - 1) * itemsPerPage;
	// const endIndex = startIndex + itemsPerPage;
	// const currentRecipes = filteredRecipes.slice(startIndex, endIndex);

	// const pageChangeHandler = (newPage: any) => {
	// 	if(newPage > 0 && newPage <= totalPages ){
	// 		setCurrentPage(newPage);
	// 	}
	// 	console.log(currentRecipes, '...........');
	// };

    if(!Array.isArray(recipes) || recipes.length === 0){
        return <p>No recipes found.</p>
    }

    return(
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-5 w-[91%] m-auto">
            <SideBar onCategoryClick={categoryClickHandler} onReset={() => dispatch(resetFilter())} />

            <div className="col-span-1 md:col-span-1 lg:col-span-3 m-auto md:m-0 lg:m-0">
                {}
               {loading ? (<p className="font-bold text-red-500 text-center mt-[10rem]">Loading...</p>):(
                <RecipesList filteredRecipes={filteredRecipes.length > 0 ? filteredRecipes : recipes } />
                // <RecipesList filteredRecipes={currentRecipes} />
               )}
               {error && <p className="font-bold text-red-500 text-center mt-[10rem]">{error}</p>}
            </div>

            {/* <div className="flex">
				<div className="flex flex-row gap-5 w-full pt-[1rem] lg:pt-[0.3rem] justify-center items-center">
					<button
						onClick={() => pageChangeHandler(currentPage - 1)}
						disabled={currentPage === 1}
						className="bg-transparent text-[#FF2A63] border-[#FF2A63] "
					>
						Previous
					</button>

					<div className="border border-solid border-[#FF2A63] px-4 py-1">
						{currentPage}
					</div>

					<button
						onClick={() => pageChangeHandler(currentPage + 1)}
						disabled={currentPage === totalPages}
						className="bg-[#FF2A63] text-white border-[#FF2A63] px-2 py-1 rounded-sm"
					>
						Next
					</button>
				</div>
			</div> */}
        </div>
    )
};

export default RecipePage;