import { StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "./Home";
import Info from "./Info";
import Trending from "./Trending";

const Tab = createBottomTabNavigator();

const HomeTab = ({ route }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "News") {
            iconName = focused ? "newspaper" : "newspaper-outline";
          } else if (route.name === "User") {
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
      <Tab.Screen name="News" component={Home} />
      <Tab.Screen name="Trending" component={Trending} />
      <Tab.Screen
        name="User"
        component={Info}
        initialParams={{ userLogin: route.params?.userLogin }}
      />
    </Tab.Navigator>
  );
};

export default HomeTab;
