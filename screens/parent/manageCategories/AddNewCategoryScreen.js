SafeAreaView;
import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { Formik } from "formik";

import screens from "../../../config/screens";
import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";
import AppLabel from "../../../components/appLabel";
import AppTextInput from "../../../components/AppTextInput";
import Screen from "../../../components/appScreen";
import {
    Form,
    FormField,
    FormPicker as Picker,
    SubmitButton,
} from "../../../components/forms";

// import AppPicker from "../../../components/appPicker";

import CategoryPickerItem from "../../../components/appCategoryPickerItem";

import { UsersContext } from "../../../context/UsersContext";

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

function AddNewCategoryScreen({ navigation }) {
    // need to utilise usersContext to make use of SQL
    const usersContext = useContext(UsersContext);
    const { categories, addNewCategory } = usersContext;
    // const { categoryInputValue, setCategoryInputValue}

    const handleChange = () => {
        const inputValue = "Glen";
    };

    const handleInsertCategory = async () => {
        // store value as an object
        const cat = {
            category_name: "GLEN",
        };

        await addNewCategory(cat);

        navigation.navigate(screens.AddCategory);
    };
    console.log(categories);

    return (
        <Screen style={styles.container}>
            <AppHeading title="Add New Category" />
            <Formik>
                <Form
                    initialValues={{
                        title: "",
                        point: "",
                        description: "",
                        category: null,
                    }}
                    onSubmit={(values) => console.log(values)}
                >
                    <AppTextInput
                        placeholder="Type New Category"
                        // labelText="Category"
                        icon="account"
                        // onChangeText={handleChange}
                    />

                    <AppButton
                        title="Save Changes"
                        onPress={handleInsertCategory}
                    />

                    <AppButton
                        title="Return"
                        onPress={() => navigation.navigate(screens.AddCategory)}
                    />
                </Form>
            </Formik>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
});

export default AddNewCategoryScreen;
