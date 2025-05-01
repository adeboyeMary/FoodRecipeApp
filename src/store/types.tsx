export type Ingredient = {
    id: number;
    aisle: string;
    image: string;
    consistency: string;
    name: string;
    nameClean: string;
    original: string;
    originalName: string;
    amount: number;
    unit: string;
    meta: string[];
    measures: {
        us: {
            amount: number;
            unitShort: string;
            unitLong: string;
        };
        metric: {
            amount: number;
            unitShort: string;
            unitLong: string;
        };
    };
};

export type Recipe = {
    id: string,
    title: string,
    image: string,
    loading: boolean,
    summary: string,
    dishTypes: [string],
    readyInMinutes: number,
    servings: number,
    dairyFree: boolean,
    glutenFree: boolean,
    vegan: boolean,
    vegetarian: boolean,
    veryPopular: boolean,
    veryHealthy: boolean,
    extendedIngredients: Ingredient[];
};

export type RecipeState = {           //the state's type
    recipes: Recipe[],
    filteredRecipes: Recipe[],
    // favorites: Favorite[],
    loading: boolean,
    error: string | null,
    // id: number
}

export type Favorite = {
    id: string;
    // title: string;
    // image: string;
    recipe: {
        id: string,
        title: string;
        image: string;
      }; // Here is the nested recipe object
}

export type FavoriteState = {           //the state's type
    favorites: Favorite[],
    loading: boolean,
    error: string | null,
}

export type ApiFavorite = {
    id: string;
    // title: string;
    //     image: string;
    recipe: {
        id: string;
        title: string;
        image: string;
        // summary: string;
    };
};

// export type Favorite = {
//     id: string;
//     recipe: Recipe; // Here is the nested recipe object
// }

export type User = {
    username: string;
    // password: string;
    id?: string;
  }

export type SidebarProps = {
    onCategoryClick: (category: keyof Recipe) => void;
    onReset: () => void;
  }

