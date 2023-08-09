import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "./src/components/Home/Home";
import { LoginScreen } from "./src/components/EnterScreens/LoginScreen/LoginScreen";
import { RegistrationScreen } from "./src/components/EnterScreens/RegistrationScreen/RegistrationScreen";
import { CommentsScreen } from "./src/components/CommentsScreen/CommentsScreen";
import { MapScreen } from "./src/components/MapScreen/MapScreen";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "./src/redux/authSlice/selectors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";

export const MainNavigator = () => {
  const MainStack = createStackNavigator();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigation = useNavigation()

  return (
    <MainStack.Navigator initialRouteName={isLoggedIn ? "Home" : "Login"}>
      {!isLoggedIn ? (
        <>
          <MainStack.Screen
            name="Registration"
            options={{
              title: "",
              headerStyle: {
                height: 0,
              },
            }}
            component={RegistrationScreen}
          />
          <MainStack.Screen
            name="Login"
            options={{
              title: "",
              headerStyle: {
                height: 0,
              },
            }}
            component={LoginScreen}
          />
        </>
      ) : (
        <>
          <MainStack.Screen
            name="Home"
            options={{
              title: "",
              headerLeft: null,
              headerStyle: { height: 0 },
            }}
            component={Home}
          />
          <MainStack.Screen
            name="CommentsScreen"
            component={CommentsScreen}
            options={{ title: "Коментарі",
            headerLeft: () => (
              <Pressable onPress={() => navigation.navigate("PostsScreen")}>
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color="gray"
                  style={{marginLeft:16}}
                />
              </Pressable>
            ),
          }}
          />
          <MainStack.Screen
            name="MapScreen"
            component={MapScreen}
            options={{
              title: "",
              headerStyle: {
                height: 0,
              },
            }}
          />
        </>
      )}
    </MainStack.Navigator>
  );
};

