import React from "react";
import {
  Text,
  View,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { styles } from "./PostsScreen.styled";
import { AntDesign } from "@expo/vector-icons";
import { Post } from "../Post/Post";
import { PostsList } from "../PostsList/PostsList";
import { useRoute } from "@react-navigation/native";
import { selectEmail, selectLogin } from "../../redux/authSlice/selectors";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDataFromFirestore,
  getDataCommentsFromFirestore,
} from "../helpers/firestoreFunc";
import {
  selectIsError,
  selectIsLoading,
  selectPosts,
} from "../../redux/postSlice/selectors";
import {
  fetchPostsFailure,
  fetchPostsStart,
  fetchPostsSuccess,
} from "../../redux/postSlice/postSlice";
import { fetchAllComments } from "../../redux/commentSlice/commentsSlice";
import { selectAllComments } from "../../redux/commentSlice/selectors";

export const PostsScreen = () => {
  const {
    params: {
      takenPhotoUri = null,
      postName = "",
      postLocation = "",
      location = null,
    } = {},
  } = useRoute();
  const email = useSelector(selectEmail);
  const login = useSelector(selectLogin);

  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const allComments = useSelector(selectAllComments);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  useEffect(() => {
    async function fetchPosts() {
      try {
        dispatch(fetchPostsStart());
        const posts = await getDataFromFirestore();
        dispatch(fetchPostsSuccess(posts));
        const allComments = await getDataCommentsFromFirestore();
        console.log(5);
        dispatch(fetchAllComments(allComments));
        console.log(allComments);
        return posts;
      } catch (error) {
        console.log(error);
        fetchPostsFailure(error);
      }
    }
    fetchPosts();
  }, []);

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
    <ScrollView style={{ paddingTop: 32 }}>
      <View style={styles.container}>
        <View style={styles.imageContainer}></View>
        <Pressable>
          <AntDesign
            name="pluscircleo"
            size={24}
            color="#FF6C00"
            style={styles.imageAdd}
          />
        </Pressable>
        <View style={{ marginTop: "auto", marginBottom: "auto" }}>
          <Text>{login}</Text>
          <Text>{email}</Text>
        </View>
      </View>
      {takenPhotoUri !== null && (
        <Post
          postName={postName}
          takenPhotoUri={takenPhotoUri}
          postLocation={postLocation}
          location={location}
        />
      )}
      {posts && <PostsList posts={posts} />}
    </ScrollView>
  );
};
