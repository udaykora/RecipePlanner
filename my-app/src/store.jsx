import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import plannerSlice from "./slices/recipePlanner"
import recipeData from "./slices/recipedataslice";
import addRecipe from "./slices/singlerecipe"
import logindata from "./slices/logindata"
import searchItems from "./slices/searchdataslice"
import togglebg from "./slices/togglebackground"
let Store = configureStore({
    reducer:{

        plannerSlice:plannerSlice,
        recipeData:recipeData,
        addrecipe:addRecipe,
        logindata:logindata,
        searchItems:searchItems,
        togglebg:togglebg
       
    }
})


export default Store