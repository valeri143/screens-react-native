import React from "react";
import {
  Image,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { styles } from "./CommentsScreen.styled";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";

export const CommentsScreen = () => {
  const { params: { takenPhotoUri = null } = {} } = useRoute();

  const [comment, setComment] = useState("");
  const [inputState, setInputState] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.containerBackground}>
        {takenPhotoUri && (
          <View
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              paddingTop: 32,
              marginBottom: 32,
            }}
          >
            <Image
              source={{ uri: takenPhotoUri }}
              style={{
                width: 343,
                height: 240,
                borderRadius: 8,
              }}
            />
          </View>
        )}
        <View style={styles.containerComments}></View>
        <View style={styles.inputContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <TextInput
              style={[
                styles.input,
                styles.inputComment,
                inputState && styles.inputFocused,
              ]}
              value={comment}
              onChangeText={setComment}
              onFocus={() => setInputState(true)}
              onBlur={() => setInputState(false)}
              placeholder="Коментувати..."
              multiline
            />
            <Pressable
              style={styles.textAccent}
              onPress={() => console.log("Pressed")}
            >
              <Feather name="arrow-up" size={20} color="#fff" />
            </Pressable>
          </KeyboardAvoidingView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
