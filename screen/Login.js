import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ImageBackground,
  Pressable,
} from "react-native";
import React from "react";

const Login = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../img/background_login.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.formContainer}>
          <TextInput placeholder="Email" style={styles.input} />
          <TextInput placeholder="Password" style={styles.input} />
          <View style={styles.linksRow}>
            <Pressable>
              <Text style={styles.links}>Sign Up</Text>
            </Pressable>
            <Pressable>
              <Text style={styles.links}>Forgot Password</Text>
            </Pressable>
          </View>
          <Pressable style={styles.btnLogin}>
            <Text style={styles.Login}>Sign In</Text>
          </Pressable>
        </View>
        <Text style={{ color: "white", marginTop: 50 }}>Sign in with</Text>
        <View style={styles.moreLogin}>
          <Image source={require("../img/gg-logo.png")} resizeMode="contain" style={styles.logo_icons} />
          <Image source={require("../img/fb-logo.png")}  resizeMode="contain" style={styles.logo_icons}/>
          <Image source={require("../img/phone-logo.png")} resizeMode="contain" style={styles.logo_icons} />
        </View>
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
    backgroundColor: "none",
    marginBottom: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    color: "white",
  },
  links: {
    color: "red",
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
    marginTop: 80
  },
  logo_icons: {
    width: 60,
    height: 60,
    marginHorizontal: 10,
  },

});
