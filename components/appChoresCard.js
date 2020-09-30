import React from "react";
import { View, StyleSheet, Image } from "react-native";

import Text from "./appText";
import colors from "../config/colours";

function appChoresCard({ title, image, subTitle }) {
  return (
    <View style={styles.card}>
      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.subTitle} numberOfLines={2}>
          {subTitle}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    // backgroundColor: colors.white,
    backgroundColor: "#dfe6ed",
    marginTop: 20,
    marginBottom: 20,
    overflow: "hidden",
    width: "80%",
    height: 200,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 125,
  },
  subTitle: {
    color: colors.black,
    fontWeight: "bold",
  },
  imageContainer: {
    marginLeft: 75,
    marginRight: 75,
  },
  title: {
    fontWeight: "bold",
  },
});

export default appChoresCard;
