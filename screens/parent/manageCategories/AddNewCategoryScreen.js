SafeAreaView;
import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

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

function AddNewCategoryScreen({ navigation }) {
    // need to utilise usersContext to make use of SQL
    const usersContext = useContext(UsersContext);

    // just need the addNewCategory context
    const { categories, addNewCategory } = usersContext;
    // set state to obtain value for the Text Input

    console.log(categories);

    const categorySchema = Yup.object().shape({
        category_name: Yup.string().required().label("Category name"),
    });

    return (
        <SafeAreaView>
            <AppHeading title="Add New Category" />

            <Formik
                initialValues={{
                    category_name: "",
                }}
                onSubmit={async (fields, { setFieldError }) => {
                    // add cateogry to db
                    console.log("We are adding a category");
                    try {
                        await addNewCategory(fields.category_name);

                        navigation.navigate(screens.AddCategory);
                    } catch (error) {
                        console.log("error = ", error);
                    }
                }}
                validationSchema={categorySchema}
            >
                {({ handleChange, handleSubmit, errors }) => (
                    <>
                        <AppTextInput
                            placeholder="Type New Category"
                            labelText="New Category Name"
                            type="text"
                            name="category"
                            // labelText="Category"
                            icon="account"
                            onChangeText={handleChange("category_name")}
                            // value={textInputValue}
                            // errorStyle={{ color: "red" }}
                            // error={errors ? errors.category_name : ""}
                        />

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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
});

export default AddNewCategoryScreen;
