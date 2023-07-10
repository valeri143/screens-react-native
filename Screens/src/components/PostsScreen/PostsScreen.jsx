import { RegistrationScreen } from "../EnterScreens/RegistrationScreen/RegistrationScreen"
import {ImageBackground, StyleSheet, View, TouchableWithoutFeedback, Keyboard} from 'react-native';
import image from "../../images/bg.jpg"
import { LoginScreen } from "../EnterScreens/LoginScreen/LoginScreen";

export const PostsScreen = () => {
return(
    <>
     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <RegistrationScreen/>
      {/* <LoginScreen/> */}
    </ImageBackground>
  </View>
  </TouchableWithoutFeedback>
    </>
)
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: 'flex-end',
    },
  });