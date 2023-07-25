import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "./src/components/Home/Home";
import { LoginScreen } from "./src/components/EnterScreens/LoginScreen/LoginScreen";
import { RegistrationScreen } from "./src/components/EnterScreens/RegistrationScreen/RegistrationScreen";
import { CommentsScreen } from "./src/components/CommentsScreen/CommentsScreen";
import { MapScreen } from "./src/components/MapScreen/MapScreen";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/redux/store";

export default function App() {
  const MainStack = createStackNavigator();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MainStack.Navigator initialRouteName="Login">
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
              options={{ title: "Коментарі" }}
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
          </MainStack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}




