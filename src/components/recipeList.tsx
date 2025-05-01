import { useState } from "react";
import { Link } from "react-router-dom";
import {Star} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {  Recipe  } from "../store/types";
import { addRecipeToFavorite } from "../store/recipesThunk";
import { AppDispatch, RootState } from "../store";
import Modal from "../ui/Modal";


type RecipeListProps = {
    //array of recipe objects.
    filteredRecipes: Recipe[];  
};

const RecipesList = ({filteredRecipes}: RecipeListProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const favorites = useSelector((state: RootState) => state.favorites?.favorites || [] );
    const error = useSelector((state: RootState) => state.recipes.error);
    const {isLoggedIn, token} = useSelector((state: RootState) => state.auth);
    const [showAuthModal, setShowAuthModal] = useState<boolean>(false);   

    const addToFavoriteHandler = (recipeId: string) => {
        if(!isLoggedIn && !token ) {
            setShowAuthModal(true);
        } else {
            dispatch(addRecipeToFavorite(recipeId));
        }
    };

    const closeModalHandler = () => {
        setShowAuthModal(false);
    };
    
    return (
        <div>
            {error && <p>{error} </p>}
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {filteredRecipes.map((recipe) => {
                const isFavorite = favorites.some((fav: any) => fav.recipe.id === recipe.id);
                return (
                    <li key={recipe.title}>
                        <Link to={`/${recipe.id}`}>
                            <div>
                                <img src={recipe.image} alt={recipe.title} />
                            </div>
                        </Link>
                        <div>
                            <div className="flex gap-1 justify-between">
                                <p className="font-bold text-[15px] lg:text-[15px] italic mt-2 ">{recipe.title} </p>
                                <button onClick={() => addToFavoriteHandler(recipe.id)} className="" >
                                    <Star color='#005f73' size={18}
                                    className={ isFavorite ? 'fill-[#005f73]' : 'fill-none'}  />
                                </button> 
                            </div>
                            <p className="font-bold text-[11px] italic ">Vegan: {recipe.vegan.toString() }, 
                                Vegetarian: {recipe.vegetarian.toString() }, Gluten free: {recipe.glutenFree.toString()}, 
                                Diary free: {recipe.dairyFree.toString()}
                            </p>
                        </div>

                        {showAuthModal && (
                            <Modal onHideOverlay={closeModalHandler} >
                                <h1 className="bg-[#005f73] text-white text-xl font-bold lg:p-4 
                                    p-2 rounded-t-md ">
                                        Notice
                                </h1>
                                <div className="bg-[#D9D9D9] p-5 rounded-b-md shadow-lg">
                                    <p className="text-[#005f73] text-[12px] lg:text-lg font-bold mb-4" >
                                        Proceed to Signin to add recipe to favorite. 
                                    </p>
                                    <div className="flex gap-5">
                                        <Link to='/SignIn' className="border-solid border-[1px] border-[#005f73] 
                                            text-[#005f73] px-3 py-1 lg:px-4 lg:py-2 rounded-md
                                            hover:bg-[#005f73] hover:text-white transition">
                                                SignIn
                                        </Link>

                                        <button onClick={closeModalHandler} className="bg-[#005f73] text-white 
                                            px-3 py-1 lg:px-4 lg:py-2 rounded-md hover:bg-transparent border-solid 
                                            border-[1px] border-[#005f73] hover:text-[#005f73] transition">
                                                Close
                                        </button>
                                    </div>
                                </div>
                            </Modal>
                        )}
                    </li>
                );
            })} 
        </ul>
        </div>
    )
};

export default RecipesList;