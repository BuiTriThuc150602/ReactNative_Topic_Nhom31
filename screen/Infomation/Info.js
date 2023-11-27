import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

const Info = ({ navigation, route }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [userLogin, setUserLogin] = useState(route.params?.userLogin);

  // Modal for change information
  const [modalVisible, setModalVisible] = useState(false);
  //Infomation of user for change
  const [name, setName] = useState(userLogin.name);
  const [email, setEmail] = useState(userLogin.email);
  const [password, setPassword] = useState(userLogin.password);

  const [dateOfBirth, setDateOfBirth] = useState(
    new Date(userLogin.dateOfBirth)
  );
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [reloadUser, setReloadUser] = useState(false);
  const [dateToShow, setDateToShow] = useState(formatTime(dateOfBirth));

  useEffect(() => {
    const reload = async () => {
      try {
        const response = await fetch(
          `https://6540e47345bedb25bfc2d34b.mockapi.io/react-lab-todos/users/${userLogin.id}`
        );
        const data = await response.json();
        console.log("Success:", data);
        setUserLogin(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (reloadUser) {
      reload();
      setReloadUser(false);
    }
  }, [reloadUser]);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  //check email valid
  const validateEmail = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  };

  //handle save information
  const handleSave = () => {
    //save information to api server
    if (
      name.trim() === "" ||
      dateOfBirth.toString().trim() === "" ||
      !validateEmail(email) ||
      password.trim() === ""
    ) {
      alert("Wrong information");
    } else {
      sendUserData();
    }
  };
  const sendUserData = async () => {
    try {
      const response = await fetch(
        `https://6540e47345bedb25bfc2d34b.mockapi.io/react-lab-todos/users/${userLogin.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            dateOfBirth: new Date(date),
            name: name,
          }),
        }
      );
      const data = await response.json();
      console.log("Success:", data);
      setReloadUser(true);
      alert("Cập nhật thành công");
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    closeModal();
  };

  const handleCancel = () => {
    setName(userLogin.name);
    setDateOfBirth(userLogin.dateOfBirth);
    setEmail(userLogin.email);
    setPassword(userLogin.password);
    setShowPassword(false);
    closeModal();
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onChange = (event, selectedDate) => {
    if (event.type === "dismissed") {
      hideDatePicker();
      return;
    }
    const currentDate = selectedDate || date;
    setShowDate(false);
    setDate(currentDate);
    setDateOfBirth(currentDate);
    setDateToShow(formatTime(currentDate));
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

  return (
    <View style={styles.container}>
      <Ionicons name="person-circle-outline" size={150} color="grey" />
      <View style={styles.btnView}>
        <Pressable style={styles.btn} onPress={()=>navigation.navigate("Recently",{userlogin : userLogin})}>
          <Feather name="clock" size={24} color="green" />
          <Text style={styles.txt}>Đọc Gần Đây</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={()=>navigation.navigate("Liked")}>
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
          <Text style={styles.txt}>{dateToShow}</Text>
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
          <Pressable style={styles.btn} onPress={openModal}>
            <Feather name="edit" size={24} color="orange" />
            <Text style={styles.txt}>Chỉnh sửa</Text>
          </Pressable>
        </View>
      </View>

      {/* Modal for change information */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Cập Nhật thông Tin</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter your name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            {showDate && (
              <DateTimePicker
                value={dateOfBirth}
                mode={"date"}
                display="spinner"
                onChange={onChange}
              />
            )}
            <TextInput
              style={styles.modalInput}
              placeholder="Enter your date of birth"
              value={dateToShow}
              onChangeText={(text) => setDateOfBirth(text)}
              onFocus={showDatepicker}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <View
              style={[
                styles.modalInput,
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                },
              ]}
            >
              <TextInput
                secureTextEntry={showPassword ? false : true}
                style={[
                  styles.modalInput,
                  { width: "90%", borderWidth: 0, padding: 0, marginBottom: 0 },
                ]}
                placeholder="Enter your password"
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <Pressable onPress={toggleShowPassword}>
                <Feather
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color="black"
                />
              </Pressable>
            </View>

            <View style={styles.modalBtnView}>
              <Pressable style={styles.modalBtn} onPress={handleCancel}>
                <Feather name={"x"} size={20} color="red" />
                <Text style={[styles.modalBtnText, { color: "red" }]}>Hủy</Text>
              </Pressable>
              <Pressable style={styles.modalBtn} onPress={handleSave}>
                <Feather name={"save"} size={20} color="green" />
                <Text style={[styles.modalBtnText, { color: "green" }]}>
                  Lưu
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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

  // Modal for change information
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,.5)",
  },
  modalView: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  modalBtnView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalBtn: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "skyblue",
    width: "40%",
    alignItems: "center",
  },
  modalBtnText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  txt: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
