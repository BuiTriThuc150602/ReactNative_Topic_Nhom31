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
import React from "react";

const Register = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../img/background_login.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={100}
          style={styles.formContainer}
        >
          <TextInput placeholder="User Name" placeholderTextColor={"white"} style={styles.input} />
          <TextInput placeholder="Date Of Birth" placeholderTextColor={"white"} style={styles.input} />
          <TextInput placeholder="Email"  placeholderTextColor={"white"} style={styles.input} />
          <TextInput placeholder="Password" placeholderTextColor={"white"} style={styles.input} />
          <TextInput placeholder="Confirm Password" placeholderTextColor={"white"} style={styles.input} />

          <View style={styles.linksRow}>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={styles.links}>Have an account ? Sign now</Text>
            </Pressable>
          </View>

          <Pressable
            style={styles.btnLogin}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.Login}>Sign In</Text>
          </Pressable>
        <Text style={{ color: "white", marginTop: 50 , textAlign: 'center'}}>Sign in with</Text>
        <View style={styles.moreLogin}>
          <Image
            source={require("../img/gg-logo.png")}
            resizeMode="contain"
            style={styles.logo_icons}
          />
          <Image
            source={require("../img/fb-logo.png")}
            resizeMode="contain"
            style={styles.logo_icons}
          />
          <Image
            source={require("../img/phone-logo.png")}
            resizeMode="contain"
            style={styles.logo_icons}
          />
        </View>
        </KeyboardAvoidingView>

      </ImageBackground>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    paddingBottom: 0
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    marginTop: 50,
    width: "90%",
    backgroundColor: "none",
  },
  input: {
    marginBottom: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    color: Platform.OS === "web" ? "white" : "white",
  },
  links: {
    color: "white",
    marginBottom: 20,
    fontWeight: "300",
    borderWidth: 1,
    borderColor: "green",
    padding: 10,
    borderRadius: 10,
    fontStyle: "italic",
  },
  linksRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
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
    marginTop: 80,
  },
  logo_icons: {
    width: 60,
    height: 60,
    marginHorizontal: 10,
  },
});
