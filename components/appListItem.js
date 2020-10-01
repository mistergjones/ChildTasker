import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import AppText from "./appText";
export default function appListItem({ title, subTitle, image }) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Image source={image} style={styles.image} />
        <View>
          <AppText style={styles.text}>{title}</AppText>
          <AppText style={styles.text}>{subTitle}</AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flexDirection: "row", margin: 5, width: "33%" },
  container: {
    flexDirection: "column",
  },
  image: {
    width: 70,
    height: 70,
    marginHorizontal: 10,
  },
  text: {
    textAlign: "center",
  },
});
