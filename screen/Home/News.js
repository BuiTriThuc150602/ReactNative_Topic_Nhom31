import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import SwiperFlatList from "react-native-swiper-flatlist";
import { Feather } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import { Platform } from "react-native";

const News = ({ navigation, route }) => {
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

  const { width, height } =
    Platform.OS === "web" ? window.screen : Dimensions.get("window");

  const userLogin = route.params?.userLogin || {};

  const [likedNewsList, setLikedNewsList] = useState(userLogin.likedNews || []);
  const [recenlyViewedNewsList, setRecenlyViewedNewsList] = useState(
    userLogin.recenlyViewedNews || []
  );
  const [like, setLike] = useState(false);

  const [result, setResult] = useState(null);
  const searchRef = useRef("");
  const [searchPressed, setSearchPressed] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [topTrending, setTopTrending] = useState([]);

  const typeFilter = ["Nguồn", "Từ khóa"];
  const sourceFilter = ["Tất cả", "VNExpress", "Tinh Tế", "Sputnik", "VOA"];
  const [filter, setFilter] = useState(typeFilter[0]);
  const [source, setSource] = useState(sourceFilter[0]);
  const [keyword, setKeyword] = useState("");
  const [url, setUrl] = useState(
    "https://newsapi.org/v2/everything?domains=vnexpress.net,tinhte.vn,sputniknews.vn,voatiengviet.com&apiKey=a33101552b2d4a8790942eda3c504098"
  );
  const [filterPressed, setFilterPressed] = useState(false);

  //Top Trending
  //************** */
  useEffect(() => {
    const getTopTrending = async () => {
      try {
        const response = await fetch(
          "https://newsapi.org/v2/everything?domains=vnexpress.net,tinhte.vn&page=1&pageSize=10&apiKey=a33101552b2d4a8790942eda3c504098"
        );
        const data = await response.json();
        setTopTrending(data.articles || []);
      } catch (error) {
        console.error("Error fetching data topTrending:", error);
      }
    };
    getTopTrending();
  }, []);

  useEffect(() => {
    const getFilter = async () => {
      if (filter === typeFilter[0]) {
        if (source === sourceFilter[0]) {
          setUrl(
            "https://newsapi.org/v2/everything?domains=vnexpress.net,tinhte.vn,sputniknews.vn,voatiengviet.com&page=1&pageSize=20&apiKey=a33101552b2d4a8790942eda3c504098"
          );
        } else if (source === sourceFilter[1]) {
          setUrl(
            "https://newsapi.org/v2/everything?domains=vnexpress.net&page=1&pageSize=10&apiKey=a33101552b2d4a8790942eda3c504098"
          );
        } else if (source === sourceFilter[2]) {
          setUrl(
            "https://newsapi.org/v2/everything?domains=tinhte.vn&page=1&pageSize=10&apiKey=a33101552b2d4a8790942eda3c504098"
          );
        } else if (source === sourceFilter[3]) {
          setUrl(
            "https://newsapi.org/v2/everything?domains=sputniknews.vn&page=1&pageSize=10&apiKey=a33101552b2d4a8790942eda3c504098"
          );
        } else if (source === sourceFilter[4]) {
          setUrl(
            "https://newsapi.org/v2/everything?domains=voatiengviet.com&page=1&pageSize=10&apiKey=a33101552b2d4a8790942eda3c504098"
          );
        }
      } else if (filter === typeFilter[1]) {
        if (keyword === "") {
          setUrl(
            "https://newsapi.org/v2/everything?domains=vnexpress.net,tinhte.vn,sputniknews.vn,voatiengviet.com&page=1&pageSize=10&apiKey=a33101552b2d4a8790942eda3c504098"
          );
        } else {
          setUrl(
            `https://newsapi.org/v2/everything?q=${keyword}&language=vi&page=1&pageSize=20&apiKey=a33101552b2d4a8790942eda3c504098`
          );
        }
      }
    };
    if (filterPressed) {
      setFilterPressed(false);
      getFilter();
    }
  }, [filterPressed]);

  //Get data from API
  //************** */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [url]);

  //Search
  //************** */

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

  //Loading
  //************** */
  useEffect(() => {
    if (result !== null) {
      setIsLoading(false);
    }
  }, [result, searchResult]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="skyblue" />
      </View>
    );
  }

  //Render Item
  //************** */

  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <Pressable
          style={styles.items}
          onPress={() => {
            navigation.navigate("Detail", { uri: item.url });
            recenlyViewedHandler.bind(this, { item })();
          }}
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
        <Pressable style={styles.btnLike}>
          <Feather
            name="heart"
            size={25}
            color={likedNewsList.includes(item) ? "red" : "gray"}
            onPress={likePressed.bind(this, { item })}
          />
        </Pressable>
      </View>
    );
  };

  //Like Pressed
  //************** */
  const likePressed = ({ item }) => {
    setLike(!like);
    setLikedNewsList((prevLikedNewsList) => {
      const newLikedNewsList = like
        ? prevLikedNewsList.filter((likedItem) => likedItem !== item)
        : [...prevLikedNewsList, item];
      const updateLikedNewsList = async () => {
        try {
          await fetch(
            `https://6540e47345bedb25bfc2d34b.mockapi.io/react-lab-todos/users/${userLogin.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                likedNews: newLikedNewsList,
              }),
            }
          );
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu:", error);
        }
      };
      updateLikedNewsList();

      return newLikedNewsList;
    });
  };

  //Recenly Viewed Handler
  //************** */
  const recenlyViewedHandler = ({ item }) => {
    setRecenlyViewedNewsList((prevRecenlyViewedNewsList) => {
      const newRecenlyViewedNewsList =
        recenlyViewedNewsList.length < 10
          ? [...prevRecenlyViewedNewsList, item]
          : [...prevRecenlyViewedNewsList.slice(1, 10), item];

      const updateRecenlyViewedNewsList = async () => {
        try {
          await fetch(
            `https://6540e47345bedb25bfc2d34b.mockapi.io/react-lab-todos/users/${userLogin.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                recenlyViewedNews: newRecenlyViewedNewsList,
              }),
            }
          );
        } catch (error) {
          console.error("Error fetch data :", error);
        }
      };
      updateRecenlyViewedNewsList();

      return newRecenlyViewedNewsList;
    });
  };

  function checkLiked(item) {
    if (likedNewsList.includes(item)) {
      return true;
    } else {
      return false;
    }
  }

  //Format Time
  //************** */
  function formatTime(time) {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${day}/${month}/${year}`;
  }

  return (
    <View style={styles.container}>
      <View style={{ width: width }}>
        <View style={styles.searchView}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm"
            onChangeText={(text) => (searchRef.current = text)}
          />
          <Pressable
            style={styles.searchButton}
            onPress={() => setSearchPressed(true)}
          >
            <Text style={{ fontWeight: "600", color: "gray" }}>Tìm</Text>
          </Pressable>
        </View>
        <View style={styles.searchView}>
          <View style={styles.filterInput}>
            <Text style={styles.filterText}>Lọc theo: </Text>
            <View style={styles.filterInput}>
              <SelectDropdown
                data={typeFilter}
                onSelect={(selectedItem) => {
                  setFilter(selectedItem);
                }}
                defaultButtonText={typeFilter[0]}
                buttonStyle={styles.filterButton}
                buttonTextStyle={styles.filterButtonText}
                dropdownStyle={styles.filterDropdown}
                rowStyle={styles.filterRow}
                renderDropdownIcon={() => (
                  <Feather name="chevron-down" size={20} color="gray" />
                )}
              />
              {filter === typeFilter[0] ? (
                <SelectDropdown
                  data={sourceFilter}
                  onSelect={(selectedItem) => {
                    setSource(selectedItem);
                  }}
                  defaultButtonText={sourceFilter[0]}
                  buttonStyle={[
                    styles.filterButton,
                    { width: 130, marginHorizontal: 10 },
                  ]}
                  buttonTextStyle={styles.filterButtonText}
                  dropdownStyle={styles.filterDropdown}
                  rowStyle={styles.filterRow}
                  renderDropdownIcon={() => (
                    <Feather name="chevron-down" size={20} color="gray" />
                  )}
                />
              ) : (
                <TextInput
                  style={styles.filterKeryword}
                  placeholder="Nhập từ khóa"
                  onChangeText={(text) => setKeyword(text)}
                />
              )}
            </View>
          </View>
          <Pressable
            onPress={() => setFilterPressed(true)}
            style={styles.searchButton}
          >
            <Feather name="filter" size={25} color="gray" />
          </Pressable>
        </View>
      </View>
      <ScrollView style={{ width: width }}>
        {searchResult && searchResult.length === 0 && (
          <View style={{}}>
            <Text style={styles.titleTop}>
              Tin Tức Liên Quan Đến : {searchRef.current}
            </Text>
            <View style={{ width: width, height: 150 }}>
              <Text
                style={{
                  textAlign: "center",
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                Không tìm thấy kết quả
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                Vui lòng thử lại
              </Text>
            </View>
            <Pressable
              style={styles.searchButton}
              onPress={() => setSearchResult(null)}
            >
              <Text style={{ fontWeight: "600", color: "gray" }}>Quay lại</Text>
            </Pressable>
          </View>
        )}
        {searchResult && searchResult.length > 0 && (
          <SafeAreaView>
            <Text style={styles.titleTop}>
              Tin Tức Liên Quan Đến : {searchRef.current}
            </Text>
            <FlatList
              data={searchResult || result?.articles || []}
              renderItem={renderItem}
            />
            <Text style={styles.titleTop}>
              Bạn đã xem hết tin tức về : {searchRef.current}
            </Text>
            <Pressable
              style={[
                styles.searchButton,
                { marginBottom: 20, width: width / 2, alignSelf: "center" },
              ]}
              onPress={() => setSearchResult(null)}
            >
              <Text style={{ fontWeight: "600", color: "gray" }}>Quay lại</Text>
            </Pressable>
          </SafeAreaView>
        )}
        {!searchResult && !searchPressed && (
          <SafeAreaView>
            <View style={styles.swiperContainer}>
              <Text style={styles.titleTop}>Tin Tức Nổi Bật</Text>
              <SwiperFlatList
                data={topTrending.slice(0, 3)}
                autoplay
                autoplayDelay={3}
                autoplayLoop
                showPagination
                paginationDefaultColor="gray"
                paginationActiveColor="cyan"
                paginationStyleItem={{ width: 8, height: 8 }}
                paginationStyleItemActive={{ width: 12, height: 12 }}
                renderItem={({ item }) => (
                  <View style={styles.swiperItem}>
                    <Pressable
                      style={styles.items}
                      onPress={() =>
                        navigation.navigate("Detail", { uri: item.url })
                      }
                    >
                      <Image
                        source={{ uri: item.urlToImage }}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="cover"
                      />
                    </Pressable>
                  </View>
                )}
              />
              <Pressable
                style={styles.seeMoreBtn}
                onPress={() =>
                  navigation.navigate("Nổi Bật", { trending: topTrending })
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
            <Text style={styles.titleTop}>Tin Tức Hôm Nay </Text>
            <FlatList
              data={searchResult || result?.articles || []}
              renderItem={renderItem}
            />
          </SafeAreaView>
        )}
      </ScrollView>
    </View>
  );
};

export default News;

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
    paddingHorizontal: 5,
  },

  btnLike: {
    position: "absolute",
    bottom: 20,
    right: 30,
    opacity: 0.5,
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
    flex: 1,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    borderColor: "green",
    borderWidth: 1,
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
  filterText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "gray",
    marginBottom: 10,
  },
  filterButton: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 5,
    marginBottom: 10,
    borderWidth: 0.5,
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "gray",
  },
  filterDropdown: {
    width: 150,
    height: "auto",
    borderRadius: 10,
    borderWidth: 0.5,
    zIndex: 1,
  },
  filterRow: {
    margin: 5,
  },
  filterKeryword: {
    width: 130,
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginLeft: 10,
    borderWidth: 0.5,
  },
  filterInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});
