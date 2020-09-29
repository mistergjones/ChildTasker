import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";

function CreateTaskListForChildScreen(props) {
    return (
        <View style={styles.container}>
            <AppHeading title="Create Task For Child" />

            <AppButton title="Finalise Changes" />

            <AppButton title="Return" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
});

export default CreateTaskListForChildScreen;
