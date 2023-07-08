import { View,Image, Text, TextInput, Pressable } from "react-native"
import React, { useState } from 'react';
import { styles } from "../EnterScreens.styled";
import add from '../../../images/add.png'

export const RegistrationScreen = () => {
  const [inputStates, setInputStates] = useState({
    input1: false,
    input2: false,
    input3: false,
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
<View style={[styles.container, {height: 549, paddingTop: 92}]}>
<View style={styles.imageContainer}></View>
<Image source={add} style={styles.imageAdd}/>
<Text style={styles.text}>Реєстрація</Text>
<TextInput
       style={[
        styles.input,
        inputStates.input1 && styles.inputFocused,
      ]}
      onFocus={() => handleFocus('input1')}
      onBlur={() => handleBlur('input1')}
        placeholder="Логін"
      />
<TextInput
       style={[
        styles.input,
        inputStates.input2 && styles.inputFocused,
      ]}
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
        onFocus={() => handleFocus('input3')}
        onBlur={() => handleBlur('input3')}
        placeholder="Пароль"
        maxLength={15}
        />
 <Text style={styles.textAccent}>Показати</Text>  
 </View>
 <Pressable style={styles.button}>
  <Text style={styles.textButton}>Зареєструватися</Text>
</Pressable>
<Pressable >
  <Text style={styles.textEnterButton}>Вже є акаунт? Увійти</Text>
</Pressable>
</View>
)
}
