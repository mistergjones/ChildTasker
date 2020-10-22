import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";

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
import AppPicker from "../../../components/appPicker";

import { UsersContext } from "../../../context/UsersContext";

import CategoryPickerItem from "../../../components/appCategoryPickerItem";
export default function RemoveCategoryScreen({ navigation }) {
    // need to utilise usersContext to make use of SQL
    const usersContext = useContext(UsersContext);

    const { categories, removeCategory } = usersContext;

    // Category Item
    const [selectedItem, setSelectedItem] = useState(null);

    //************************************ */
    // Category - make the selectable task list
    //************************************ */
    var categoryList = [];

    // now loop through each item to obatin id and value and assign to an object. Push this object into the array
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

    const removeCategoryAlert = () =>
        Alert.alert(
            "Remove Category",
            "Click Ok to remove Category",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: async () => {
                        console.log(selectedItem.value);
                        await removeCategory(selectedItem.value);
                        setSelectedItem(null);
                    },
                },
            ],
            { cancelable: false }
        );

    const handleSelectItem = (item) => {
        setSelectedItem(item);
    };

    return (
        <Screen style={styles.container}>
            <AppHeading title="Remove Category" />
            <Form>
                <AppPicker
                    items={categoryList}
                    icon="face"
                    name="chore"
                    numberOfColumns={3}
                    PickerItemComponent={CategoryPickerItem}
                    placeholder="Select Category to Remove"
                    selectedItem={selectedItem}
                    onSelectItem={handleSelectItem}
                    justifyContent="center"
                    width="90%"
                />

                {selectedItem && (
                    <AppButton
                        title="Remove Category"
                        onPress={removeCategoryAlert}
                    />
                )}

                <AppButton
                    title="Return"
                    onPress={() => navigation.navigate(screens.AddCategory)}
                />
            </Form>
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
