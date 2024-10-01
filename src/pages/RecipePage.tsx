import SideBar from "../components/SideBar";
import RecipesList from "../components/recipeList";

const RecipePage = () => {
    return(
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-5 w-[97%] m-auto">
            <SideBar />

            <div className="col-span-1 md:col-span-1 lg:col-span-3 m-auto md:m-0 lg:m-0">
               <RecipesList />
            </div>
        </div>
    )
};

export default RecipePage;