import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";

import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";

import AppLabel from "../../../components/appLabel";
// the below is to pass screens/child as per mosh bideo
import Screen from "../../../components/appScreen";

// the  below import is for navigation
import screens from "../../../config/screens";
import {
    Form,
    FormField,
    FormPicker as Picker,
    SubmitButton,
} from "../../../components/forms";

import AppMaterialIcon from "../../../components/appMaterialCommunityIcon";

import CategoryPickerItem from "../../../components/appCategoryPickerItem";

import AppPicker from "../../../components/appPicker";

function CreateTaskListForChildScreen({ navigation }) {
    // the below will change once we have data from teh server/text file
    const dummyTestChildren = [
        { label: "Bob", value: 1 },
        { label: "Alice", value: 2 },
    ];

    const dummyCategories = [
        { label: "Kitchen", value: 1, backgroundColor: "red", icon: "scale" },
        { label: "School", value: 2, backgroundColor: "green", icon: "school" },
        {
            label: "Bedroom",
            value: 3,
            backgroundColor: "blue",
            icon: "bed-empty",
        },
        { label: "Home", value: 4, backgroundColor: "orange", icon: "home" },
        {
            label: "Bathroom",
            value: 5,
            backgroundColor: "purple",
            icon: "shower",
        },
        {
            label: "Homework",
            value: 6,
            backgroundColor: "teal",
            icon: "book-open-page-variant",
        },
        { label: "Pets", value: 7, backgroundColor: "black", icon: "dog" },
        {
            label: "Good Behaviour",
            value: 8,
            backgroundColor: "grey",
            icon: "hand-okay",
        },
        {
            label: "Whatever",
            value: 9,
            backgroundColor: "brown",
            icon: "comment-question",
        },
    ];

    const dummyTasks = [
        {
            label: "Make the table",
            value: 1,
            backgroundColor: "red",
            icon: "silverware-fork-knife",
        },
        {
            label: "Wash dishes",
            value: 2,
            backgroundColor: "green",
            icon: "shower-head",
        },
        {
            label: "Dry dishes",
            value: 3,
            backgroundColor: "blue",
            icon: "tumble-dryer",
        },
        {
            label: "Eat all fruit/vegetables",
            value: 4,
            backgroundColor: "orange",
            icon: "food-apple",
        },
        {
            label: "Put dishes away",
            value: 5,
            backgroundColor: "purple",
            icon: "alpha-x-circle-outline",
        },
        {
            label: "Empty Kitchen Bin",
            value: 6,
            backgroundColor: "teal",
            icon: "delete-empty",
        },
    ];

    return (
        <Screen style={styles.container}>
            <AppHeading title="Create Task For Child" />
            <Form
                initialValues={{
                    title: "",
                    point: "",
                    description: "",
                    category: null,
                }}
                onSubmit={(values) => console.log(values)}
            >
                <AppPicker
                    items={dummyTestChildren}
                    icon="apps"
                    placeholder="Select Child"
                />

                <AppLabel labelText="Select Cateogory:" />

                <Picker
                    items={dummyCategories}
                    name="chore"
                    numberOfColumns={3}
                    PickerItemComponent={CategoryPickerItem}
                    placeholder="Existing Chore Categories"
                    justifyContent="center"
                    width="90%"
                />

                <AppLabel labelText="Select Task:" />

                <Picker
                    items={dummyTasks}
                    name="tasks"
                    numberOfColumns={3}
                    PickerItemComponent={CategoryPickerItem}
                    placeholder="Existing Tasks"
                    justifyContent="center"
                    width="90%"
                />

                <AppButton title="Finalise Changes" />

                <AppButton
                    title="Return"
                    onPress={() => navigation.navigate(screens.ParentDashBoard)}
                />
            </Form>
        </Screen>
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
