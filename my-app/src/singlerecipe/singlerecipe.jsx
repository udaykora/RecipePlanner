import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateDayMeals, useUpdateDayMealsMultiple } from "../tanqueryapi/tanquermutation";
import { useNavigate } from "react-router-dom";
import { addMeal } from "../slices/recipePlanner";

const RecipeCard = () => {
  const updateDayMealsMutation = useUpdateDayMeals();
  const dispatch = useDispatch()

  const multipledataArray = useUpdateDayMealsMultiple();

  const data = useSelector((state) => state.addrecipe);
  const plannerData = useSelector((state) => state.plannerSlice);

  const loginStatus = useSelector((state) => state.logindata.status);
    const loginEmail = useSelector((state) => state.logindata.email);

  const navigate = useNavigate();

  const [showDays, setShowDays] = useState(false);

  const [selectedDays, setSelectedDays] = useState([]);

  const [completedatameal, setCompletedAtMeal] = useState([]);

  useEffect(() => {
    console.log("Recipe data:", data);
    console.log(plannerData);
  }, [data]);

  if (!data) {
    return <p className="text-center mt-6">No recipe selected.</p>;
  }

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleAddToMealPlan = () => {
    if (!loginStatus) {
      navigate("/login");
      return;
    }
    setShowDays(!showDays);
  };

  const toggleDay = (day, index) => {
    const mealplan = [index, data.name];

    setCompletedAtMeal((prev) => {
      const exists = prev.some(
        (item) => item[0] === index && item[1] === data.name
      );
      if (exists) {
        return prev.filter(
          (item) => !(item[0] === index && item[1] === data.name)
        );
      } else {
        return [...prev, mealplan];
      }
    });

    setSelectedDays((prev) => {
      const exists = prev.some((d) => d.name === day);
      if (exists) {
        return prev.filter((d) => d.name !== day);
      } else {
        return [...prev, { name: day, index }];
      }
    });
  };

  const datasend = () => {
    console.log(completedatameal)
    multipledataArray.mutate({completedatameal,email:loginEmail});
    dispatch(addMeal(completedatameal))

    setSelectedDays([]);
    setShowDays(false);
    navigate("/Viewrecipes")
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-3 text-center text-amber-50">
        Recipe Finder
      </h1>

      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold">{data.name}</h2>
          <p className="text-gray-600">
            {data.description || "No description available."}
          </p>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
          <ul className="list-disc list-inside text-gray-700">
            {data.ingredients && data.ingredients.length > 0 ? (
              data.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))
            ) : (
              <li>No ingredients available</li>
            )}
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Steps</h3>
          <ol className="list-decimal list-inside text-gray-700 space-y-1">
            {data.steps && data.steps.length > 0 ? (
              data.steps.map((step, index) => <li key={index}>{step}</li>)
            ) : (
              <li>No steps available</li>
            )}
          </ol>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">
            Nutrition Information
          </h3>
          <div className="grid grid-cols-2 gap-4 text-gray-700">
            <div>
              Calories:{" "}
              <span className="font-medium">
                {data.nutrition?.calories || "-"}
              </span>
            </div>
            <div>
              Protein:{" "}
              <span className="font-medium">
                {data.nutrition?.protein || "-"}
              </span>
            </div>
            <div>
              Carbs:{" "}
              <span className="font-medium">
                {data.nutrition?.carbs || "-"}
              </span>
            </div>
            <div>
              Fat:{" "}
              <span className="font-medium">{data.nutrition?.fat || "-"}</span>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={handleAddToMealPlan}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-full transition-colors"
          >
            Add to Meal Plan
          </button>

          {showDays && (
            <div
              className="mt-4 flex flex-wrap gap-2 justify-center overflow-hidden"
              style={{ maxHeight: "120px" }}
            >
              {daysOfWeek.map((day, index) => (
                <button
                  key={day}
                  onClick={() => toggleDay(day, index)}
                  className={`px-3 py-1 rounded-lg text-white ${
                    selectedDays.some((d) => d.name === day)
                      ? "bg-green-600"
                      : "bg-gray-500 hover:bg-gray-600"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          )}

          {selectedDays.length > 0 && (
            <div className="mt-4">
              <p className="text-green-600 font-medium mb-2">
                Recipe added to:{" "}
                <strong>{selectedDays.map((d) => d.name).join(", ")}</strong>
              </p>
              <button
                onClick={datasend}
                className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-full transition-colors"
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
