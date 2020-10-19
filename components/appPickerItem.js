import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

import Text from "./appText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";

function PickerItem({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>

      <MaterialCommunityIcons
        name={"account"}
        size={20}
        color={defaultStyles.colors.medium}
        style={styles.icon}
      />

      <Text style={styles.text}>{item.label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%"
  },
  text: {
    padding: 20,

  },
});

export default PickerItem;
