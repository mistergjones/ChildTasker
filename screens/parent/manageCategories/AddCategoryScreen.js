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

function AddCategoryScreen({ navigation }) {
    return (
        <Screen style={styles.container}>
            <AppHeading title="Manage Categories and Tasks" />
            <Form
                initialValues={{
                    title: "",
                    point: "",
                    description: "",
                    category: null,
                }}
                onSubmit={(values) => console.log(values)}
            >
                <AppButton
                    title="Add New Category"
                    onPress={() => navigation.navigate(screens.AddNewCategory)}
                />
                <AppButton
                    title="Edit Category"
                    onPress={() =>
                        navigation.navigate(screens.EditExistingCategory)
                    }
                />
                <AppButton
                    title="Remove Category"
                    onPress={() => navigation.navigate(screens.RemoveCategory)}
                />
                <AppButton
                    title="Add New Task"
                    onPress={() => navigation.navigate(screens.AddNewTask)}
                />
                <AppButton
                    title="Edit Task"
                    onPress={() =>
                        navigation.navigate(screens.EditExistingTask)
                    }
                />
                <AppButton
                    title="Remove Task"
                    onPress={() => navigation.navigate(screens.RemoveTask)}
                />
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
        flex: 1,
        backgroundColor: "white",
    },
});

export default AddCategoryScreen;
