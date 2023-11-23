import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Feather, MaterialIcons, Ionicons } from "@expo/vector-icons";

const Info = ({ navigation, route }) => {
  const [showPassword, setShowPassword] = useState(false);
  const userLogin = route.params?.userLogin;
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const logout = () => {
    navigation.navigate("Login");
  };

  function formatTime(time) {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${day}/${month}/${year}`;
  }

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
        <Pressable style={styles.btnLogout} onPress={logout}>
          <MaterialIcons name="logout" size={20} color="red" />
          <Text style={styles.txtLogout}>Đăng Xuất</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Ionicons name="person-circle-outline" size={150} color="grey" />
      <View style={styles.btnView}>
        <Pressable style={styles.btn}>
          <Feather name="clock" size={24} color="green" />
          <Text style={styles.txt}>Đọc Gần Đây</Text>
        </Pressable>
        <Pressable style={styles.btn}>
          <Feather name="heart" size={24} color="red" />
          <Text style={styles.txt}>Đã Thích</Text>
        </Pressable>
      </View>
      <View style={styles.formInformation}>
        <View style={styles.form}>
          <Text style={styles.txtTitle}>Họ và tên:</Text>
          <Text style={styles.txt}>{userLogin.name}</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.txtTitle}>Ngày Sinh:</Text>
          <Text style={styles.txt}>{formatTime(userLogin.dateOfBirth)}</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.txtTitle}>Email:</Text>
          <Text style={styles.txt}>{userLogin.email}</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.txtTitle}>Password:</Text>
          <TextInput
            secureTextEntry={showPassword ? false : true}
            style={styles.pwd}
            value={userLogin.password}
            focusable={false}
          ></TextInput>
          <Pressable onPress={toggleShowPassword}>
            <Feather
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="black"
            />
          </Pressable>
        </View>

        <View style={styles.formBtn}>
          <Pressable style={styles.btn}>
            <Feather name="edit" size={24} color="orange" />
            <Text style={styles.txt}>Chỉnh sửa</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Info;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
  btnLogout: {
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "red",
    flexDirection: "row",
  },
  txtLogout: {
    color: "red",
    fontWeight: "bold",
    marginLeft: 5,
  },
  btnView: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "35%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "skyblue",
  },
  formInformation: {
    width: "90%",
    marginTop: 50,
  },
  form: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  txtTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  formBtn: {
    alignItems: "center",
    marginTop: 20,
  },
});
