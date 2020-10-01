import React from "react";
import { View, StyleSheet } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import colours from "../config/colours.js";

function appMaterialCommunityIcon({ iconName, iconSize, iconColor = "black" }) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={iconName}
        size={iconSize}
        color={iconColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    color: colours.black,
  },
});

export default appMaterialCommunityIcon;
