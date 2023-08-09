import { collection, addDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../../config";

export const writeDataToFirestore = async (postData) => {
  console.log("ADDDDDDD DOCC POST", postData);
  try {
    const docRef = await addDoc(collection(db, "posts"), postData);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const getDataFromFirestore = async () => {
  try {
    const snapshot = await getDocs(collection(db, "posts"));
    // Перевіряємо у консолі отримані дані
    snapshot.forEach((doc) => console.log(`${doc.id} =>`, doc.data()));
    // Повертаємо масив обʼєктів у довільній формі
    const posts = snapshot.map((doc) => ({ id: doc.id, data: doc.data() }));
    console.log("POOOOST", posts);
    return posts;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateDataInFirestore = async (collectionName, docId) => {
  try {
    const ref = doc(db, collectionName, docId);

    await updateDoc(ref, {
      age: 25,
    });
    console.log("document updated");
  } catch (error) {
    console.log(error);
  }
};
