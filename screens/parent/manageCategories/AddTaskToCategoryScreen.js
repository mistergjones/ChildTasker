import React from "react";
import { View, StyleSheet } from "react-native";
import screens from "../../../config/screens";
import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";
import AppLabel from "../../../components/appLabel";

import AppPicker from "../../../components/appPicker";

function AddTaskToCategoryScreen({ navigation }) {
    const dummyTasks = [
        { label: "Make the table", id: 1 },
        { label: "Wash dishes", id: 2 },
        { label: "Dry dishes", id: 3 },
        { label: "Eat all vegetables", id: 4 },
        { label: "Put dishes away", id: 5 },
    ];

    const dummyTaskPoints = [
        { label: "1", id: 1 },
        { label: "2", id: 2 },
        { label: "3", id: 3 },
        { label: "4", id: 4 },
        { label: "5", id: 5 },
        { label: "6", id: 6 },
        { label: "7", id: 7 },
        { label: "8", id: 8 },
        { label: "9", id: 9 },
        { label: "10", id: 10 },
    ];

    return (
        <View style={styles.container}>
            <AppHeading title="Add Task To Category" />

            <AppLabel labelText="Show Category Icon here" />

            <AppPicker
                items={dummyTasks}
                icon="account-child"
                placeholder="Select Task"
                heading="Select Task"
            />

            <AppPicker
                items={dummyTaskPoints}
                icon="account-child"
                placeholder="Assign Points"
                heading="Select Point"
            />

            <AppButton title="Add New Tasks" />

            <AppButton title="Edit Tasks" />

            <AppButton
                title="Return"
                onPress={() => navigation.navigate(screens.ParentDashBoard)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
});

export default AddTaskToCategoryScreen;
