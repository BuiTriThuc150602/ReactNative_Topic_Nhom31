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
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CheckBox } from "react-native-elements/dist/checkbox/CheckBox";

const Register = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (event, selectedDate) => {
    if (event.type === "dismissed") {
      hideDatePicker();
      return;
    }
    const currentDate = selectedDate || date;
    setShowDate(false);
    setDate(currentDate);
    setDateOfBirth(formatTime(currentDate));
  };
  const showDatepicker = () => {
    setShowDate(true);
  };
  const hideDatePicker = () => {
    setShowDate(false);
  };

  function formatTime(time) {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${day}/${month}/${year}`;
  }

  const handleSignUp = async () => {
    if (
      userName.trim() === "" ||
      dateOfBirth.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() != password.trim()
    ) {
      alert("Wrong information");
    } else {
      sendUserData();
    }
  };
  const sendUserData = async () => {
    console.log("dob", date);
    console.log("New dob", new Date(date));
    try {
      const response = await fetch(
        "https://6540e47345bedb25bfc2d34b.mockapi.io/react-lab-todos/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            createdAt: new Date(),
            email: email,
            password: password,
            dateOfBirth: new Date(date),
            name: userName,
            likedNews: [],
            recenlyViewedNews: [],
          }),
        }
      );
      const data = await response.json();
      console.log("Success:", data);
      alert("Sign up success");
      navigation.goBack();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
          <TextInput
            placeholder="User Name"
            placeholderTextColor={"white"}
            style={styles.input}
            value={userName}
            onChangeText={(text) => setUserName(text)}
          />
          {showDate && (
            <DateTimePicker
              value={date}
              mode={"date"}
              display="spinner"
              onChange={onChange}
            />
          )}
          <TextInput
            placeholder="Date Of Birth"
            placeholderTextColor={"white"}
            style={styles.input}
            value={dateOfBirth}
            onChangeText={(text) => setDateOfBirth(text)}
            onFocus={showDatepicker}
          />
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
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor={"white"}
            style={styles.input}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry={!showPassword}
          />

          <View style={styles.linksRow}>
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
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={styles.links}>Have an account ? Sign In now</Text>
            </Pressable>
          </View>

          <Pressable style={styles.btnSignUp} onPress={() => handleSignUp()}>
            <Text style={styles.Login}>Sign Up</Text>
          </Pressable>
          <Text style={{ color: "white", marginTop: 50, textAlign: "center" }}>
            Sign in with
          </Text>
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
    paddingBottom: 0,
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
    color: "white",
  },
  links: {
    color: "white",
    marginBottom: 20,
    fontWeight: "300",
    padding: 10,
    fontStyle: "italic",
  },
  linksRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 0,
  },
  btnSignUp: {
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
    marginBottom: 25,
    marginLeft: 0,
  },
});
