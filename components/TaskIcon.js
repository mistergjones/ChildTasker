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
import colours from "../config/colours";

function TaskIcon({ title, icon, points, style }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(screens.ChoreStatus, { title, icon, points })
      }
    >
      <View style={style}>
        <Text>{title}</Text>
        <AppMaterialIcon
          iconName={icon}
          iconSize={60}
          iconColor={colours.defaultButtonColour}
        />
        <Text>{points}</Text>
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
