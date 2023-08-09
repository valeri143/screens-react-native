import React from "react";
import { Text, View, Pressable } from "react-native";
import { styles } from "./PostsScreen.styled";
import { AntDesign } from "@expo/vector-icons";
import { Post } from "../Post/Post";
import { useRoute } from "@react-navigation/native";
import { selectEmail, selectLogin } from "../../redux/authSlice/selectors";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataFromFirestore } from "../helpers/firestoreFunc";
import {
  selectIsError,
  selectIsLoading,
} from "../../redux/postSlice/selectors";

export const PostsScreen = () => {
  const {
    params: {
      takenPhotoUri = null,
      postName = "",
      postLocation = "",
      location = null,
    } = {},
  } = useRoute();
  const email = useSelector(selectEmail);
  const login = useSelector(selectLogin);

  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  useEffect(() => {
    async function fetchPosts() {
      const posts = await getDataFromFirestore();
      console.log("GETTTTT DATAAA POST", posts);
      return posts;
    }
    fetchPosts();
  }, []);

  return (
    <View style={{ paddingTop: 32 }}>
      <View style={styles.container}>
        <View style={styles.imageContainer}></View>
        <Pressable>
          <AntDesign
            name="pluscircleo"
            size={24}
            color="#FF6C00"
            style={styles.imageAdd}
          />
        </Pressable>
        <View style={{ marginTop: "auto", marginBottom: "auto" }}>
          <Text>{login}</Text>
          <Text>{email}</Text>
        </View>
      </View>
      {takenPhotoUri !== null && (
        <Post
          postName={postName}
          takenPhotoUri={takenPhotoUri}
          postLocation={postLocation}
          location={location}
        />
      )}
    </View>
  );
};
