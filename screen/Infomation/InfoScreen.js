import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Info from "./Info";
import LikedNews from "./LikedNews";
import RecentlyView from "./RecentlyView";
import { MaterialIcons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

const InfoScreen = ({ navigation, route }) => {

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Thông tin cá nhân",
      headerStyle: {
        backgroundColor: "skyblue",
        shadowColor: "#fff",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 20,
      },
      headerRight: () => (
        <Pressable
          style={{
            padding: 10,
            marginRight: 10,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "red",
            flexDirection: "row",
          }}
          onPress={logout}
        >
          <MaterialIcons name="logout" size={20} color="red" />
          <Text
            style={{
              color: "red",
              fontWeight: "bold",
              marginLeft: 5,
            }}
          >
            Đăng Xuất
          </Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  const logout = () => {
    navigation.navigate("Login");
  };

  return (
    <Stack.Navigator initialRouteName="Info">
      <Stack.Screen
        name="Info"
        component={Info}
        options={{ headerShown: false }}
        initialParams={{ userLogin: route.params?.userLogin }}
      />
      <Stack.Screen
        name="Liked"
        component={LikedNews}
        initialParams={{ userLogin: route.params?.userLogin }}
      />
      <Stack.Screen
        name="Recently"
        component={RecentlyView}
        initialParams={{ userLogin: route.params?.userLogin }}
      />
    </Stack.Navigator>
  );
};

export default InfoScreen;
