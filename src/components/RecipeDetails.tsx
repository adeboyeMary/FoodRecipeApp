import { Recipe } from "../store/types";
// type Recipe = {
//     id: number,
//     title: string,
//     image: string,
//     summary: string,
//     extendedIngredients: string[];
// };

const stripHtmlTags = (html: string) => {
    return html.replace(/<[^>]*>/g, ''); // Remove everything between angle brackets
};

type RecipeDetailsProps = {
    //array of recipe objects.
    recipes: Recipe[];  
};

const RecipeDetails = ({recipes}: RecipeDetailsProps) => {
    if (!recipes || recipes.length === 0) {
        return <p>No recipe details found.</p>
    }

    
    return (
        <ul className="p-4">
            {recipes.map((recipe) => (
                <li key={recipe.id}>
                    <div className="w-[99%] m-auto lg:w-[88%] lg:m-0 ">
                        <div className="flex flex-col lg:flex-row " >
                            <div className="lg:w-[40%] ">
                                <img src={recipe.image} alt="food" className="lg:w-[78%] md:m-auto lg:m-auto "/>
                            </div>
                            <div className="lg:w-[60%] ">
                                <h1 className="font-bold text-[26px] mt-[1rem] lg:text-[32px] lg:mt-[1rem] xl:mt-[1.3rem] ">
                                    {recipe.title} 
                                </h1>
                                <p>Give your loved ones more reasons to love with this flavorful {recipe.title} 
                                    recipe that can be enjoyed anytime of the day. 
                                </p>
                                <div className="flex flex-row gap-[1rem] mt-[0.1rem] lg:mt-2 ">
                                    <p className="font-bold ">Course:</p>
                                    <p className="gap-2">{recipes[0].dishTypes.join(', ') } </p>
                                </div>
                                <div className="flex flex-row gap-[1rem] mt-0 lg:mt-1 ">
                                    <p className="font-bold ">Prep Time:</p>
                                    <p className="gap-2">{recipe.readyInMinutes} minutes</p>
                                </div>
                                <div className="flex flex-row gap-[1rem] mt-0 lg:mt-1 ">
                                    <p className="font-bold ">Cook Time:</p>
                                    <p className="gap-2">{recipe.readyInMinutes} minutes </p>
                                </div>
                                <div className="flex flex-row gap-[1rem] mt-0 lg:mt-1 ">
                                    <p className="font-bold ">Servings:</p>
                                    <p className="gap-2">{recipe.servings} </p>
                                </div>
                            </div>
                        </div>

                        <p className="mt-[0.8rem] lg:ml-[3rem] lg:mt-[2rem] ">{stripHtmlTags(recipe.summary)} </p>
                        <div className="lg:ml-[3rem] lg:mt-[0.8rem] ">
                            <p className="font-bold text-[18px] lg:text-[18px] ">Ingredients.</p>
                            {recipe.extendedIngredients.map((ingredient) => (
                                <li key={ingredient.id} className="list-disc ml-[2.5rem] lg:ml-[2.8rem] " >
                                    <p>{ingredient.amount}{ingredient.unit} of {ingredient.name}</p>
                                    {/* <p>Consistency: {ingredient.consistency}</p> */}
                                </li>
                            ))}
                        </div>

                    </div>
                    
                </li>
            ))}
        </ul>
    )
};

export default RecipeDetails;