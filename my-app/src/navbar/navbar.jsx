import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SearchRecipe from "../searchrecipes/searchrecipes";
import { fetchRecipe } from "../tanqueryapi/fetchrecipe";
import { useDispatch, useSelector } from "react-redux";
import { addItems } from "../slices/searchdataslice";
import { logOut } from "../slices/logindata";
import { addbg } from "../slices/togglebackground";

const Navbar = () => {
    fetchRecipe()
    

  const dispatch = useDispatch();

  const loginStatus = useSelector((state) => state.logindata.status);

  const userEmail = useSelector((state) => state.logindata.email);

  const allRecipes = useSelector((state) => state.recipeData.recipes);
  const theme = useSelector((state) => state.togglebg.color);

  const filteredItems = (e) => {
    if (e.target.value){
         const filteredData = allRecipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    dispatch(addItems(filteredData));

    }else {
        dispatch(addItems([]))
    }
   
  };

  const logoutFun = () => {
    dispatch(logOut());
  };

  const themeFun = () => {
    dispatch(addbg());
  };

  return (
    <>
      <header className="w-full shadow-md sticky  z-50 rounded-sm">
        <div className="  flex items-center justify-between px-6 py-3 bg-amber-50">
          
         
          <div className="flex-1 mx-6">
            <input
              type="text"
              placeholder="Search recipes..."
              onChange={filteredItems}
              className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

        
          <nav className="flex items-center gap-4">
            
           
            {loginStatus ? (
              <>
                <span className="text-gray-600 font-medium">{userEmail}</span>
                <button
                  onClick={logoutFun}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </Link>
            )}

           
            <Link
              to="/Viewrecipes"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              View Recipes
            </Link>

            
            <Link
              to="/planner"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              View Planner
            </Link>

           
            <button
              onClick={themeFun}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
            >
              {theme === "theme-dark" ? "Light Mode" : "Dark Mode"}
            </button>
          </nav>
        </div>
      </header>

    
      <SearchRecipe />
    </>
  );
};

export default Navbar;
