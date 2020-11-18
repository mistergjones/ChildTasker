import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";

import Text from "./appText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";
let widthStyle = "";
function PickerItem({ item, onPress, numColumns }) {
    // GJ: commented out the below line to ensure the alignment of all icons looks good. The line below didn't seem to do anything anyway.
    // widthStyle = (100 / numColumns).toFixed(0);
    // console.log("width style = ", widthStyle);
    // console.log("-- item" + Object.keys(item));

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <MaterialCommunityIcons
                name={item.icon}
                size={40}
                color={item.color}
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
    },
    text: {
        padding: 20,
        width: 125,
        alignSelf: "center",
    },
});

export default PickerItem;
