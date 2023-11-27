import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";

const RecentlyView = ({ navigation, route }) => {
  const [recenlyViewNews, setRecenlyViewNews] = useState([]);
  const { userLogin } = route.params;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Tin Đã Xem",
      headerTitleAlign: "center",
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "skyblue",
      },
    });
  }, [navigation]);

  const getRecenlyViewNews = async () => {
    try {
      const response = await fetch(
        `https://6540e47345bedb25bfc2d34b.mockapi.io/react-lab-todos/users/${userLogin.id}`
      );
      const data = await response.json();
      setRecenlyViewNews(data.recenlyViewedNews);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getRecenlyViewNews();
      setIsLoading(false);
    }, [navigation, recenlyViewNews])
  );

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

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="skyblue" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {recenlyViewNews && recenlyViewNews.length === 0 && (
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "gray" }}>
            Chưa có tin nào được xem gần đây !
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "gray" }}>
            Hãy đến trang tin tức để xem tin tức mới nhất !
          </Text>
          <Pressable
            style={styles.goNews}
            onPress={() => navigation.navigate("News")}
          >
            <Text style={{ fontWeight: "600", color: "gray" }}>
              Đến Trang Tin Tức
            </Text>
          </Pressable>
        </View>
      )}
      <SafeAreaView style={{ width: "100%", height: "100%" }}>
        <FlatList data={recenlyViewNews} renderItem={renderItem} />
      </SafeAreaView>
    </View>
  );
};

export default RecentlyView;
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
  goNews: {
    marginTop: 20,
    paddingHorizontal: 20,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    borderColor: "green",
    borderWidth: 1,
  },
});
