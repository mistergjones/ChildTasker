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
import AppTextInput from "../../../components/AppTextInput";

export default function AddNewTaskScreen({ navigation }) {
    return (
        <Screen style={styles.container}>
            <AppHeading title="Add New Task" />
            <AppTextInput
                placeholder="Type New Task"
                // labelText="Task"
                icon="account"
                // onChangeText={handleChange}
            />

            <AppTextInput
                placeholder="Type Points Value"
                // labelText="Points"
                icon="account"
                // onChangeText={handleChange}
            />

            <AppButton
                title="Save Changes"
                // onPress={handleInsertTask}
            />

            <AppButton
                title="Return"
                onPress={() => navigation.navigate(screens.AddCategory)}
            />
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
