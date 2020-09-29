import React from "react";
import { View, StyleSheet } from "react-native";

import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";
import AppLabel from "../../../components/appLabel";

import AppMaterialIcon from "../../../components/appMaterialCommunityIcon";

function ManageRewardsScreen(props) {
    return (
        <View style={styles.container}>
            <AppHeading title="Manage Reward Dashboard" />

            <View style={{ marginBottom: 30 }} />
            <AppLabel labelText="Trophy cabinet with icons here" />
            <View style={{ marginBottom: 30 }} />

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
