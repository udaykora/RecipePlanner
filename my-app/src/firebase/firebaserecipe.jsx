import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";


export const Recipesdata = async () => {
  const firebaseRef = doc(db, "Recipesdata", "documentData");
  const getData = await getDoc(firebaseRef);

  if (!getData.exists()) {
    return { recipePlanner: [] };
  }

  console.log(getData.data())

  return getData.data();
};