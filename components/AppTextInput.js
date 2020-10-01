import React from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function AppTextInput({ icon, labelText, error, errorStyle, ...otherProps }) {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.verticalContainer}>
                <Text style={styles.text}>{labelText}</Text>
                <View style={styles.iconLableContainer}>
                    {icon && (
                        <MaterialCommunityIcons
                            name={icon}
                            size={30}
                            color={"grey"}
                            style={styles.icon}
                        />
                    )}
                    <TextInput style={styles.textInput} {...otherProps} />
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
        color: "grey",
        backgroundColor: "red",
    },
    text: {
        fontWeight: "bold",
        color: "grey",
    },
    textInput: {
        fontSize: 18,
        color: "black",
        width: "100%",
    },
    verticalContainer: {
        width: "90%",
        marginVertical: 5,
        borderBottomColor: "black",
        borderBottomWidth: 1,
    },
    mainContainer: {
        alignItems: "center",
        marginTop: 10,
    },
});

export default AppTextInput;
