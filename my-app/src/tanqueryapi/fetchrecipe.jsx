import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { Recipesdata } from "../firebase/firebaserecipe";
import { addrecipes } from "../slices/recipedataslice";
import { addplanner } from "../slices/recipePlanner";

export const fetchRecipe = () => {
  const dispatch = useDispatch();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["recipedata"],
    queryFn: Recipesdata,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
   

    if (data) {
        console.log(data)
      dispatch(addrecipes(data));
    }

    
  }, [data]);

  return null; 
};
