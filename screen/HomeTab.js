import { StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "./Home";
import Info from "./Info";
import Trending from "./Trending";
import Detail from "./Detail";

const Tab = createBottomTabNavigator();

const HomeTab = ({ route }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Tin Tức") {
            iconName = focused ? "newspaper" : "newspaper-outline";
          } else if (route.name === "Thông Tin") {
            iconName = focused
              ? "information-circle"
              : "information-circle-outline";
          } else {
            iconName = focused ? "trending-up" : "trending-up-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Tin Tức" component={Home} options={{tabBarHideOnKeyboard:true}} />
      <Tab.Screen name="Nổi Bật" component={Trending} />
      <Tab.Screen
        name="Thông Tin"
        component={Info}
        initialParams={{ userLogin: route.params?.userLogin }}
      />
    </Tab.Navigator>
  );
};

export default HomeTab;
