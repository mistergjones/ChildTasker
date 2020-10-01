import React, { useState } from "react";
import { View, StyleSheet, TextInput, Picker } from "react-native";

import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";

import AppLabel from "../../../components/appLabel";

import screens from "../../../config/screens";
import AppMaterialIcon from "../../../components/appMaterialCommunityIcon";

import AppPicker from "../../../components/appPicker";

function CreateTaskListForChildScreen({ navigation }) {
    // the below will change once we have data from teh server/text file
    const dummyTestChildren = [
        { label: "Bob", value: 1 },
        { label: "Alice", value: 2 },
    ];

    return (
        <View style={styles.container}>
            <AppHeading title="Create Task For Child" />

            <AppPicker
                items={dummyTestChildren}
                icon="apps"
                placeholder="Select Child"
            />

            <AppLabel
                labelText="PUT THE GRID ELEMENT HERE"
                style={{ paddingmarginBottom: 40 }}
            />

            <AppLabel labelText="Select Cateogory:" />

            <AppButton title="Finalise Changes" />

            <AppButton
                title="Return"
                onPress={() => navigation.navigate(screens.ParentDashBoard)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    picker: {
        marginBottom: 150,
        height: 50,
        width: 150,
        alignSelf: "center",
    },
});

export default CreateTaskListForChildScreen;
