import React from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colours from "../config/colours";

function AppTextInput({ icon, labelText, error, errorStyle, ...otherProps }) {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.verticalContainer}>
                <Text style={styles.label}>{labelText}</Text>
                <View style={styles.iconLableContainer}>
                    {icon && (
                        <MaterialCommunityIcons
                            name={icon}
                            size={30}
                            color={colours.inputIcon}
                            style={styles.icon}
                        />
                    )}
                    <TextInput style={styles.textInput} placeholderTextColor={colours.inputPlaceholder}{...otherProps} />
                </View>
                {error && <Text style={errorStyle}>{error}</Text>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    iconLableContainer: {
        flexDirection: "row",
        width: "100%",
        marginVertical: 10,
    },
    icon: {
        marginRight: 10,
    },
    label: {
        color: colours.inputLabel,

    },
    text: {
        fontWeight: "bold",
        color: colours.inputText,

    },
    textInput: {
        fontSize: 18,
        color: colours.inputText,
        width: "100%",
    },
    verticalContainer: {
        width: "90%",
        marginVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: colours.defaultHeadingColour,
        shadowOpacity: 1
    },
    mainContainer: {
        alignItems: "center",
        marginTop: 10,
        // backgroundColor: colours.defaultHeadingCol,

    },
});

export default AppTextInput;
