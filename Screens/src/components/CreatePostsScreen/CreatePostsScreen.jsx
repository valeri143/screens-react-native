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
  Dimensions,
} from "react-native";
import { styles } from "./CreatePostsScreen.styled";
import camera from "../../images/camera.png";
import map from "../../images/map.png";
import trash from "../../images/trash.png";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

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
      console.log("Before navigation");
      const navigateResult = navigation.navigate("Home", {
        location,
        takenPhotoUri,
        postName,
        postLocation,
      });
      console.log("Navigate result:", navigateResult);
      console.log(postName, postLocation);
    } catch (error) {
      console.error("Произошла ошибка:", error.message);
    }
  };

  const handlePressOnTrash = () => {
    navigation.navigate("Home");
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
              <Image source={camera} style={styles.image} />
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
      />
      <View>
        <TextInput
          placeholder="Місцевість..."
          style={[styles.input, styles.inputWithMap]}
          onChangeText={setPostLocation}
        />
        <Image source={map} style={styles.imageMap} />
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
        <Image source={trash} />
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
  containerMap: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

// const handlePress = () => {
//   if (!location) {
//     console.log("Location data is not available.");
//     return;
//   }

//   <View style={style.containerMap}>
//     <MapView
//       style={style.mapStyle}
//       region={{
//         ...location,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421,
//       }}
//       showsUserLocation={true}
//     >
//       {location && (
//         <Marker title="I am here" coordinate={location} description="Hello" />
//       )}
//     </MapView>
//   </View>;
// };

// import React from "react";
// import { useState, useEffect } from "react";
// import {
//   View,
//   Image,
//   Text,
//   TextInput,
//   Pressable,
//   StyleSheet,
//   TouchableOpacity,
//   Dimensions,
// } from "react-native";
// import { styles } from "./CreatePostsScreen.styled";
// import camera from "../../images/camera.png";
// import map from "../../images/map.png";
// import trash from "../../images/trash.png";
// import { Camera } from "expo-camera";
// import * as MediaLibrary from "expo-media-library";
// import { Ionicons } from "@expo/vector-icons";
// import * as Location from "expo-location";
// import MapView, { Marker } from "react-native-maps";

// export const CreatePostsScreen = () => {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [cameraRef, setCameraRef] = useState(null);
//   const [type, setType] = useState(Camera.Constants.Type.back);
//   const [takenPhotoUri, setTakenPhotoUri] = useState(null);
//   const [location, setLocation] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       await MediaLibrary.requestPermissionsAsync();
//       setHasPermission(status === "granted");
//     })();
//   }, []);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestPermissionsAsync();
//       if (status !== "granted") {
//         console.log("Permission to access location was denied");
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       const coords = {
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//       };
//       setLocation(coords);
//     })();
//   }, []);

//   if (hasPermission === null) {
//     return <View />;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   const handlePress = () => {
//     if (!location) {
//       console.log("Location data is not available.");
//       return;
//     }

//     <View style={style.containerMap}>
//       <MapView
//         style={style.mapStyle}
//         region={{
//           ...location,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//         showsUserLocation={true}
//       >
//         {location && (
//           <Marker title="I am here" coordinate={location} description="Hello" />
//         )}
//       </MapView>
//     </View>;
//   };

//   return (
//     <View style={{ paddingTop: 32, marginLeft: "auto", marginRight: "auto" }}>
//       {hasPermission === null ||
//         (hasPermission === false && (
//           <View style={styles.container}>
//             <View style={styles.circle}>
//               <Image source={camera} style={styles.image} />
//             </View>
//           </View>
//         ))}
//       <View style={style.container}>
//         {!takenPhotoUri && (
//           <Camera style={style.camera} type={type} ref={setCameraRef}>
//             <View style={style.photoView}>
//               <TouchableOpacity
//                 style={style.flipContainer}
//                 onPress={() => {
//                   setType(
//                     type === Camera.Constants.Type.back
//                       ? Camera.Constants.Type.front
//                       : Camera.Constants.Type.back
//                   );
//                 }}
//               >
//                 <Ionicons
//                   name="camera-reverse-outline"
//                   size={35}
//                   color="white"
//                 />
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={style.button}
//                 onPress={async () => {
//                   if (cameraRef) {
//                     const { uri } = await cameraRef.takePictureAsync();
//                     await MediaLibrary.createAssetAsync(uri);
//                     setTakenPhotoUri(uri);
//                   }
//                 }}
//               >
//                 <View style={style.takePhotoOut}>
//                   <View style={style.takePhotoInner}></View>
//                 </View>
//               </TouchableOpacity>
//             </View>
//           </Camera>
//         )}
//         {takenPhotoUri && (
//           <>
//             <Image source={{ uri: takenPhotoUri }} style={{ flex: 1 }} />
//             <Ionicons
//               name="close-circle-outline"
//               size={26}
//               color="white"
//               style={{ position: "absolute", right: 0 }}
//               onPress={() => {
//                 setTakenPhotoUri(null);
//               }}
//             />
//           </>
//         )}
//       </View>
//       <Text style={{ color: "#BDBDBD", marginBottom: 32 }}>
//         Завантажте фото
//       </Text>
//       <TextInput placeholder="Назва..." style={styles.input} />
//       <View>
//         <TextInput
//           placeholder="Місцевість..."
//           style={[styles.input, styles.inputWithMap]}
//         />
//         <Image source={map} style={styles.imageMap} />
//       </View>
//       <Pressable
//         style={[styles.button, takenPhotoUri !== null && styles.buttonActive]}
//         disabled={takenPhotoUri === null}
//         onPress={handlePress}
//       >
//         <Text
//           style={[styles.text, takenPhotoUri !== null && styles.textActive]}
//         >
//           Опубліковати
//         </Text>
//       </Pressable>
//       <Pressable style={styles.buttonTrash}>
//         <Image source={trash} />
//       </Pressable>
//     </View>
//   );
// };
