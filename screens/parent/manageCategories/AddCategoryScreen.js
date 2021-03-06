import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

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
        <Screen>

            <AppHeading title="Categories and Tasks" />
            <ScrollView /*style={styles.container}*/>
                <Form
                    initialValues={{
                        title: "",
                        point: "",
                        description: "",
                        category: null,
                    }}
                    onSubmit={(values) => {
                        // console.log(values)
                    }}
                >
                    <AppButton
                        title="Add New Category"
                        onPress={() =>
                            navigation.navigate(screens.AddNewCategory)
                        }
                    />
                    <AppButton
                        title="Rename Category"
                        onPress={() =>
                            navigation.navigate(screens.EditExistingCategory)
                        }
                    />
                    <AppButton
                        title="Remove Category"
                        onPress={() =>
                            navigation.navigate(screens.RemoveCategory)
                        }
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
                        onPress={() =>
                            navigation.navigate(screens.ParentDashBoard)
                        }
                    />
                </Form>
            </ScrollView>
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
