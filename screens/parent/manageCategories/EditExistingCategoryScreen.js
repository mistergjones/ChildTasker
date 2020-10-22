import React, { useState, useContext } from "react";
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

import AppPicker from "../../../components/appPicker";

import CategoryPickerItem from "../../../components/appCategoryPickerItem";
import AppTextInput from "../../../components/AppTextInput";

import { UsersContext } from "../../../context/UsersContext";
import { Formik } from "formik";
import * as Yup from "yup";

export default function EditExistingCategoryScreen({ navigation }) {
    // need to obtain all the categires furst,
    // need to utilise usersContext to make use of SQL
    const usersContext = useContext(UsersContext);
    // obtain the updated Categories
    const { categories, updateCategory } = usersContext;
    // now set a state for selecting an existing category
    const [selectedItem, setSelectedItem] = useState();
    // now use a state to obtain the the text input
    const [renamedCategory, setRenamedCategory] = useState();

    // Categories
    var categoryList = [];

    // now loop through each item to obatin id and value and assign to an object. Push this object into the array
    //************************************ */
    // Categories - make the selectable task list
    //************************************ */
    for (
        var loopIterator = 0;
        loopIterator < categories.length;
        loopIterator++
    ) {
        var tempObject = {};
        tempObject.label = categories[loopIterator].category_name;
        tempObject.value = categories[loopIterator].category_id;
        tempObject.backgroundColor = "blue";
        tempObject.icon = "school";
        categoryList.push(tempObject);
    }

    // this function is to set the status of categories
    const handleSelectItem = (item) => {
        setSelectedItem(item);
    };

    const handleRenamedCategory = (item) => {
        setRenamedCategory(item);
    };

    // the below is to capture the text input for the renamed category

    // this function is to obtain teh values from teh UI and insert hte data into the tables.
    const categoryUpdate = async () => {
        const items = {
            category_id: selectedItem.value,
            category_name: renamedCategory,
            category_colour: selectedItem.backgroundColor,
            category_icon: selectedItem.icon,
        };

        try {
            await updateCategory(items);
            // await console.log(items);
        } catch (error) {
            console.log("The error inserting updated Category name", error);
        }
        return;
    };

    return (
        <Screen style={styles.container}>
            <AppHeading title="Edit Category" />

            <Form
                initialValues={{
                    category_name: "",
                    category_colour: "",
                    category_id: "",
                    category_icon: "",
                }}
            >
                {/* GJ 21/10 - Note: AppPicker does not work for this category picker. But works for Tasks...Strange */}

                <AppPicker
                    items={categoryList}
                    icon="face"
                    numberOfColumns={3}
                    PickerItemComponent={CategoryPickerItem}
                    placeholder="Select Category"
                    selectedItem={selectedItem}
                    onSelectItem={handleSelectItem}
                    justifyContent="center"
                    width="90%"
                />

                <AppTextInput
                    placeholder="Rename Category"
                    labelText="New Category Name"
                    // labelText="Category"
                    icon="account"
                    onChangeText={handleRenamedCategory}
                />

                <AppButton
                    title="Save Changes"
                    onPress={async () => {
                        await categoryUpdate();
                        navigation.navigate(screens.AddCategory);
                    }}
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
    container: {
        flex: 1,
        backgroundColor: "white",
    },
});
