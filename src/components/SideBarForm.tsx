import { SidebarProps } from "../store/types";



const SideBarForm = ({onCategoryClick, onReset } :SidebarProps) => {
    return (
        <form className="flex flex-col gap-4 py-6 pl-3 text-[14px] md:text-[16px] lg:text-[14px] xl:text-[15px] font-bold">
        <label className="py-[0.7rem] hover:bg-white hover:py-[0.7rem] hover:pl-3 hover:w-[80%] hover:rounded-lg">
            <input type="radio" name="recipe" value="All recipes" 
            className="w-4 h-[12.5px] " onClick={() => onReset()} /> All recipes
        </label>

        <label className="py-[0.7rem] hover:bg-white hover:py-[0.7rem] hover:pl-3 hover:w-[80%] hover:rounded-lg">
            <input type="radio" name="recipe" value="Vegetarian" 
            className="w-4 hh-[12.5px]" onClick={() => onCategoryClick('vegetarian')} /> Vegetarian
        </label>

        <label className="py-[0.7rem] hover:bg-white hover:py-[0.7rem] hover:pl-3 hover:w-[80%] hover:rounded-lg">
            <input type="radio" name="recipe" value="Gluten free" 
            className="w-4 h-[12.5px]" onClick={() => onCategoryClick('glutenFree')} /> Gluten free
        </label>

        <label className="py-[0.7rem] hover:bg-white hover:py-[0.7rem] hover:pl-3 hover:w-[80%] hover:rounded-lg">
            <input type="radio" name="recipe" value="Vegan" 
            className="w-4 h-[12.5px]" onClick={() => onCategoryClick('vegan')} /> Vegan
        </label>

        <label className="py-[0.7rem] hover:bg-white hover:py-[0.7rem] hover:pl-3 hover:w-[80%] hover:rounded-lg">
            <input type="radio" name="recipe" value="Paleo" 
            className="w-4 h-[12.5px]" onClick={() => onCategoryClick('dairyFree')} /> Dairy free
        </label>

        <label className="py-[0.7rem] hover:bg-white hover:py-[0.7rem] hover:pl-3 hover:w-[80%] hover:rounded-lg">
            <input type="radio" name="recipe" value="Indulge me" 
            className="w-4 h-[12.5px]" onClick={() => onCategoryClick('veryPopular')} /> Indulge me
        </label>
    </form>
    )
};

export default SideBarForm;