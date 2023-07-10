import { View,Image, Text, TextInput, Pressable, KeyboardAvoidingView, Platform } from "react-native"
import React, { useState } from 'react';
import { styles } from "../EnterScreens.styled";
import add from '../../../images/add.png'

export const RegistrationScreen = () => {
  const[login, setLogin] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const [inputStates, setInputStates] = useState({
    input1: false,
    input2: false,
    input3: false,
  });

  const onLogin = () =>{
    console.log({login, email, password})
    setLogin('');
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
<View style={[styles.container, {height: 549, paddingTop: 92}]}>
<View style={styles.imageContainer}></View>
<Image source={add} style={styles.imageAdd}/>
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
      onFocus={() => handleFocus('input1')}
      onBlur={() => handleBlur('input1')}
      placeholder="Логін"
      />
<TextInput
       style={[
        styles.input,
        inputStates.input2 && styles.inputFocused,
      ]}
      value={email}
      onChangeText={setEmail}
      onFocus={() => handleFocus('input2')}
      onBlur={() => handleBlur('input2')}
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
        onFocus={() => handleFocus('input3')}
        onBlur={() => handleBlur('input3')}
        placeholder="Пароль"
        maxLength={15}
        secureTextEntry
        />
 <Text style={styles.textAccent}>Показати</Text>  
 </View>
 </KeyboardAvoidingView>
 <Pressable style={styles.button} onPress={onLogin}>
  <Text style={styles.textButton}>Зареєструватися</Text>
</Pressable>
<Pressable >
  <Text style={styles.textEnterButton}>Вже є акаунт? Увійти</Text>
</Pressable>
</View>
)
}
