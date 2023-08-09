import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { styles } from "./CreatePostsScreen.styled";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { writeDataToFirestore } from "../helpers/firestoreFunc";
import { collectionGroup } from "firebase/firestore";

export const CreatePostsScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [takenPhotoUri, setTakenPhotoUri] = useState(null);
  const [location, setLocation] = useState(null);
  const [postName, setPostName] = useState("");
  const [postLocation, setPostLocation] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handlePress = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);

      if (!location) {
        console.log("Location data is not available.");
        return;
      }
    } catch (error) {
      console.error("Произошла ошибка:", error.message);
    }

    const postData = {
      takenPhotoUri,
      location,
      postName,
      postLocation,
    };
    console.log("CREATE DATA", postData);
    writeDataToFirestore(postData);
    navigation.navigate("PostsScreen", postData);
  };

  const handlePressOnTrash = () => {
    navigation.navigate("PostsScreen");
    setTakenPhotoUri(null);
    setLocation(null);
    setPostName("");
    setPostLocation("");
  };
  return (
    <View style={{ paddingTop: 32, marginLeft: "auto", marginRight: "auto" }}>
      {hasPermission === null ||
        (hasPermission === false && (
          <View style={styles.container}>
            <View style={styles.circle}>
              <Feather
                name="camera"
                size={24}
                color="#BDBDBD"
                style={styles.image}
              />
            </View>
          </View>
        ))}
      <View style={style.container}>
        {!takenPhotoUri && (
          <Camera style={style.camera} type={type} ref={setCameraRef}>
            <View style={style.photoView}>
              <TouchableOpacity
                style={style.flipContainer}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <Ionicons
                  name="camera-reverse-outline"
                  size={35}
                  color="white"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={style.button}
                onPress={async () => {
                  if (cameraRef) {
                    const { uri } = await cameraRef.takePictureAsync();
                    await MediaLibrary.createAssetAsync(uri);
                    setTakenPhotoUri(uri);
                  }
                }}
              >
                <View style={style.takePhotoOut}>
                  <View style={style.takePhotoInner}></View>
                </View>
              </TouchableOpacity>
            </View>
          </Camera>
        )}
        {takenPhotoUri && (
          <>
            <Image source={{ uri: takenPhotoUri }} style={{ flex: 1 }} />
            <Ionicons
              name="close-circle-outline"
              size={26}
              color="white"
              style={{ position: "absolute", right: 0 }}
              onPress={() => {
                setTakenPhotoUri(null);
              }}
            />
          </>
        )}
      </View>
      <Text style={{ color: "#BDBDBD", marginBottom: 32 }}>
        Завантажте фото
      </Text>
      <TextInput
        placeholder="Назва..."
        style={styles.input}
        onChangeText={setPostName}
        value={postName}
      />
      <View>
        <TextInput
          placeholder="Місцевість..."
          style={[styles.input, styles.inputWithMap]}
          onChangeText={setPostLocation}
          value={postLocation}
        />
        <Feather
          name="map-pin"
          size={24}
          color="#BDBDBD"
          style={styles.imageMap}
        />
      </View>
      <Pressable
        style={[styles.button, takenPhotoUri !== null && styles.buttonActive]}
        disabled={takenPhotoUri === null}
        onPress={handlePress}
      >
        <Text
          style={[styles.text, takenPhotoUri !== null && styles.textActive]}
        >
          Опубліковати
        </Text>
      </Pressable>
      <Pressable style={styles.buttonTrash} onPress={handlePressOnTrash}>
        <Feather name="trash-2" size={24} color="#BDBDBD" />
      </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: 343,
    height: 240,
    borderWidth: 1,
    marginBottom: 8,
  },
  camera: { flex: 1 },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    marginBottom: 5,
  },

  flipContainer: {
    position: "absolute",
    bottom: 5,
    right: 100,
  },

  button: { alignSelf: "center" },

  takePhotoOut: {
    borderWidth: 2,
    borderColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },

  takePhotoInner: {
    borderWidth: 2,
    borderColor: "white",
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 50,
  },
});
