import React from "react";
import { View, StyleSheet } from "react-native";

import screens from "../../../config/screens";
import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";

import AppPicker from "../../../components/appPicker";

import ChorePickerItem from "../../../components/ChorePickerItem.js";
import AppFormPicker from "../../../components/forms/FormPicker";

const dummyChores = [
    { label: "Kitchen", value: 1 },
    { label: "School", value: 2 },
    { label: "Bedroom", value: 3 },
    { label: "Home", value: 4 },
    { label: "Bathroom", value: 5 },
    { label: "Homework", value: 6 },
    { label: "Pets", value: 7 },
    { label: "Good Behaviour", value: 8 },
    { label: "Whatever", value: 9 },
];

function AddCategoryScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <AppHeading title="Add a Category" />

            <AppPicker
                items={dummyChores}
                name="chore"
                PickerItemComponent={ChorePickerItem}
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
});

export default AddCategoryScreen;
