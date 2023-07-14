import { PostsScreen } from "../PostsScreen/PostsScreen";
import { CreatePostsScreen } from "../CreatePostsScreen/CreatePostsScreen";
import { ProfileScreen } from "../ProfileScreen/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import logOut from "../../images/logout.png";
import { Pressable, Image } from "react-native";
import { useEffect } from 'react';
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from 'react';


const Tabs = createBottomTabNavigator();


export const Home =({ navigation }) =>{
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    navigation.navigate('PostsScreen');
   }, []);
    
    return(
      <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "PostsScreen") {
            iconName = "grid-outline"
          } else if (route.name === "CreatePostsScreen") {
            if(isActive){
              iconName = "person-outline";
              color = "#fff";
            }
            iconName = "add-outline";
            color = "#fff";
          }
          else if (route.name === "ProfileScreen") {
            iconName = focused ? "add-outline" : "person-outline";
            
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "gray",
        inactiveTintColor: "gray",
      }}
      onTabPress={({ route }) => {
        if (route.name === 'ProfileScreen') {
          setIsActive(true);
        }else {
          setIsActive(false)
        }
      }}
    >
          <Tabs.Screen name="PostsScreen" options={{title:"Публікації",headerStyle:{height:100}, headerTitleStyle: {
         marginTop:50
            },tabBarLabelStyle: { display:"none"},tabBarActiveTintColor: "gray",
            headerRight: () => (
             <Pressable
               onPress={() => alert("You have just loged out!")}
              >
                <Image source={logOut} style={{marginRight: 16, marginTop:50}}/>
              </Pressable>)}} component={PostsScreen} />
          <Tabs.Screen name="CreatePostsScreen" options={{title:"Створити публікацію",headerStyle:{height:100}, headerTitleStyle: {
         marginTop:50 },  tabBarLabelStyle: { display:"none"}, tabBarIconStyle:{backgroundColor:"#FF6C00", width:70, height:40,marginTop:8, borderRadius:20}
         }} component={CreatePostsScreen}/>
          <Tabs.Screen name="ProfileScreen" options={{title:"",headerStyle:{height:0}, tabBarLabelStyle: { display:"none"}}} component={ProfileScreen}/>
        </Tabs.Navigator>
    )
    
}