import { View,Image, Text, TextInput, Pressable, KeyboardAvoidingView, Platform } from "react-native"
import React, { useState } from 'react';
import { styles } from "../EnterScreens.styled";

export const LoginScreen = () => {
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const [inputStates, setInputStates] = useState({
    input1: false,
    input2: false,
  });

  const onLogin = () =>{
   console.log({ email, password})
   setEmail('');
   setPassword('');
      }

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

return(
<View style={[styles.container, {height: 489,   paddingTop: 32}]}>
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
      onFocus={() => handleFocus('input1')}
      onBlur={() => handleBlur('input1')}
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
        onFocus={() => handleFocus('input2')}
        onBlur={() => handleBlur('input2')}
        placeholder="Пароль"
        maxLength={15}
        secureTextEntry
        />
 <Text style={styles.textAccent}>Показати</Text>  
 </View>
 </KeyboardAvoidingView>
 <Pressable style={styles.button}>
  <Text style={styles.textButton} onPress={onLogin}>Увійти</Text>
</Pressable>
<Pressable >
  <Text style={styles.textEnterButton}>Немає акаунту? Зареєструватися</Text>
</Pressable>
</View>
)
}

