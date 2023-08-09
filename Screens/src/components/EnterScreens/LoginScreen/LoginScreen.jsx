import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../EnterScreens.styled";
import image from "../../../images/bg.jpg";
import { loginDB } from "../../helpers/firebaseFunc";
import { loginSuccess } from "../../../redux/authSlice/authSlice";
import { useDispatch } from "react-redux";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [inputStates, setInputStates] = useState({
    input1: false,
    input2: false,
  });

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const user = await loginDB({ email, password });

      await user.reload();
      const login = user.displayName || "";
      dispatch(loginSuccess({ email, login }));

      setEmail("");
      setPassword("");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  const handleFocus = (inputKey) => {
    setInputStates((prevState) => ({
      ...prevState,
      [inputKey]: true,
    }));
  };

  const handleBlur = (inputKey) => {
    setInputStates((prevState) => ({
      ...prevState,
      [inputKey]: false,
    }));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.containerBackground}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <View style={[styles.container, { height: 489, paddingTop: 32 }]}>
            <Text style={styles.text}>Увійти</Text>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <TextInput
                style={[
                  styles.input,
                  inputStates.input1 && styles.inputFocused,
                ]}
                value={email}
                onChangeText={setEmail}
                onFocus={() => handleFocus("input1")}
                onBlur={() => handleBlur("input1")}
                placeholder="Адреса електронної пошти"
              />
              <View>
                <TextInput
                  style={[
                    styles.input,
                    styles.inputPassword,
                    inputStates.input2 && styles.inputFocused,
                  ]}
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => handleFocus("input2")}
                  onBlur={() => handleBlur("input2")}
                  placeholder="Пароль"
                  maxLength={15}
                  secureTextEntry={showPassword}
                />
                <Pressable
                  style={styles.textAccent}
                  onPress={() =>
                    setShowPassword((prevShowPassword) => !prevShowPassword)
                  }
                >
                  <Text style={{ color: "#1B4371" }}>
                    {showPassword ? "Показати" : "Приховати"}
                  </Text>
                </Pressable>
              </View>
            </KeyboardAvoidingView>
            <Pressable style={styles.button}>
              <Text style={styles.textButton} onPress={handleLogin}>
                Увійти
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                navigation.navigate("Registration");
              }}
            >
              <Text style={styles.textEnterButton}>
                Немає акаунту? Зареєструватися
              </Text>
            </Pressable>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
