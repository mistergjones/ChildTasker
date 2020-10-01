import React from "react";
import { View, StyleSheet } from "react-native";

import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";
import AppLabel from "../../../components/appLabel";

import AppMaterialIcon from "../../../components/appMaterialCommunityIcon";

import AppPicker from "../../../components/appPicker";

function SelectATaskForChildScreen(props) {
    const dummyTasks = [
        { label: "Make the table", value: 1 },
        { label: "Wash dishes", value: 2 },
        { label: "Dry dishes", value: 3 },
        { label: "Eat all vegetables", value: 4 },
        { label: "Put dishes away", value: 5 },
    ];

    const dummyTaskPoints = [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
        { label: "6", value: 6 },
        { label: "7", value: 7 },
        { label: "8", value: 8 },
        { label: "9", value: 9 },
        { label: "10", value: 10 },
    ];
    return (
        <View style={styles.container}>
            <AppHeading title="Select a Task to Add" />

            <AppLabel labelText="Place task icon here" />
            <View style={{ marginBottom: 30 }}></View>

            <AppPicker
                items={dummyTasks}
                icon="account-child"
                placeholder="Select Task"
            />

            <AppPicker
                items={dummyTaskPoints}
                icon="account-child"
                placeholder="Points are read only"
            />

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
