import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  Image,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import SwiperFlatList from "react-native-swiper-flatlist";

const Home = ({ navigation }) => {
  const [result, setResult] = useState(null);
  navigation.setOptions({
    headerTitle: "Tin Tức",
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://newsapi.org/v2/everything?q=Apple&language=vi&apiKey=33f7b18dad144a419a41f633c53c8701"
        );
        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <Pressable
          style={styles.items}
          onPress={() => Linking.getInitialURL(item.url)}
        >
          <Image source={{ uri: item.urlToImage }} style={styles.img} />
          <View style={styles.sourceView}>
            <Text style={styles.logoSource}>{item.source.name}</Text>
            <Text style={{ fontStyle: "italic" }}>
              {formatTime(item.publishedAt)}
            </Text>
          </View>
          <Text style={styles.title}>{item.title}</Text>
        </Pressable>
      </View>
    );
  };

  function formatTime(time) {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${day}/${month}/${year}`;
  }

  const images = result?.articles
    ? result.articles
        .sort(() => Math.random() - 0.5) 
        .slice(0, 3)
        .map((item) => item.urlToImage)
    : [];

  const handlePressImage = (index) => {
    console.log(`Image at index ${index} pressed.`);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.swiperContainer}>
          <Text style={styles.titleTop}>Tin Tức Nổi Bật</Text>
          <SwiperFlatList
            data={images}
            autoplay
            autoplayDelay={3}
            autoplayLoop
            onPress={handlePressImage}
            showPagination
            paginationDefaultColor="gray"
            paginationActiveColor="cyan"
            paginationStyleItem={{ width: 8, height: 8 }}
            paginationStyleItemActive={{ width: 12, height: 12 }}
            renderItem={({ item }) => (
              <View style={styles.swiperItem}>
                <Image
                  source={{ uri: item }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                />
              </View>
            )}
          />
        </View>
        <FlatList data={result?.articles || []} renderItem={renderItem} />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  titleTop: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
    textAlign: "center",
    marginVertical: 15,
  },
  swiperContainer: {
    width: "100%",
    height: 300,
    marginBottom: 20,
    borderWidth: 1,
  },
  swiperItem: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    marginHorizontal: 10,
  },
  items: {
    width: "90%",
    height: 320,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 10,
  },
  img: {
    width: "100%",
    height: "60%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: "gray",
  },
  sourceView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  logoSource: {
    fontSize: 15,
    fontWeight: "bold",
    color: "red",
  },
});
