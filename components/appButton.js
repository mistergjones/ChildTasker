// This modules caters for a typicl React Native Button in our app
// We can pass the title, onPress and coloiur props into the buton
import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

// import our standard library of colours
import colors from "../config/colours.js";

const AppButton = ({
    title,
    onPress,
    color = "defaultButtonColour",
    isDisabled,
}) => {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: colors[color] }]}
            onPress={onPress}
            disabled={isDisabled}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        // horizontally and vertically centre the text
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        // make button stretch to fill 90% its container
        width: "90%",
        margin: 20,
    },
    text: {
        color: colors.white,
        fontSize: 18,
        textTransform: "uppercase",
        fontWeight: "bold",
    },
});
export default AppButton;
