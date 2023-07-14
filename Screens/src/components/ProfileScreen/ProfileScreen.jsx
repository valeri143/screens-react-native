import React from 'react';
import { ImageBackground, View, Image, Pressable, Text} from "react-native"
import add from '../../images/add.png'
import image from "../../images/bg.jpg"
import { styles } from "./ProfileScreen.styled"
import logOut from "../../images/logout.png"
import { useEffect } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';



export const ProfileScreen = () => {
    const isFocused = useIsFocused();
    const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      tabBarVisible: !isFocused,
    });
  }, [isFocused, navigation]);

    return(
<ImageBackground source={image} resizeMode="cover" style={styles.image}>
<View style={[styles.container, {height: 549, paddingTop: 92}]}>
<View style={styles.imageContainer}></View>
<Image source={add} style={styles.imageAdd}/>
<Pressable onPress={() => alert("You have just loged out!")} >
    <Image source={logOut} style={{position:"absolute", right:16, top: -70}}/>
</Pressable>
<Text style={styles.text}>Name</Text>
</View>
</ImageBackground>
    )
}