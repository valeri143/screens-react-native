// import {
//   fetchPostsFailure,
//   fetchPostsStart,
//   fetchPostsSuccess,
// } from "./postSlice";
// import { collection, getDocs, addDoc, updateDoc } from "firebase/firestore";
// import { db } from "../../../config";
// import { useDispatch } from "react-redux";

// export const fetchPosts = async () => {
//   const dispatch = useDispatch();
//   try {
//     dispatch(fetchPostsStart());
//     const snapshot = await getDocs(collection(db, "posts"));
//     const posts = [];
//     snapshot.forEach((doc) => {
//       posts.push({ id: doc.id, ...doc.data() });
//     });
//     dispatch(fetchPostsSuccess(posts));
//   } catch (error) {
//     dispatch(fetchPostsFailure(error.message));
//   }
// };

// export const addPost = async (postData) => {
//   const dispatch = useDispatch();
//   try {
//     const postsCollection = collection(db, "posts");
//     await addDoc(postsCollection, postData);

//     dispatch(fetchPosts());
//   } catch (error) {
//     dispatch(fetchPostsFailure(error.message));
//   }
// };

//   export const updateDataInFirestore = async (collectionName, docId) => {
//     try {
//       const ref = doc(db, collectionName, docId);

//       await updateDoc(ref, {
//         age: 25,
//       });
//       console.log("document updated");
//     } catch (error) {
//       console.log(error);
//     }
//   };
