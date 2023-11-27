import { ActivityIndicator, StyleSheet, View} from "react-native";
import React ,{ useState } from "react";
import WebView from "react-native-webview";

const Detail = ({ navigation,route }) => {
  const uri = route.params?.uri || '';
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View style={styles.container}>
      {isLoading && (
        <ActivityIndicator
          style={styles.activityIndicator}
          size="large"
          color="skyblue"
        />
      )}
      
      <WebView source={{uri:uri}} style={styles.container} onLoad={()=>setIsLoading(false)}/>
    </View>
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
