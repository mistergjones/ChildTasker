import React from "react";
import { View, StyleSheet, Image } from "react-native";

import Text from "./appText";
import colors from "../config/colours";
import AppMaterialCommunityIcon from "./appMaterialCommunityIcon";
import colours from "../config/colours";

function appChoresCard({ title, icon, subTitle }) {
  return (
    <View style={styles.card}>
      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <AppMaterialCommunityIcon
          iconName={icon}
          iconSize={100}
          iconColor={colours.white}
        />
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
    backgroundColor: colours.defaultButtonColour,
    marginTop: 20,
    marginBottom: 20,
    overflow: "hidden",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,

  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    // width: "100%",
    // height: 125,
  },
  subTitle: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 24
  },
  imageContainer: {
    marginLeft: 75,
    marginRight: 75,
  },
  title: {
    fontWeight: "bold",
    color: colours.white,
    fontSize: 24
  },
});

export default appChoresCard;
