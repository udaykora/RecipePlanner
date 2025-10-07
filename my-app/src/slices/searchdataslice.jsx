import { createSlice } from "@reduxjs/toolkit";

let searchItems = createSlice({
    name:"search",
    initialState:{},
    reducers:{

        addItems:(state,action)=>{
            if (action.payload==[]) return []
            console.log(action.payload)
            return action.payload
        }
    }
})

export default searchItems.reducer
export let {addItems}=searchItems.actions