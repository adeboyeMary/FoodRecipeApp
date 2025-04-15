import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchAllFavorites } from "../store/recipesThunk";
import { Link } from "react-router-dom";


const FavoritePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector((state: RootState) => state.recipes.loading);
    const { favorites, error } =  useSelector((state: RootState) => state.favorites);
    const {isLoggedIn, token} =  useSelector((state: RootState) => state.auth);

    useEffect(()=> {
        if(isLoggedIn && token) {
            dispatch(fetchAllFavorites());
        }
    }, [dispatch, token, isLoggedIn]);

    if(favorites.length === 0 && isLoggedIn && !loading){
       return <p className="font-bold text-red-500 text-center mt-[7rem] ">No Favorites Available.</p>
    }


    return (
        <>
            {loading && <p className="font-bold text-red-500 text-center">Loading...</p>}
            {error && !loading && <p className="font-bold text-red-500 text-center">{error}</p>}
            
            {isLoggedIn ? (<ul className="text-center grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
            gap-5 w-[97%] m-auto">
                {favorites.map((fav) => (
                    <li key={fav.id}>
                        <Link to={`/${fav.id}`}>
                            <div>
                                <img src={fav.recipe.image} alt={fav.recipe.title} />
                            </div>
                            <div>
                                <p>{fav.recipe.title} </p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>) : (
                <p className="text-center font-bold text-[20px] mt-[5rem] ">Signin to see favorites. <Link to='/SignIn' 
                className="text-red-500 hover:text-red-400">
                        SignIn
                    </Link>
                </p>
            ) }
        </>
    )
};

export default FavoritePage;