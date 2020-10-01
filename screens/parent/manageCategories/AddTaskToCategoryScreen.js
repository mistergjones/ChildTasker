import React from "react";
import { View, StyleSheet } from "react-native";
import screens from "../../../config/screens";
import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";
import AppLabel from "../../../components/appLabel";

import AppPicker from "../../../components/appPicker";

function AddTaskToCategoryScreen({ navigation }) {
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
            <AppHeading title="Add Task To Category" />

            <AppLabel labelText="Show Category Icon here" />

            <AppPicker
                items={dummyTasks}
                icon="account-child"
                placeholder="Select Task"
            />

            <AppPicker
                items={dummyTaskPoints}
                icon="account-child"
                placeholder="Assign Points"
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
