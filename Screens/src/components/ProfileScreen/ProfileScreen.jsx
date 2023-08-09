import React from "react";
import { ImageBackground, View, Image, Pressable, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import image from "../../images/bg.jpg";
import { styles } from "./ProfileScreen.styled";
import { useEffect } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice/authSlice";
import { logoutUser } from "../helpers/firebaseFunc";
import { selectLogin } from "../../redux/authSlice/selectors";
import { Post } from "../Post/Post";

export const ProfileScreen = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const login = useSelector(selectLogin);

  useEffect(() => {
    navigation.setOptions({
      tabBarVisible: !isFocused,
    });
  }, [isFocused, navigation]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={[styles.container, { height: 549, paddingTop: 92 }]}>
        <View style={styles.imageContainer}></View>
        <AntDesign
          name="pluscircleo"
          size={24}
          color="#FF6C00"
          style={styles.imageAdd}
        />
        <Pressable onPress={handleLogout}>
          <Feather
            name="log-out"
            size={24}
            color="#BDBDBD"
            style={{ position: "absolute", right: 16, top: -70 }}
          />
        </Pressable>
        <Text style={styles.text}>{login}</Text>
        <Post />
      </View>
    </ImageBackground>
  );
};
