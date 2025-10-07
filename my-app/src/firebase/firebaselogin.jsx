import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export const loginData = async (email, password) => {
  const firebaseRef = doc(db, "Recipesdata", email);
  const getData = await getDoc(firebaseRef);

  if (!getData.exists()) {
    console.log("No data found in Firebase");
    return { status: "failed" };
  }

  let  data = getData.data();

  

  if (data.Password === password) {
    return { status: "success", data ,email,password};
  } else {
    return { status: "failed" };
  }
};
