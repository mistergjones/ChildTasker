import React from "react";
import { View, StyleSheet } from "react-native";

import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";

function AddCategoryScreen(props) {
    return (
        <View style={styles.container}>
            <AppHeading title="Add a Category" />

            <AppButton title="Add New Category" />

            <AppButton title="Edit Category" />

            <AppButton title="Return" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
});

export default AddCategoryScreen;
