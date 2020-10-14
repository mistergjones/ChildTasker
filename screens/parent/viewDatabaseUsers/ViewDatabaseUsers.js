// import React, { useContext } from "react";
// import { StyleSheet, Text } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";

import * as SQLite from "expo-sqlite";

// open the database
const db = SQLite.openDatabase("db.db");

import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Button,
} from "react-native";

import { UsersContext } from "../../../context/UsersContext.js";

// this module will test to see if we can obtain data from the SQL lite database

import React, { useContext, useState, useEffect } from "react";
//import { View, StyleSheet } from "react-native";
import AppButton from "../../../components/appButton.js";
import AppHeading from "../../../components/appHeading.js";
import AppLabel from "../../../components/appLabel";
// the below is to pass screens/child as per mosh bideo
import Screen from "../../../components/appScreen";
// the  below import is for navigation
import screens from "../../../config/screens.js";

import {
    Form,
    FormField,
    FormPicker as Picker,
    SubmitButton,
} from "../../../components/forms";

import AppMaterialIcon from "../../../components/appMaterialCommunityIcon";
import CategoryPickerItem from "../../../components/appCategoryPickerItem";
import AppPicker from "../../../components/appPicker";
import Constants from "expo-constants";
import { database } from "../../../components/database.js";
export default function UserListScreen({ navigation }) {
    const usersContext = useContext(UsersContext);

    // DESTRUCTURE: stores the name and addNewItem function
    const {
        items,
        addNewItem,
        categories,
        addNewCategory,
        tasks,
        addNewTask,
        getSpecificTasksGlen,
        specifics,
    } = usersContext;

    // ITEM: used to set the item name and insert into table
    const [name, setName] = useState(null);

    // CATEGORY: used to set the item name and insert into table
    const [category, setCategory] = useState(null);

    // TASKS: used to set the task name and insert into table
    const [task, setTask] = useState(null);

    // now use the below to assist in defining an object used for the second drop down box.
    const [pickableTasks, setPickableTasks] = useState(null);

    // CATEGORY
    const [selectedCategory, setSelectedCategory] = useState(null);

    // TASK
    const [selectedTask, setSelectedTask] = useState(null);

    // ITEM: used to insert an item
    const insertItem = () => {
        addNewItem(name);
    };

    // CATEGORY: used to insert a cateogory
    const insertCategory = () => {
        addNewCategory(category);
    };

    // TASK: used to insert a category
    const insertTask = () => {
        addNewTask(task);
    };

    var itemList = [];
    // now loop through each item to obatin id and value and assign to an object. Push this object into the array
    for (var loopIterator = 0; loopIterator < items.length; loopIterator++) {
        var tempObject = {};
        tempObject.label = items[loopIterator].value;
        tempObject.value = items[loopIterator].id;
        tempObject.backgroundColor = "red";
        tempObject.icon = "silverware-fork-knife";
        itemList.push(tempObject);
    }

    // console.log("LIST OF ITEM NAMES");
    // console.log(itemList);

    //************************************ */
    // Categories
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

    // console.log("LIST OF CATEGORY NAMES");
    // console.log(categoryList);

    // needed as SPECIFICS from teh set state was not geting updated immediately.
    useEffect(() => {
        console.log("USE EFFECT IS IN THE HOUSE");
        console.log("USE EFFECT", specifics);
        var pickableTasksForThatChosenCategory = {};

        // on first render it is probabaly undefined
        if (specifics != undefined) {
            pickableTasksForThatChosenCategory = specifics.map((theResult) => {
                let a = {};
                a.label = theResult.task_name;
                a.value = theResult.task_id;
                a.backgroundColor = "red";
                a.icon = "silverware-fork-knife";
                return a;
            });
        } else {
            console.log("WE ARE IN THE ELSE STATEMNT");
        }

        // console.log("TEMP OBJECT: ", pickableTasksForThatChosenCategory);
        // update the state. i.e. ensure to only provide the tasks applicable to the category.
        setPickableTasks(pickableTasksForThatChosenCategory);
    }, [specifics]);

    const handleSelectItem = async (item) => {
        // pass in teh task id to ensure the query is parameterised
        await getSpecificTasksGlen(item.value);
        // update the state to capture the cateogories
        setSelectedCategory(item);
    };

    // this function is to set the status of only the tasks mapped to the cateogory
    const handleSelectTask = async (item) => {
        setSelectedTask(item);
    };

    return (
        <Screen style={styles.container}>
            <AppHeading title="Create Task For Child" />
            <AppLabel labelText="Select Category:" />

            <Form
                initialValues={{
                    title: "",
                    point: "",
                    description: "",
                    category: null,
                }}
                onSubmit={(values) => console.log(values)}
            >
                <AppPicker
                    items={itemList}
                    icon="apps"
                    placeholder="Select Item"
                    PickerItemComponent={CategoryPickerItem}
                    onSelectItem={handleSelectItem}
                    selectedItem={selectedCategory}
                />
                {selectedCategory && (
                    <AppPicker
                        items={pickableTasks}
                        icon="apps"
                        placeholder="Select Task"
                        PickerItemComponent={CategoryPickerItem}
                        onSelectItem={handleSelectTask}
                        selectedItem={selectedTask}
                    />
                )}
                {/* <Picker
                    items={itemList}
                    name="chore"
                    numberOfColumns={3}
                    PickerItemComponent={CategoryPickerItem}
                    placeholder="Existing Chore Categories"
                    justifyContent="center"
                    width="90%"
                /> */}
                {/* <ScrollView>
                    <Text>Here is our list of users</Text>
                    {items.map((item) => (
                        <Text key={item.id}>{item.value}</Text>
                    ))}
                </ScrollView> */}
                <TextInput
                    style={styles.input}
                    onChangeText={(name) => setName(name)}
                    value={name}
                    placeholder="enter new item name..."
                />
                <AppButton title="insert item name" onPress={insertItem} />

                <Picker
                    items={categoryList}
                    name="categories"
                    numberOfColumns={3}
                    PickerItemComponent={CategoryPickerItem}
                    placeholder="Existing Categories"
                    justifyContent="center"
                    width="90%"
                />
                <ScrollView>
                    <Text>Here is our list of category name</Text>
                    {categories.map((category) => (
                        <Text key={category.category_id}>
                            {category.category_name}
                        </Text>
                    ))}
                </ScrollView>
                <TextInput
                    style={styles.input}
                    onChangeText={(category) => setCategory(category)}
                    value={category}
                    placeholder="enter new category name..."
                />
                <AppButton
                    title="insert category name"
                    onPress={insertCategory}
                />
                <AppButton
                    title="Return"
                    onPress={() => navigation.navigate(screens.ParentDashBoard)}
                />
                <AppButton
                    title="GET TASKS"
                    onPress={() => handleSelectItem()}
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
