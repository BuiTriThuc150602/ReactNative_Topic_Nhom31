import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ImageBackground,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { CheckBox } from "react-native-elements";

const Login = ({ navigation,route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const updateUsersData = async () => {
    try {
      const response = await fetch(
        "https://6540e47345bedb25bfc2d34b.mockapi.io/react-lab-todos/users"
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // updateUsersData();
  useFocusEffect(
    useCallback(() => {
      updateUsersData();
    }, [navigation])
  );

  const handleLogin = () => {
    const user = users.find((item) => item.email === email);
    if (user) {
      if (user.password === password) {
        navigation.navigate("HomeTab", { userLogin: user });
      } else {
        alert("Wrong password");
      }
    } else {
      alert("Wrong email");
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../img/background_login.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={100}
          style={styles.formContainer}
        >
          <View style={{ alignItems: "center" }}>
            <Ionicons name="person-circle-outline" size={150} color="white" />
          </View>
          <TextInput
            placeholder="Email"
            placeholderTextColor={"white"}
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor={"white"}
            style={styles.input}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={!showPassword}
          />
          <CheckBox
            title="Show password"
            checked={showPassword}
            onPress={() => setShowPassword(!showPassword)}
            containerStyle={styles.checkStyle}
            textStyle={{
              color: "white",
              fontStyle: "italic",
              fontWeight: "100",
            }}
            checkedColor="green"
          />
          <View style={styles.linksRow}>
            <Pressable onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.links}>Don't have account ? Sign up now</Text>
            </Pressable>
            <Pressable>
              <Text style={styles.links}>Forgot Password</Text>
            </Pressable>
          </View>
          <Pressable style={styles.btnLogin} onPress={() => handleLogin()}>
            <Text style={styles.Login}>Sign In</Text>
          </Pressable>
          <Text style={{ color: "white", marginTop: 50, textAlign: "center" }}>
            Sign in with
          </Text>
          <View style={styles.moreLogin}>
            <Image
              source={require("../../img/gg-logo.png")}
              resizeMode="contain"
              style={styles.logo_icons}
            />
            <Image
              source={require("../../img/fb-logo.png")}
              resizeMode="contain"
              style={styles.logo_icons}
            />
            <Image
              source={require("../../img/phone-logo.png")}
              resizeMode="contain"
              style={styles.logo_icons}
            />
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "90%",
    backgroundColor: "none",
  },
  input: {
    // backgroundColor: "none",
    marginBottom: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    color: "white",
  },
  links: {
    color: "white",
    marginBottom: 20,
    fontWeight: "100",
    borderBottomWidth: 1,
    borderBottomColor: "red",
  },
  linksRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnLogin: {
    backgroundColor: "#54D933",
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 20,
    marginHorizontal: 80,
    alignItems: "center",
  },
  Login: {
    color: "white",
    fontWeight: "700",
    fontSize: 24,
  },
  moreLogin: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
  },
  logo_icons: {
    width: 60,
    height: 60,
    marginHorizontal: 10,
  },
  checkStyle: {
    backgroundColor: "none",
    borderWidth: 0,
    color: "white",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
