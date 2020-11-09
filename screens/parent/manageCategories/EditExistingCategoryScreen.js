import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";

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

import { renderOddColumnsNicely } from "../../../helpers/createBlankItem";

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
        tempObject.backgroundColor = categories[loopIterator].category_colour;
        tempObject.icon = categories[loopIterator].category_icon;
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
    // const categoryUpdate = async () => {
    //     const items = {
    //         category_id: selectedItem.value,
    //         category_name: renamedCategory,
    //         category_colour: selectedItem.backgroundColor,
    //         category_icon: selectedItem.icon,
    //     };

    //     try {
    //         await updateCategory(items);
    //         console.log("ZZZZZZZZZZZZZZZZZZZZ");
    //     } catch (error) {
    //         console.log("The error inserting updated Category name", error);
    //     }
    // };

    useEffect(() => {
        if (categoryList.length % 2 === 0) {
        } else {
            // need to create a blank icon object to render nicely on the appPickerITem. This is to make sure that if there is an ODD number of elements to be shown, we add a "silent" ojbect to make it render nicely by 2 columns each row.

            categoryList = renderOddColumnsNicely(categoryList);
        }
    });

    // Validation Schema
    const categorySchema = Yup.object().shape({
        category_name: Yup.string().required().label("Category name"),
        category_name: Yup.string().min(1).required().label("Category name"),

        // category_colour: Yup.string().required().label("category Colour"),
        // category_icon: Yup.string().required().label("category Icon"),
    });

    return (
        <Screen>
            {/* <SafeAreaView style={styles.container}> */}
            <ScrollView>
                <AppHeading title="Rename Category" />

                <Formik
                    initialValues={{
                        category_name: "",
                        category_colour: "",
                        category_id: "",
                        category_icon: "",
                    }}
                    onSubmit={async (fields, { setFieldError }) => {
                        try {
                            await updateCategory({
                                category_id: Number(selectedItem.value),
                                category_name: fields.category_name,
                                category_colour: selectedItem.backgroundColor,
                                category_icon: selectedItem.icon,
                            });
                            console.log(
                                "WE are inside the try await edit existing",
                                fields
                            );
                            console.log("Finished updating Category");

                            navigation.navigate(screens.AddCategory);
                        } catch (error) {
                            console.log(
                                "Edit Existing Catagory screen with update error = ",
                                error
                            );
                        }
                    }}
                    validationSchema={categorySchema}
                >
                    {({ handleChange, handleSubmit, errors }) => (
                        <>
                            <AppPicker
                                items={categoryList}
                                icon="face"
                                numberOfColumns={2}
                                PickerItemComponent={CategoryPickerItem}
                                placeholder="Select Category"
                                onSelectItem={handleSelectItem}
                                selectedItem={selectedItem}
                                // justifyContent="center"
                                width="90%"
                            />

                            {selectedItem && (
                                <AppTextInput
                                    placeholder="Rename Category"
                                    labelText="New Category Name"
                                    // labelText="Category"
                                    icon="account"
                                    onChangeText={handleChange("category_name")}
                                    errorStyle={{ color: "red" }}
                                    error={errors ? errors.category_name : ""}
                                />
                            )}

                            <AppButton
                                title="Save Changes"
                                onPress={handleSubmit}
                            />

                            <AppButton
                                title="Return"
                                onPress={() =>
                                    navigation.navigate(screens.AddCategory)
                                }
                            />
                        </>
                    )}
                </Formik>

                {/* <Form
                    initialValues={{
                        category_name: "",
                        category_colour: "",
                        category_id: "",
                        category_icon: "",
                    }}
                >
                    <AppPicker
                        items={categoryList}
                        icon="face"
                        numberOfColumns={3}
                        PickerItemComponent={CategoryPickerItem}
                        placeholder="Select Category"
                        selectedItem={selectedItem}
                        onSelectItem={handleSelectItem}
                        // justifyContent="center"
                        // width="90%"
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
                </Form> */}
            </ScrollView>
            {/* </SafeAreaView> */}
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
});
