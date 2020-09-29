import React from "react";
import { View, StyleSheet } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import colours from "../config/colours.js";

function appMaterialCommunityIcon({ iconName, iconSize }) {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name={iconName} size={iconSize} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        color: colours.black,
    },
});

export default appMaterialCommunityIcon;
