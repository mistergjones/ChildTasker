import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";

import Icon from "./Icon";
import Text from "./appText";

function appCategoryPickerItem({ item, onPress }) {
  if ("icon" in item) {
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <Icon
            backgroundColor={item.backgroundColor}
            name={item.icon}
            size={80}
          />
        </TouchableOpacity>
        <Text style={styles.label}>{item.label}</Text>
      </View>
    );
  } else if ("image" in item) {
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <Image source={item.image} style={styles.image} />
        </TouchableOpacity>
        <Text style={styles.label}>{item.label}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignItems: "center",
    width: "33%",
  },
  label: {
    marginTop: 5,
    textAlign: "center",
  },
  image: {
    width: 60,
    height: 60,
  },
});

export default appCategoryPickerItem;
