import { Text, View, Image, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export const Post = ({
  postName,
  postLocation,
  takenPhotoUri,
  location,
  commentsCount = 0,
}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        width: 343,
        marginBottom: 32,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {takenPhotoUri && (
        <Image
          source={{ uri: takenPhotoUri }}
          style={{ width: 343, height: 240, borderRadius: 8, marginBottom: 8 }}
        />
      )}
      <Text>{postName}</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ display: "flex", gap: 24, flexDirection: "row" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Pressable
              onPress={() => {
                navigation.navigate("CommentsScreen", { takenPhotoUri });
              }}
            >
              <Feather
                name="message-circle"
                size={24}
                color="#BDBDBD"
                style={{ transform: [{ rotate: "270deg" }] }}
              />
            </Pressable>
            <Text style={{ color: "#BDBDBD", fontSize: 16 }}>
              {commentsCount}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Pressable>
              <Feather name="thumbs-up" size={24} color="#BDBDBD" />
            </Pressable>
            <Text style={{ color: "#BDBDBD", fontSize: 16 }}>0</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Pressable
            onPress={() => {
              navigation.navigate("MapScreen", { location });
            }}
          >
            <Feather name="map-pin" size={24} color="#BDBDBD" />
          </Pressable>
          <Text style={{ textDecorationLine: "underline" }}>
            {postLocation}
          </Text>
        </View>
      </View>
    </View>
  );
};
