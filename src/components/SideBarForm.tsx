import { SidebarProps } from "../store/types";



const SideBarForm = ({onCategoryClick, onReset } :SidebarProps) => {
    return (
        <form className="flex flex-col gap-4 py-6 pl-3 text-[19px] md:text-[24px] lg:text-[19px] font-bold">
        <label className="py-[0.7rem] hover:bg-white hover:py-[0.7rem] hover:pl-3 hover:w-[50%] hover:rounded-lg">
            <input type="radio" name="recipe" value="All recipes" 
            className="w-4 h-4" onClick={() => onReset()} /> All recipes
        </label>

        <label className="py-[0.7rem] hover:bg-white hover:py-[0.7rem] hover:pl-3 hover:w-[50%] hover:rounded-lg">
            <input type="radio" name="recipe" value="Vegetarian" 
            className="w-4 h-4" onClick={() => onCategoryClick('vegetarian')} /> Vegetarian
        </label>

        <label className="py-[0.7rem] hover:bg-white hover:py-[0.7rem] hover:pl-3 hover:w-[50%] hover:rounded-lg">
            <input type="radio" name="recipe" value="Gluten free" 
            className="w-4 h-4" onClick={() => onCategoryClick('glutenFree')} /> Gluten free
        </label>

        <label className="py-[0.7rem] hover:bg-white hover:py-[0.7rem] hover:pl-3 hover:w-[50%] hover:rounded-lg">
            <input type="radio" name="recipe" value="Vegan" 
            className="w-4 h-4" onClick={() => onCategoryClick('vegan')} /> Vegan
        </label>

        <label className="py-[0.7rem] hover:bg-white hover:py-[0.7rem] hover:pl-3 hover:w-[50%] hover:rounded-lg">
            <input type="radio" name="recipe" value="Paleo" 
            className="w-4 h-4" onClick={() => onCategoryClick('dairyFree')} /> Dairy free
        </label>

        <label className="py-[0.7rem] hover:bg-white hover:py-[0.7rem] hover:pl-3 hover:w-[50%] hover:rounded-lg">
            <input type="radio" name="recipe" value="Indulge me" 
            className="w-4 h-4" onClick={() => onCategoryClick('veryPopular')} /> Indulge me (popular)
        </label>
    </form>
    )
};

export default SideBarForm;