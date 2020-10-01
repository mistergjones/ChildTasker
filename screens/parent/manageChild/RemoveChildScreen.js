import React, { useState } from "react";
import { View, StyleSheet, TextInput, Picker, ScrollView } from "react-native";

import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";
import AppLabel from "../../../components/appLabel";

import AppMaterialIcon from "../../../components/appMaterialCommunityIcon";
import screens from "../../../config/screens";

import AppPicker from "../../../components/appPicker";

function RemoveChildScreen({ navigation }) {
    // the below will change once we have data from teh server/text file
    const dummyTestChildren = [
        { label: "Bob", value: 1 },
        { label: "Alice", value: 2 },
    ];

    const dummyDecision = [
        { label: "Yes", value: 1 },
        { label: "No", value: 2 },
    ];

    return (
        <ScrollView style={styles.container}>
            <AppHeading title="Remove Child" />
            <View style={styles.rowAlignment}>
                <AppMaterialIcon iconName="account-child" iconSize={24} />
                <AppLabel labelText="Select Child's Name:" />
            </View>

            <AppPicker
                items={dummyTestChildren}
                icon="account-child"
                placeholder="Select Child"
            />

            <View style={styles.rowAlignment}>
                <AppMaterialIcon iconName="account-child" iconSize={24} />
                <AppLabel labelText="Confirmation" />
            </View>

            <AppPicker
                items={dummyDecision}
                icon="account-child"
                placeholder="Yes or No"
            />

            <AppButton title="Save Changes" />

            <AppButton
                title="Return"
                onPress={() =>
                    navigation.navigate(screens.ParentChildDashBoard)
                }
            />
        </ScrollView>
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

export default RemoveChildScreen;
