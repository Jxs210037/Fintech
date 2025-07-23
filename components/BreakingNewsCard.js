import React from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function BreakingNewsCard({ item, handleClick }) {
  // ✅ Update to match GNews format
  if (!item?.image) {
    return (
      <View style={styles.imagePlaceholder}>
        <ActivityIndicator size="small" color="#555" />
        <Text style={{ marginTop: 10 }}>Loading image...</Text>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <View style={styles.cardContainer}>
        <Image
          source={{ uri: item.image }} // ✅ Use `image` not `urlToImage`
          style={styles.image}
          resizeMode="cover"
        />

        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.9)"]}
          style={styles.gradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />

        <View style={styles.textWrapper}>
          <View style={{ maxWidth: "98%" }}>
            <Text style={styles.title}>
              {item.title?.length > 60
                ? item.title.slice(0, 58) + "..."
                : item.title || "N/A"}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    position: "relative",
  },
  image: {
    width: width * 0.8,
    height: height * 0.22,
    borderRadius: 24,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  textWrapper: {
    position: "absolute",
    bottom: 24,
    left: 16,
    justifyContent: "flex-end",
    height: "80%",
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  imagePlaceholder: {
    width: width * 0.8,
    height: height * 0.22,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});
