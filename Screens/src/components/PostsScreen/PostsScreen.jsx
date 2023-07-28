import React from "react";
import { Image, Text, View, Pressable } from "react-native";
import { styles } from "./PostsScreen.styled";
import { AntDesign } from "@expo/vector-icons";
import { Post } from "../Post/Post";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectEmail, selectLogin } from "../../redux/authSlice/selectors";

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

  console.log("Email from Redux state:", email);
  console.log("Login from Redux state:", login);

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
          <Text>Login</Text>
          <Text>Email</Text>
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
