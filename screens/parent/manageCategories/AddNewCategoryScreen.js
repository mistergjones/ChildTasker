SafeAreaView;
import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import screens from "../../../config/screens";
import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";
import AppLabel from "../../../components/appLabel";
import AppPicker from "../../../components/appPicker";
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
import { renderOddColumnsNicely } from "../../../helpers/createBlankItem";

import {
    establishCategoryTasksListInObjectFormat,
    establishRewardListInObjectFormat,
    establishKidListInObjectFormat,
    establishIconListInObjectFormat,
} from "../../../helpers/createObjectLists";

const categorySchema = Yup.object().shape({
    category_name: Yup.string().required().label("Category name"),
});

function AddNewCategoryScreen({ navigation }) {
    // need to utilise usersContext to make use of SQL
    const usersContext = useContext(UsersContext);

    // just need the addNewCategory context
    const { categories, addNewCategory } = usersContext;

    // need to handle the selected drop down list for icons
    const [selectedIcon, setSelectedIcon] = useState();

    // need a way to set the background colour of the selected icon
    const [selectedColor, setSelectedColor] = useState();

    // need to handle the selected drop down list for selected background colour
    const [
        selectedIconBackgroundColor,
        setSelectedIconBackgroundColor,
    ] = useState();

    const { icons } = usersContext;
    //console.log(`Icons are: `, icons);
    // set state to obtain value for the Text Input

    // need to build the icon list ready for the drop down box
    var iconList = establishIconListInObjectFormat(icons);

    const handleSelectIcon = async (item) => {
        setSelectedIcon(item);
        // now call function that will set the background colours with the selected Icon
        let colorList = [
            {
                label: "Rebecca Purple",
                backgroundColor: "rebeccapurple",
                value: 1,
                icon: item.icon,
            },
            {
                label: "Dark Green",
                backgroundColor: "darkgreen",
                value: 2,
                icon: item.icon,
            },
            {
                label: "Orange",
                backgroundColor: "orange",
                value: 3,
                icon: item.icon,
            },
            {
                label: "Saddle Brown",
                backgroundColor: "saddlebrown",
                value: 4,
                icon: item.icon,
            },
            {
                label: "Blue",
                backgroundColor: "blue",
                value: 5,
                icon: item.icon,
            },
            {
                label: "Tomato",
                backgroundColor: "tomato",
                value: 6,
                icon: item.icon,
            },
            {
                label: "Dark Grey",
                backgroundColor: "darkgrey",
                value: 7,
                icon: item.icon,
            },
            {
                label: "Black",
                backgroundColor: "black",
                value: 8,
                icon: item.icon,
            },
        ];
        setSelectedColor(colorList);
    };

    const handleSelectBackgroundColor = async (item) => {
        await setSelectedIconBackgroundColor(item);
    };

    // use the below to ensure that if there is more than 1 icon, it will always be a 2 column nicely laid out format
    useEffect(() => {
        // ensure iconList is nicely aligned
        if (iconList.length % 2 === 0) {
        } else {
            // need to create a blank icon object to render nicely on the appPickerITem. This is to make sure that if there is an ODD number of elements to be shown, we add a "silent" ojbect to make it render nicely by 2 columns each row.

            iconList = renderOddColumnsNicely(iconList);
        }
    });

    return (
        <Screen>
            <AppHeading title="Add New Category" />

            <Formik
                initialValues={{
                    category_name: "",
                    category_icon: "",
                    category_colour: "",
                }}
                onSubmit={async (fields, { setFieldError }) => {
                    // add cateogry to db

                    fields.category_icon = selectedIcon.icon;
                    fields.category_colour =
                        selectedIconBackgroundColor.backgroundColor;

                    console.log(
                        "We are adding the following Category_name: " +
                            fields.category_name
                    );
                    console.log(
                        "We are adding teh following icon: :",

                        fields.category_icon
                    );
                    console.log(
                        "WE are adding the colour: ",
                        fields.category_colour
                    );
                    console.log(fields);
                    try {
                        // await addNewCategory(
                        //     fields.category_name,
                        //     selectedIcon.icon,
                        //     selectedIconBackgroundColor.backgroundColor
                        // );
                        await addNewCategory(fields);

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
                            errorStyle={{ color: "red" }}
                            error={errors ? errors.category_name : ""}
                        />

                        <AppPicker
                            items={iconList}
                            icon="face"
                            numberOfColumns={2}
                            PickerItemComponent={CategoryPickerItem}
                            labelText="Select Category Icon"
                            placeholder="Select Category Icon"
                            onSelectItem={handleSelectIcon}
                            selectedItem={selectedIcon}
                            width="90%"
                        />

                        {selectedIcon && (
                            <AppPicker
                                items={selectedColor}
                                icon="face"
                                numberOfColumns={2}
                                PickerItemComponent={CategoryPickerItem}
                                labelText="Select Icon Background Colour"
                                placeholder="Select Icon Background Colour"
                                onSelectItem={handleSelectBackgroundColor}
                                selectedItem={selectedIconBackgroundColor}
                                width="90%"
                            />
                        )}

                        {selectedIcon && selectedIconBackgroundColor && (
                            <AppButton
                                title="Save Changes"
                                onPress={handleSubmit}
                            />
                        )}

                        <AppButton
                            title="Return"
                            onPress={() =>
                                navigation.navigate(screens.AddCategory)
                            }
                        />
                    </>
                )}
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
