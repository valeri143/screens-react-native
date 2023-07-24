import React from "react";
import { Image, View } from "react-native";
import { useRoute } from "@react-navigation/native";

export const CommentsScreen = () => {
  const { params: { takenPhotoUri = null } = {} } = useRoute();

  return (
    takenPhotoUri && (
      <View
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          paddingTop: 32,
          marginBottom: 32,
        }}
      >
        <Image
          source={{ uri: takenPhotoUri }}
          style={{ width: 343, height: 240, borderRadius: 8, marginBottom: 8 }}
        />
      </View>
    )
  );
};
