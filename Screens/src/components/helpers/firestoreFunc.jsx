import { collection, addDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../../config";

export const writeDataToFirestore = async (postData) => {
  try {
    await addDoc(collection(db, "posts"), postData);
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const getDataFromFirestore = async () => {
  try {
    const data = [];
    const posts = await getDocs(collection(db, "posts"));
    posts.forEach((doc) => {
      data.push({ id: doc.id, data: doc.data() });
    });

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const writeDataCommentToFirestore = async (comment) => {
  try {
    await addDoc(collection(db, "comments"), comment);
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const getDataCommentsFromFirestore = async () => {
  try {
    const data = [];
    const comments = await getDocs(collection(db, "comments"));
    comments.forEach((doc) => {
      data.push({ id: doc.id, data: doc.data() });
    });

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
