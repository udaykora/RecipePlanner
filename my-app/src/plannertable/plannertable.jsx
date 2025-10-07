import React, { useEffect, useState } from "react";
import { useUpdateDayMeals } from "../tanqueryapi/tanquermutation";
import { useDispatch, useSelector } from "react-redux";
import { removeMeal } from "../slices/recipePlanner";
import { Link } from "react-router-dom";

const PlannerData = () => {
  const dispatch = useDispatch();
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const data = useSelector((state) => state.plannerSlice);
  const loginEmail = useSelector((state) => state.logindata.email);

  const updateDayMealsMutation = useUpdateDayMeals();
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const plannerData = data || [];

  const removeMealFun = (dayIndex, mealIndex) => {
    if (!plannerData[dayIndex]) return;
    const updatedMeals = plannerData[dayIndex].filter((_, index) => index !== mealIndex);
    dispatch(removeMeal({ dayIndex, updatedMeals }));
    updateDayMealsMutation.mutate({ dayIndex, meals: updatedMeals, email: loginEmail });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <div className="flex gap-4">
        <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Dashboard
        </Link>
        <Link to="/Viewrecipes" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          View Recipes
        </Link>
      
      </div>

      <div className="max-w-4xl w-full bg-white shadow-lg p-6 rounded-lg flex gap-6">
        <div className="w-1/4 border-r border-gray-200 pr-4">
          <h2 className="font-bold text-lg mb-4 text-center">Days</h2>
          <ul className="space-y-2">
            {days.map((day, index) => (
              <li
                key={index}
                className={`p-2 text-center rounded cursor-pointer ${
                  selectedDayIndex === index
                    ? "bg-blue-100 font-bold"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
                onClick={() => setSelectedDayIndex(index)}
              >
                {day}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-3/4 pl-4">
          <h2 className="font-bold text-lg mb-4 text-center">
            Meals for {days[selectedDayIndex]}
          </h2>

          <div className="space-y-2">
            {(plannerData[selectedDayIndex] || []).map((meal, index) => (
              <div
                key={index}
                className="bg-gray-50 p-4 rounded shadow flex items-center justify-between"
              >
                <span>{meal}</span>
                <button
                  className="text-red-500 hover:text-red-700 font-bold"
                  onClick={() => removeMealFun(selectedDayIndex, index)}
                >
                  &times;
                </button>
              </div>
            ))}
            {(!plannerData[selectedDayIndex] ||
              plannerData[selectedDayIndex].length === 0) && (
              <p className="text-gray-500 text-center">
                No meals planned for this day.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlannerData;
