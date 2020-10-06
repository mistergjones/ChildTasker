import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableHighlightComponent,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native";
import screens from "../config/screens";
import AppMaterialIcon from "../components/appMaterialCommunityIcon";

function TaskIcon({ title, icon, points }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(screens.ChoreStatus, { title, icon, points })
      }
    >
      <View style={styles.container}>
        <Text>{title}</Text>
        <AppMaterialIcon iconName={icon} iconSize={60} iconColor="blue" />
        <Text>Points: {points}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TaskIcon;
