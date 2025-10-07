import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDayMeals  , updateDayMealsMultiple} from "../firebase/firebasedata"; 

export const useUpdateDayMeals = () => {
  const queryClient = useQueryClient();

  console.log("hello its working"); 

  return useMutation({
    mutationFn: ({ dayIndex, meals,email }) => {
      console.log(email)
      return updateDayMeals(dayIndex, meals,email); 
    },
    // onSuccess: () => {
    //   console.log("working");
    //   queryClient.invalidateQueries(["planner"]); 
    // },
    onError: (error) => {
      console.error("Mutation failed:", error);
    },
  });
};


export const useUpdateDayMealsMultiple = () => {
  const queryClient = useQueryClient();

   

  return useMutation({
    mutationFn: ({completedatameal,email}) => {
    
      return updateDayMealsMultiple(completedatameal,email); 
    },
    // onSuccess: () => {
    //   console.log("working");
    //   queryClient.invalidateQueries(["planner"]); 
    // },
    onError: (error) => {
      console.error("Mutation failed:", error);
    },
  });
};
