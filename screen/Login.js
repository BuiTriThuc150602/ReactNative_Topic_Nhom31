import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import React from "react";

const Login = () => {
  return (
    <View style={styles.container}>
      <View style={styles.backGround}>
        <Image
          source={require("../img/background_login.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>An app made for learning</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput placeholder="username" style={styles.input} />
        <TextInput placeholder="password" style={styles.input} />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#3498db",
        flex: 1,
    },
    backGround: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 200,
        height: 200,
    },
    title: {
        fontSize: 20,
        color: "#fff",
        marginTop: 10,
    },
    formContainer: {
        flex: 1,
        padding: 20,
    },
    input: {
        backgroundColor: "#fff",
        marginBottom: 10,
        borderRadius: 5,
        padding: 10,
    },

});
