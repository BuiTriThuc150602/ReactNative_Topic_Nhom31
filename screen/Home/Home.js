import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import News from "./News";
import Detail from "./Detail";

const Home = ({ navigation,route }) => {
  const Stack = createNativeStackNavigator();
  const userLogin = route.params?.userLogin || {};


  navigation.setOptions({
    headerTitle: "Tin Tức",
    headerStyle: {
      backgroundColor: "skyblue",
      shadowColor: "#fff",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 20,
    },
  });

  return (
    <Stack.Navigator initialRouteName="News">
      <Stack.Screen
        name="News"
        component={News}
        options={{ headerShown: false }}
        initialParams={{ userLogin: route.params?.userLogin }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Home;
