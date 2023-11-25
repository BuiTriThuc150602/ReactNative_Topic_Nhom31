import { StyleSheet} from "react-native";
import React ,{ useState } from "react";
import WebView from "react-native-webview";

const Detail = ({ navigation,route }) => {
  const [data, setData] = useState([]);
  const uri = route.params?.uri || '';

  navigation.setOptions({
    headerTitle: "Chi tiết",
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
    <WebView source={{uri:uri}} style={styles.container}/>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 10,
  },
});
