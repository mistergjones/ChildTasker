import React from "react";
import colours from "../config/colours";
import { View, StyleSheet, Text } from "react-native";

import MaterialCommunityIcon from "../components/appMaterialCommunityIcon";

function appLabel({ labelText, materialIcon }) {
    return (
        <View style={styles.container}>
            <Text style={styles.textFormatting}>{labelText}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    textFormatting: {
        color: colours.text,
        fontSize: 24,
        fontWeight: "bold",
        justifyContent: "center",
        alignSelf: "center",
    },
});

export default appLabel;
