import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  Dimensions,
  Platform,
} from "react-native";
import Lightbox from "react-native-lightbox";
import { LogBox } from "react-native";

function HomeScreen() {
  const [cats, setCats] = useState("");

  useEffect(() => {
    const url =
      "https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng";

    const fetchCats = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setCats(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchCats();
  }, []);

  return (
    <View style={styles.homePageView}>
      <FlatList
        data={cats}
        style={styles.flatlistStyle}
        numColumns={Platform.OS === "web" ? 3 : 2}
        key={Platform.OS === "web" ? 3 : 2}
        renderItem={({ item }) => (
          <Lightbox
            useNativeDriver={true}
            renderContent={() => {
              return (
                <Image
                  style={styles.catImageLarge}
                  source={{ uri: item.url }}
                />
              );
            }}
          >
            <Image style={styles.catImage} source={{ uri: item.url }} />
          </Lightbox>
        )}
      />
    </View>
  );
}

const listWidth = Dimensions.get("window").width * 0.9;
const listMargin = Dimensions.get("window").width * 0.05;

const styles = StyleSheet.create({
  homePageView: {
    flex: 1,
    backgroundColor: "light-gray",
  },
  flatlistStyle: {
    width: listWidth,
    margin: listMargin,
  },
  catImage: {
    width: listWidth / (Platform.OS === "web" ? 3 : 2),
    aspectRatio: 1,
  },
  catImageLarge: {
    width: listWidth * 0.6,
    aspectRatio: 1,
    left: listWidth * 0.2,
  },
});

export default HomeScreen;

//these logs are not needed
LogBox.ignoreLogs([
  "Animated.event now requires a second argument for options",
  "Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`",
]);
