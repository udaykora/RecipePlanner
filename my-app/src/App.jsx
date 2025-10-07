import { useState } from 'react'

import './App.css'

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,

  Outlet
} from "react-router-dom";
import { useEffect } from 'react';


import PlannerData from './plannertable/plannertable';
import ViewRecipe from './viewrecipes/viewrecipes';
import RecipeCard from './singlerecipe/singlerecipe';
import Login from './loginpage/loginpage';
import Navbar from './navbar/navbar';
import ProtectRoutes from './Protectedroutes/protectedroute';
import asd from './xp';
import { useSelector } from 'react-redux';




function App() {
  const bgcolor =useSelector((state)=>state.togglebg.color)

 
  return (
   
   
   
<div className={bgcolor}>
<Router>
  <Routes>
    <Route path = "/" element = {<Navbar/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path = '/Viewrecipes' element = {<ViewRecipe/>}></Route>
     <Route element = {<ProtectRoutes/>}>
      <Route path='/planner' element={<PlannerData/>}></Route>
     </Route>
    
     <Route path='/recipeCard/:id' element={<RecipeCard/>}></Route>
  </Routes>
</Router>
</div>
     
    
  );
}


export default App
