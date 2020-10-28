// This modules caters for a typicl React Native Heading in our app
// We can pass the title and colour props into the buton
import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import colours from "../config/colours.js";

// import our standard library of colours
import colors from "../config/colours.js";
import AuthContext from "./auth/context.js";
import User from "../screens/login/User";

const AppButton = ({ title, color = "defaultHeadingColour" }) => {
    const { user } = useContext(AuthContext);
    return (
        <View style={[styles.button,]}>
            <Text style={styles.text}>{title}</Text>
            {/* {user && (
                <User
                    iconName={"human"}
                    color={"gold"}
                    username={user.username}
                />
            )} */}
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        // horizontally and vertically centre the text
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        // make button stretch to fill 90% its container
        width: "90%",
        margin: 20,
        // make the top app heading borders nice and curved
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowOpacity: 1
    },
    text: {
        color: colors.headingText,
        fontSize: 24,
        textTransform: "uppercase",
        fontWeight: "bold",
        textAlign: "center",
    },
    user: {
        color: colours.white,
    },
});
export default AppButton;
