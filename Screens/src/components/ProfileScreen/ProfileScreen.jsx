import React from "react";
import { ImageBackground, View, Image, Pressable, Text } from "react-native";
import add from "../../images/add.png";
import image from "../../images/bg.jpg";
import { styles } from "./ProfileScreen.styled";
import { useEffect } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

export const ProfileScreen = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      tabBarVisible: !isFocused,
    });
  }, [isFocused, navigation]);

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={[styles.container, { height: 549, paddingTop: 92 }]}>
        <View style={styles.imageContainer}></View>
        <Image source={add} style={styles.imageAdd} />
        <Pressable onPress={() => alert("You have just loged out!")}>
          <Feather
            name="log-out"
            size={24}
            color="#BDBDBD"
            style={{ position: "absolute", right: 16, top: -70 }}
          />
        </Pressable>
        <Text style={styles.text}>Name</Text>
      </View>
    </ImageBackground>
  );
};
