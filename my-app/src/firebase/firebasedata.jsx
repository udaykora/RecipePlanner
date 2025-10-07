import { db } from "../firebase";
import { doc, getDoc, setDoc,updateDoc ,arrayUnion  } from "firebase/firestore";

// export const PlannerData = async () => {
//   const planner = doc(db, "Recipesdata", "udaykora777@gmail.com");
//   const getData = await getDoc(planner);

//   if (!getData.exists()) {
//     return { recipePlanner: [] };
//   }

//   return getData.data();
// };




export const updateDayMeals = async (dayIndex, meals,Email) => {
  const plannerRef = doc(db, "Recipesdata", Email);

  const fieldToUpdate = `recipePlanner.${dayIndex}`;

  await updateDoc(plannerRef, {
    [fieldToUpdate]: meals
  });

  return meals;
};






export const updateDayMealsMultiple = async (mealsArray,Email) => {
  const plannerData = doc(db, "Recipesdata", Email);

  const updatedDays = {};

  mealsArray.forEach(([dayIndex, mealName]) => {
    const fieldToUpdate = `recipePlanner.${dayIndex}`;
    updatedDays[fieldToUpdate] = arrayUnion(mealName);
  });

  await updateDoc(plannerData, updatedDays);

  const updatedPlannerSnap = await getDoc(plannerData);
  return updatedPlannerSnap.data().recipePlanner;
};