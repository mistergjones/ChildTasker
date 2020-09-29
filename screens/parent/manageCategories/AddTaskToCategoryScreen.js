import React from "react";
import { View, StyleSheet } from "react-native";

import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";

function AddTaskToCategoryScreen(props) {
    return (
        <View style={styles.container}>
            <AppHeading title="Add Task To Category" />

            <AppButton title="Add New Tasks" />

            <AppButton title="Edit Tasks" />

            <AppButton title="Return" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
});

export default AddTaskToCategoryScreen;
