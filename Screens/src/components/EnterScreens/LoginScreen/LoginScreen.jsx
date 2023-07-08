import { View,Image, Text, TextInput, Pressable } from "react-native"
import React, { useState } from 'react';
import { styles } from "../EnterScreens.styled";

export const LoginScreen = () => {
  const [inputStates, setInputStates] = useState({
    input1: false,
    input2: false,
  });

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
<TextInput
       style={[
        styles.input,
        inputStates.input1 && styles.inputFocused,
      ]}
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
        onFocus={() => handleFocus('input2')}
        onBlur={() => handleBlur('input2')}
        placeholder="Пароль"
        maxLength={15}
        />
 <Text style={styles.textAccent}>Показати</Text>  
 </View>
 <Pressable style={styles.button}>
  <Text style={styles.textButton}>Увійти</Text>
</Pressable>
<Pressable >
  <Text style={styles.textEnterButton}>Немає акаунту? Зареєструватися</Text>
</Pressable>
</View>
)
}

