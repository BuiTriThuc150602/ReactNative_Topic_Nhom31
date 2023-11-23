import {
  FlatList,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import SwiperFlatList from "react-native-swiper-flatlist";
import { Feather } from "@expo/vector-icons";

const Home = ({ navigation }) => {
  const [result, setResult] = useState(null);
  const searchRef = useRef("");
  const [searchPressed, setSearchPressed] = useState(false);
  const [searchResult, setSearchResult] = useState(null);

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

  useEffect(() => {
    const handleSearch = async () => {
      if (searchRef.current.trim() === "") {
        setSearchResult(null);
      } else {
        const filteredResult = result?.articles.filter((item) =>
          item.title.toLowerCase().includes(searchRef.current.toLowerCase())
        );
        setSearchResult(filteredResult);
      }
    };

    if (searchPressed) {
      handleSearch();
      setSearchPressed(false);
    }
  }, [result, searchPressed]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <Pressable
          style={styles.items}
          onPress={() => Linking.openURL(item.url)}
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

  const topTrending = searchResult
    ? searchResult.sort(() => Math.random() - 0.5).slice(0, 10)
    : result?.articles
    ? result.articles.sort(() => Math.random() - 0.5).slice(0, 10)
    : [];

  const handlePressImage = (index) => {
    console.log(`Image at index ${index} pressed.`);
  };

  const handleSearch = () => {
    setSearchPressed(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.searchView}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm"
            onChangeText={(text) => (searchRef.current = text)}
          />
          <Pressable style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>
              Tìm
              <Feather
                name="search"
                style={{ width: 35, height: 35, marginLeft: 10 }}
                color="gray"
              />
            </Text>
          </Pressable>
        </View>
        <View style={styles.swiperContainer}>
          <Text style={styles.titleTop}>Tin Tức Nổi Bật</Text>
          <SwiperFlatList
            data={topTrending.slice(0, 3)}
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
                  source={{ uri: item.urlToImage }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                />
              </View>
            )}
          />
          <Pressable
            style={styles.seeMoreBtn}
            onPress={() =>
              navigation.navigate("Trending", { trending: topTrending })
            }
          >
            <Text style={styles.seeMoreTrending}>
              Xem Thêm
              <Feather
                name="arrow-right"
                style={{ width: 35, height: 35, marginLeft: 10 }}
                color="gray"
              />
            </Text>
          </Pressable>
        </View>
        <FlatList
          data={searchResult || result?.articles || []}
          renderItem={renderItem}
        />
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
    width: "100vw",
    height: 300,
    marginBottom: 20,
    borderWidth: 1,
  },
  swiperItem: {
    width: 320,
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    borderBottomWidth: 1,
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
  searchView: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 15,
  },
  searchInput: {
    width: "80%",
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    margin: 10,
    borderWidth: 0.5,
  },
  searchButton: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginVertical: 10,
    borderRadius: 15,
    borderColor: "green",
    borderWidth: 1,
  },
  searchButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
  },
  seeMoreBtn: {
    width: "90%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  seeMoreTrending: {
    textAlign: "right",
    fontSize: 15,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "gray",
  },
});
