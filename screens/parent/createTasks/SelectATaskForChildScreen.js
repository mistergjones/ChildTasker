import React from "react";
import { View, StyleSheet } from "react-native";

import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";
import AppLabel from "../../../components/appLabel";

import AppMaterialIcon from "../../../components/appMaterialCommunityIcon";

function SelectATaskForChildScreen(props) {
    return (
        <View style={styles.container}>
            <AppHeading title="Select a Task to Add" />

            <AppLabel labelText="Place task icon here" />
            <View style={{ marginBottom: 30 }}></View>

            <AppLabel labelText="Place drop down box here with task points" />

            <View style={{ marginBottom: 30 }}></View>

            <View style={styles.rowAlignment}>
                <AppLabel labelText="Circle 1 here  " />
                <AppLabel labelText="  Circle 2 here" />
            </View>

            <View style={styles.rowAlignment}>
                <AppButton title="Save" />
                <AppButton title="Add Another" />
            </View>

            <AppButton title="Return" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    rowAlignment: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default SelectATaskForChildScreen;
