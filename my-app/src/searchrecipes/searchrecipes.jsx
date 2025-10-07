import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addrecipe } from "../slices/singlerecipe";

const SearchRecipe = () => {
  const data = useSelector((state) => state.searchItems);
  const featuredRecipes = useSelector(
    (state) => state.recipeData.featuredrecipes
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      console.log("Search Data:", data);
    }
    if (featuredRecipes) {
      console.log("Featured Recipes:", featuredRecipes);
    }
  }, [data, featuredRecipes]);

  const displayData = useMemo(() => {
    if (data && data.length > 0) {
      return data;
    }
    return featuredRecipes || [];
  }, [data, featuredRecipes]);


  const featuredRecipesTitle = displayData === featuredRecipes;

  const sendData = (recipe) => {
    navigate(`/recipecard/${recipe.id}`);
    dispatch(addrecipe(recipe));
  };

  return (
    <div className="min-h-screen p-6">
      {featuredRecipesTitle && (
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-600">
          Featured Recipes
        </h1>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayData.length > 0 ? (
          displayData.map((recipe, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow p-6"
            >
              <h2 className="text-xl font-semibold mb-2">{recipe.name}</h2>
              <p className="text-gray-600 mb-4">{recipe.description}</p>

              <p className="text-gray-500 text-sm mb-4">
                <span className="font-semibold">Ingredients:</span>{" "}
                {recipe.ingredients.join(", ")}
              </p>

              <p className="text-gray-500 text-sm mb-4">
                <span className="font-semibold">Nutrition:</span>{" "}
                Calories: {recipe.nutrition.calories} kcal, Protein:{" "}
                {recipe.nutrition.protein}g, Carbs: {recipe.nutrition.carbs}g,
                Fat: {recipe.nutrition.fat}g.
              </p>

              <button
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-full transition-colors"
                onClick={() => sendData(recipe)}
              >
                View Recipe
              </button>
            </div>
          ))
        ) : (
            <>
            <p>Loading.....</p>
            </>
        )}
      </div>
    </div>
  );
};

export default SearchRecipe;
