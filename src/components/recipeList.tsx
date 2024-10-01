import { DUMMY_MEALS } from "../constant/meals";

const RecipesList = () => {
    return (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DUMMY_MEALS.map((recipe) => (
                <li key={recipe.id}>
                    <div>
                        <img src={recipe.image} alt="food" />
                    </div>
                    <div>
                        <p>{recipe.name} </p>
                        <p>{recipe.recipe} </p>
                    </div>
                </li>
            ))}
        </ul>
    )
};

export default RecipesList;