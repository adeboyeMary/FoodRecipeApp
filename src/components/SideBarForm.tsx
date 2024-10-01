const SideBarForm = () => {
    return (
        <form className="flex flex-col gap-4 py-6 pl-3 text-[19px] md:text-[24px] lg:text-[19px] font-bold">
        <label className="hover:bg-white pb-2 hover:py-[0.7rem] hover:pl-3 hover:w-[50%] hover:rounded-lg">
            <input type="radio" name="recipe" value="All recipes" 
            className="w-4 h-4" /> All recipes
        </label>

        <label className="hover:bg-white hover:py-[0.7rem] hover:pl-3 hover:w-[50%] hover:rounded-lg">
            <input type="radio" name="recipe" value="Vegetarian" 
            className="w-4 h-4" /> Vegetarian
        </label>

        <label className="hover:bg-white hover:py-[0.7rem] hover:pl-3 hover:w-[50%] hover:rounded-lg">
            <input type="radio" name="recipe" value="Vegan" 
            className="w-4 h-4" /> Vegan
        </label>

        <label className="hover:bg-white hover:py-[0.7rem] hover:pl-3 hover:w-[50%] hover:rounded-lg">
            <input type="radio" name="recipe" value="Gluten free" 
            className="w-4 h-4" /> Gluten free
        </label>

        <label className="hover:bg-white hover:py-[0.7rem] hover:pl-3 hover:w-[50%] hover:rounded-lg">
            <input type="radio" name="recipe" value="Paleo" 
            className="w-4 h-4" /> Paleo
        </label>

        <label className="hover:bg-white hover:py-[0.7rem] hover:pl-3 hover:w-[50%] hover:rounded-lg">
            <input type="radio" name="recipe" value="Indulge me" 
            className="w-4 h-4" /> Indulge me
        </label>
    </form>
    )
};

export default SideBarForm;