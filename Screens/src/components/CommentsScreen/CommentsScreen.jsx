import React from "react";
import { useEffect } from "react";
import {
  Image,
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { styles } from "./CommentsScreen.styled";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import {
  getDataCommentsFromFirestore,
  writeDataCommentToFirestore,
} from "../helpers/firestoreFunc";
import {
  fetchCommentsSuccess,
  fetchCommentsStart,
  fetchCommentsFailure,
} from "../../redux/commentSlice/commentsSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsError,
  selectIsLoading,
  selectPosts,
} from "../../redux/postSlice/selectors";
import { selectComments } from "../../redux/commentSlice/selectors";

export const CommentsScreen = () => {
  const { params: { takenPhotoUri = null } = {} } = useRoute();
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");
  const [inputState, setInputState] = useState(false);
  const posts = useSelector(selectPosts);
  const { comments } = useSelector(selectComments);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  const currentPost = posts.find(
    ({ data }) => data.takenPhotoUri === takenPhotoUri
  );

  useEffect(() => {
    async function fetchComments() {
      try {
        dispatch(fetchCommentsStart());
        const data = await getDataCommentsFromFirestore();
        const filteredData = data.filter(
          ({ data }) =>
            data.currentPost.data.takenPhotoUri ===
            currentPost.data.takenPhotoUri
        );
        const comments = filteredData.map(({ data }) => data.comments);
        dispatch(fetchCommentsSuccess({ currentPost, comments }));
        return comments;
      } catch (error) {
        console.log(error);
        fetchCommentsFailure(error);
      }
    }
    if (currentPost) {
      fetchComments();
    }
  }, [currentPost]);

  const handleCommentSend = async () => {
    writeDataCommentToFirestore({ currentPost, comments: comment });
    const data = await getDataCommentsFromFirestore();
    const filteredData = data.filter(
      ({ data }) =>
        data.currentPost.data.takenPhotoUri === currentPost.data.takenPhotoUri
    );
    const comments = filteredData.map(({ data }) => data.comments);
    dispatch(fetchCommentsSuccess({ currentPost, comments }));
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6C00" />
        <Text>Loading... please wait</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>
          An error occurred. Please try again later.
        </Text>
      </View>
    );
  }

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
        <View style={styles.containerComments}>
          {comments &&
            comments.map((comment) => (
              <View style={styles.containerForOneComment}>
                <Text style={styles.textOfComments}>{comment}</Text>
              </View>
            ))}
        </View>
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
            <Pressable style={styles.textAccent} onPress={handleCommentSend}>
              <Feather name="arrow-up" size={20} color="#fff" />
            </Pressable>
          </KeyboardAvoidingView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
