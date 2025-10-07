import { createSlice } from "@reduxjs/toolkit";


let recipeData=createSlice({
    name:"recipedata",
    initialState:{},
    reducers:{
        addrecipes : (state,action)=>{
            console.log("hello")
            console.log(action.payload)
            return action.payload

        }
    }
})

export default recipeData.reducer
export let {addrecipes} = recipeData.actions
