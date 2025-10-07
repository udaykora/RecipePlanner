import React, { useEffect, useState, useMemo } from "react";
import { fetchRecipe } from "../tanqueryapi/fetchrecipe";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { addrecipe } from "../slices/singlerecipe";

const ViewRecipe = () => {
  const [filterdata, setFilterData] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  Types = ["All","Non-Veg","Veg"]
  const itemsperpage = 6;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector((state) => state.recipeData.recipes);

  useEffect(() => {
    if (data) {
      console.log("Recipes loaded:", data);
    }
  }, [data]);

  const sendData = (data1) => {
    dispatch(addrecipe(data1));
    navigate(`/recipecard/${data1.id}`);
  };

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (filterdata === "All") return data;
    return data.filter((recipe) =>
      filterdata === "Veg"
        ? recipe.type?.toLowerCase() === "veg"
        : recipe.type?.toLowerCase() === "non-veg"
    );
  }, [data, filterdata]);

  const totalPagesCount = Math.ceil(filteredData.length / itemsperpage);

  const currentPageData = useMemo(() => {
    const start = (currentPage - 1) * itemsperpage;
    return filteredData.slice(start, start + itemsperpage);
  }, [filteredData, currentPage]);

  const pageChangeFun = (page) => {
    if (page >= 1 && page <= totalPagesCount) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-500">
        Recipe Finder
      </h1>

      <div className="flex justify-center gap-4 mb-6">
        <Link
          to="/"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Dashboard
        </Link>
        <Link
          to="/planner"
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          Planner
        </Link>
      </div>

      <div className="flex justify-center gap-4 mb-6">
        {Types.map((type) => (
          <label key={type} className="text-gray-500">
            <input
              type="radio"
              value={type}
              checked={filterdata === type}
              onChange={() => {
                setFilterData(type);
                setCurrentPage(1);
              }}
              className="mr-2"
            />
            {type}
          </label>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentPageData.length > 0 ? (
          currentPageData.map((recipe, index) => (
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
                <span className="font-semibold">Nutrition:</span> Calories:{" "}
                {recipe.nutrition.calories} kcal, Protein:{" "}
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
          <p className="text-center">No recipes found</p>
        )}
      </div>

      {filteredData.length > itemsperpage && (
        <div className="flex justify-center items-center mt-8 gap-2">
          <button
            className="px-3 py-1 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
            onClick={() => pageChangeFun(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {[...Array(totalPagesCount)].map((_, i) => (
            <button
              key={i}
              onClick={() => pageChangeFun(i + 1)}
              className={`px-3 py-1 rounded-lg transition ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="px-3 py-1 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
            onClick={() => pageChangeFun(currentPage + 1)}
            disabled={currentPage === totalPagesCount}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewRecipe;

