import React, { useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { useLoginMutation } from "../tanqueryapi/tanquerylogin";
import { useSelector } from "react-redux";
import "./loginpage.css";

const Login = () => {
 const location = useLocation();
 const loginStatus  =useSelector((state)=>state.logindata.status)
 console.log(loginStatus)
 const from = location.state?.from?.pathname || "/";


 useEffect(() => {
  document.body.classList.add("theme-orange");
 
}, []);


  let login =useLoginMutation()
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [assign, setAssign] = useState(false);
  const [temp, setTemp] = useState(false);

   useEffect(()=>{
        
    },[loginStatus])


  const handleSubmit = async (e) => {
    console.log("hello")
    e.preventDefault();
    login.mutate({ email,password});
    
    
    setTemp(true);

   
    
    setTimeout(() => {
      if (loginStatus==false) {
        setUserMessage("Invalid credentials. Try again.");
        setAssign(true);
        setTemp(false);
        setTimeout(() => setAssign(false), 3000);
      } else {
           navigate(from, { replace: true });
        
      }
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen mb-2  ">
      <div className="w-full max-w-md  shadow-lg rounded-2xl p-8 bg-[#fafafa]">
       

        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={temp}
            className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-200 disabled:opacity-50"
          >
            {temp ? "Logging in..." : "Log In"}
          </button>
        </form>

        {assign && (
          <p className="mt-4 text-center text-red-500 text-sm">{userMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
