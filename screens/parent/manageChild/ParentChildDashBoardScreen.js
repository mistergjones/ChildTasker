import React from "react";
import { View, StyleSheet } from "react-native";

import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";

function ParentChildDashBoardScreen(props) {
    return (
        <View style={styles.container}>
            <AppHeading title="Manage Child Dashboard" />

            <AppButton title="Add New Child" />

            <AppButton title="Edit Child Details" />

            <AppButton title="Remove Child" />

            <AppButton title="Return" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
});

export default ParentChildDashBoardScreen;
