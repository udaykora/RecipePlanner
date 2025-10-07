import { createSlice, current } from "@reduxjs/toolkit";


let loginData = createSlice({
    name:"loginData",
    initialState:{email:null,password:null,status:null},
    reducers:{
        login: (state,action)=>{
            state.email = action.payload.email
            state.password = action.payload.password
            state.status = true
            console.log(current(state))
        },
        logOut: (state,action)=>{
            state.email = null,
            state.password = null,
            state.status = null
        }
    }
})

export default loginData.reducer;
export let {login,logOut} = loginData.actions;