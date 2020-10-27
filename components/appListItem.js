import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";
import AppText from "./appText";
export default function appListItem({ title, subTitle, image, icon }) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        {/* <Image source={image} style={styles.image} /> */}
        <MaterialCommunityIcons
          name={icon}
          size={60}
          color={defaultStyles.colors.medium}
          style={styles.image}
        />
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
