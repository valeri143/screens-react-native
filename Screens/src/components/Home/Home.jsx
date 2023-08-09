import { PostsScreen } from "../PostsScreen/PostsScreen";
import { CreatePostsScreen } from "../CreatePostsScreen/CreatePostsScreen";
import { ProfileScreen } from "../ProfileScreen/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { Pressable, Image } from "react-native";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice/authSlice";
import { logoutUser } from "../helpers/firebaseFunc";

const Tabs = createBottomTabNavigator();

export const Home = ({ navigation }) => {
  useEffect(() => {
    navigation.navigate("PostsScreen");
  }, []);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "PostsScreen") {
            iconName = "grid-outline";
          } else if (route.name === "CreatePostsScreen") {
            iconName = "add-outline";
            color = "#fff";
          } else if (route.name === "ProfileScreen") {
            iconName = "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "gray",
        inactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen
        name="PostsScreen"
        options={{
          title: "Публікації",
          headerStyle: { height: 100 },
          headerTitleStyle: {
            marginTop: 50,
          },
          tabBarLabelStyle: { display: "none" },
          tabBarActiveTintColor: "gray",
          headerRight: () => (
            <Pressable onPress={handleLogout}>
              <Feather
                name="log-out"
                size={24}
                color="#BDBDBD"
                style={{ marginRight: 16, marginTop: 50 }}
              />
            </Pressable>
          ),
        }}
        component={PostsScreen}
      />
      <Tabs.Screen
        name="CreatePostsScreen"
        options={{
          title: "Створити публікацію",
          headerStyle: { height: 100 },
          headerTitleStyle: { marginTop: 50 },
          tabBarStyle: { display: "none" },
          headerLeft: () => (
            <Pressable onPress={() => navigation.navigate("PostsScreen")}>
              <Ionicons
                name="arrow-back"
                size={24}
                color="gray"
                style={{ marginLeft: 20, marginTop: 50 }}
              />
            </Pressable>
          ),
          tabBarLabelStyle: { display: "none" },
          tabBarIconStyle: {
            backgroundColor: "#FF6C00",
            width: 70,
            height: 40,
            marginTop: 8,
            borderRadius: 20,
          },
        }}
        component={CreatePostsScreen}
      />
      <Tabs.Screen
        name="ProfileScreen"
        options={{
          title: "",
          headerStyle: { height: 0 },
          tabBarLabelStyle: { display: "none" },
        }}
        component={ProfileScreen}
      />
    </Tabs.Navigator>
  );
};
