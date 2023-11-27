import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
  Linking,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";

const Trending = ({ navigation, route }) => {
  navigation.setOptions({
    headerTitle: "Nổi Bật Hôm Nay",
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

  const [topTrending, setTopTrending] = useState(route.params?.trending || []);
  const [isLoading, setIsLoading] = useState(true);

  //fetch data if not have data
  useEffect(() => {
    if (topTrending.length === 0) {
      fetch(
        "https://newsapi.org/v2/top-headlines?country=us&apiKey=33f7b18dad144a419a41f633c53c8701"
      )
        .then((response) => response.json())
        .then((data) => {
          navigation.setParams({ trending: data.articles });
          setTopTrending(data.articles);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  useEffect(() => {
    if (topTrending.length !== 0 && topTrending) {
      setIsLoading(false);
    }
  }, [topTrending]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="skyblue" />
      </View>
    );
  }

  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <Pressable
          style={styles.items}
          onPress={() => navigation.navigate("Detail", { uri: item.url })}
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

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ width: "100%", height: "100%" }}>
        <Text style={styles.titleTop}>Tin nổi bật hôm nay</Text>
        <FlatList data={topTrending || []} renderItem={renderItem} />
      </SafeAreaView>
    </View>
  );
};

export default Trending;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  titleTop: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
    textAlign: "center",
    marginVertical: 15,
    borderBottomEndRadius: 10,
  },
});
