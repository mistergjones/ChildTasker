import React from "react";
import { View, StyleSheet } from "react-native";

import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";

function SelectATaskForChildScreen(props) {
    return (
        <View style={styles.container}>
            <AppHeading title="Select a Task to Add" />

            <AppButton title="Save" />

            <AppButton title="Add Another" />

            <AppButton title="Return" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
});

export default SelectATaskForChildScreen;
