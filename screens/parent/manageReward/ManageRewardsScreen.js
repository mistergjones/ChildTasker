import React from "react";
import { View, StyleSheet } from "react-native";

import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";

function ManageRewardsScreen(props) {
    return (
        <View style={styles.container}>
            <AppHeading title="Manage Reward Dashboard" />

            <AppButton title="Add Reward" />

            <AppButton title="Edit Reward" />

            <AppButton title="Return" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
});

export default ManageRewardsScreen;
