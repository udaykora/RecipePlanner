import { createSlice } from "@reduxjs/toolkit";


let singlerecipeData=createSlice({
    name:"singlerecipedata",
    initialState:{},
    reducers:{
        addrecipe : (state,action)=>{
            console.log(action.payload)
            
            return action.payload

        }
    }
})

export default singlerecipeData.reducer
export let {addrecipe} = singlerecipeData.actions
