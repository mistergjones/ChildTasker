import React from "react";
import { View, StyleSheet } from "react-native";

import AppButton from "../components/appButton";
import AppHeading from "../components/appHeading.js";

function ParentDashBoardScreen(props) {
    return (
        <View style={styles.container}>
            <AppHeading title="Parent Dashboard" />

            <AppButton title="Create Tasks for Child" />

            <AppButton title="Add Edit Categories" />

            <AppButton title="Manage Rewards" />

            <AppButton title="Track Pocket Money" />

            <AppButton title="View Accomplishments" />

            <AppButton title="Manage Child Details" />

            <AppButton title="Return" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
});

export default ParentDashBoardScreen;
