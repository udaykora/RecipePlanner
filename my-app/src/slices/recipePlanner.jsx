import { createSlice, current } from "@reduxjs/toolkit";

let plannerSlice = createSlice({
  name: "plannerTable",
  initialState: [],
  reducers: {
    addplanner: (state, action) => {
     console.log(action.payload)
      return action.payload;
    },

    removeMeal: (state, action) => {
      
      const { dayIndex, updatedMeals } = action.payload;
      console.log(current(state)[dayIndex])
      state[dayIndex] = updatedMeals

    },
    addMeal:(state,action) => {
        const data = action.payload
        console.log(data)
        data.forEach((meal)=>{
            if (!state[meal[0]].includes(meal[1])){
                state[meal[0]].push(meal[1])
        }

        })
        

    }
  }
});

export default plannerSlice.reducer;
export let { addplanner, removeMeal , addMeal } = plannerSlice.actions;
