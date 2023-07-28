import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../EnterScreens.styled";
import { AntDesign } from "@expo/vector-icons";
import image from "../../../images/bg.jpg";
import { registerDB } from "../../helpers/firebaseFunc";
import { registerSuccess } from "../../../redux/authSlice/authSlice";
import { useDispatch } from "react-redux";

export const RegistrationScreen = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [inputStates, setInputStates] = useState({
    input1: false,
    input2: false,
    input3: false,
  });

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      console.log("Registration data:", { email, password });
      await registerDB({ email, password });
      console.log("Registration successful!");
      dispatch(registerSuccess({ email, login }));
      console.log("After register:", { email, password });
      setLogin("");
      setEmail("");
      setPassword("");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Registration error:", error.message);
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
          <View style={[styles.container, { height: 549, paddingTop: 92 }]}>
            <View style={styles.imageContainer}></View>
            <AntDesign
              name="pluscircleo"
              size={24}
              color="#FF6C00"
              style={styles.imageAdd}
            />
            <Text style={styles.text}>Реєстрація</Text>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <TextInput
                style={[
                  styles.input,
                  inputStates.input1 && styles.inputFocused,
                ]}
                value={login}
                onChangeText={setLogin}
                onFocus={() => handleFocus("input1")}
                onBlur={() => handleBlur("input1")}
                placeholder="Логін"
              />
              <TextInput
                style={[
                  styles.input,
                  inputStates.input2 && styles.inputFocused,
                ]}
                value={email}
                onChangeText={setEmail}
                onFocus={() => handleFocus("input2")}
                onBlur={() => handleBlur("input2")}
                placeholder="Адреса електронної пошти"
              />
              <View>
                <TextInput
                  style={[
                    styles.input,
                    styles.inputPassword,
                    inputStates.input3 && styles.inputFocused,
                  ]}
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => handleFocus("input3")}
                  onBlur={() => handleBlur("input3")}
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
            <Pressable style={styles.button} onPress={handleRegister}>
              <Text style={styles.textButton}>Зареєструватися</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={styles.textEnterButton}>Вже є акаунт? Увійти</Text>
            </Pressable>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
