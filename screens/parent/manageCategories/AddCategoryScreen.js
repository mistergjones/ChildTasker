import React from "react";
import { View, StyleSheet } from "react-native";

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

const dummyCategories = [
    { label: "Kitchen", value: 1, backgroundColor: "red", icon: "scale" },
    { label: "School", value: 2, backgroundColor: "green", icon: "scale" },
    { label: "Bedroom", value: 3, backgroundColor: "blue", icon: "bed-empty" },
    { label: "Home", value: 4, backgroundColor: "orange", icon: "home" },
    { label: "Bathroom", value: 5, backgroundColor: "purple", icon: "shower" },
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

function AddCategoryScreen({ navigation }) {
    return (
        <Screen style={styles.container}>
            <AppHeading title="Add a Category" />
            <Form
                initialValues={{
                    title: "",
                    point: "",
                    description: "",
                    category: null,
                }}
                onSubmit={(values) => console.log(values)}
            >
                {/* <AppPicker
                items={dummyChores}
                name="chore"
                PickerItemComponent={ChorePickerItem}
                placeholder="Existing Chore Categories"
                justifyContent="center"
                width="90%"
            /> */}

                <Picker
                    items={dummyCategories}
                    name="chore"
                    numberOfColumns={3}
                    PickerItemComponent={CategoryPickerItem}
                    placeholder="Existing Chore Categories"
                    justifyContent="center"
                    width="90%"
                />

                <AppButton title="Add New Category" />

                <AppButton title="Edit Category" />

                <AppButton
                    title="Return"
                    onPress={() => navigation.navigate(screens.ParentDashBoard)}
                />
            </Form>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
});

export default AddCategoryScreen;
