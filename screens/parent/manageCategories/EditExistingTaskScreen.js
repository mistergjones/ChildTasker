import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import screens from "../../../config/screens";

import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";
import AppLabel from "../../../components/appLabel";
import Screen from "../../../components/appScreen";
import {
    Form,
    FormField,
    FormPicker as Picker,
    SubmitButton,
} from "../../../components/forms";

// import AppPicker from "../../../components/appPicker";

import CategoryPickerItem from "../../../components/appCategoryPickerItem";

import AppPicker from "../../../components/appPicker";
import AppTextInput from "../../../components/AppTextInput";

export default function EditExistingTaskScreen({ navigation }) {
    const dummyTasks = [
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

    return (
        <Screen style={styles.container}>
            <AppHeading title="Edit Task" />
            <Form
                initialValues={{
                    title: "",
                    point: "",
                    description: "",
                    category: null,
                }}
                onSubmit={(values) => console.log(values)}
            >
                <Picker
                    items={dummyTasks}
                    icon="face"
                    name="chore"
                    numberOfColumns={3}
                    PickerItemComponent={CategoryPickerItem}
                    placeholder="Select Task to Edit"
                    justifyContent="center"
                    width="90%"
                />

                <AppTextInput
                    placeholder="Rename Task here"
                    // labelText="Task"
                    icon="account"
                    // onChangeText={handleChange}
                />

                <AppTextInput
                    placeholder="Update Points Here"
                    // labelText="Task"
                    icon="account"
                    // onChangeText={handleChange}
                />

                <AppButton
                    title="Save Changes"
                    onPress={() =>
                        navigation.navigate(screens.EditExistingCategory)
                    }
                />

                <AppButton
                    title="Return"
                    onPress={() => navigation.navigate(screens.AddCategory)}
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
