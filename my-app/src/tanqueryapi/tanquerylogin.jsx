import { useMutation } from "@tanstack/react-query";
import { loginData } from "../firebase/firebaselogin";
import { addplanner } from "../slices/recipePlanner";
import { useDispatch } from "react-redux";
import { login } from "../slices/logindata";
export const useLoginMutation = () => {
    const dispatch = useDispatch()
  return useMutation({
    mutationFn: ({ email, password }) => loginData(email, password),
    onSuccess: (data) => {
        console.log(data)
        if (data.status == 'success'){
            dispatch(addplanner(data.data.recipePlanner))
            dispatch(login({email:data.email,password:data.password}))
        }
      console.log("Login success:", data.password);
      
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};
