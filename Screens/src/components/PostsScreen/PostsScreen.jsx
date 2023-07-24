import React from "react";
import { Image, Text, View, Pressable } from "react-native";
import { styles } from "./PostsScreen.styled";
import add from "../../images/add.png";
import { Post } from "../Post/Post";
import { useRoute } from "@react-navigation/native";

export const PostsScreen = () => {
  const {
    params: {
      takenPhotoUri = null,
      postName = "",
      postLocation = "",
      location = null,
    } = {},
  } = useRoute();

  return (
    <View style={{ paddingTop: 32 }}>
      <View style={styles.container}>
        <View style={styles.imageContainer}></View>
        <Pressable>
          <Image source={add} style={styles.imageAdd} />
        </Pressable>
        <View style={{ marginTop: "auto", marginBottom: "auto" }}>
          <Text>Name</Text>
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
