import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, TextInput } from "react-native";

import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";

import AppLabel from "../../../components/appLabel";
// the below is to pass screens/child as per mosh bideo
import Screen from "../../../components/appScreen";

// the  below import is for navigation
import screens from "../../../config/screens";
import {
    Form,
    FormField,
    FormPicker as Picker,
    SubmitButton,
} from "../../../components/forms";

import AppMaterialIcon from "../../../components/appMaterialCommunityIcon";

import CategoryPickerItem from "../../../components/appCategoryPickerItem";

import AppPicker from "../../../components/appPicker";

/*************************************************************************************************/
import * as SQLite from "expo-sqlite";

// open the database
const db = SQLite.openDatabase("db.db");

import { ScrollView, Text, TouchableOpacity, Button } from "react-native";

import { UsersContext } from "../../../context/UsersContext";

import Constants from "expo-constants";
import { database } from "../../../components/database.js";

/*************************************************************************************************/

function CreateTaskListForChildScreen({ navigation }) {
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

    // this function is to obtain teh values from teh UI and insert hte data into the tables.
    const handleAssignTasksToKid = async () => {
        const items = {
            categoryID: selectedCategory.value,
            taskID: selectedTask.value,
        };
        await console.log(items);
    };

    // the below will change once we have data from teh server/text file
    const dummyTestChildren = [
        { label: "Bob", value: 1 },
        { label: "Alice", value: 2 },
    ];

    const dummyCategories = [
        { label: "Kitchen", value: 1, backgroundColor: "red", icon: "scale" },
        { label: "School", value: 2, backgroundColor: "green", icon: "school" },
        {
            label: "Bedroom",
            value: 3,
            backgroundColor: "blue",
            icon: "bed-empty",
        },
        { label: "Home", value: 4, backgroundColor: "orange", icon: "home" },
        {
            label: "Bathroom",
            value: 5,
            backgroundColor: "purple",
            icon: "shower",
        },
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

    const dummyTasks = [
        {
            label: "Make the table",
            value: 1,
            backgroundColor: "red",
            icon: "silverware-fork-knife",
        },
        {
            label: "Wash dishes",
            value: 2,
            backgroundColor: "green",
            icon: "shower-head",
        },
        {
            label: "Dry dishes",
            value: 3,
            backgroundColor: "blue",
            icon: "tumble-dryer",
        },
        {
            label: "Eat all fruit/vegetables",
            value: 4,
            backgroundColor: "orange",
            icon: "food-apple",
        },
        {
            label: "Put dishes away",
            value: 5,
            backgroundColor: "purple",
            icon: "alpha-x-circle-outline",
        },
        {
            label: "Empty Kitchen Bin",
            value: 6,
            backgroundColor: "teal",
            icon: "delete-empty",
        },
    ];

    return (
        <Screen style={styles.container}>
            <AppHeading title="Create Task For Child" />
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
                    items={dummyTestChildren}
                    icon="face"
                    placeholder="Select Child"
                    numberOfColumns={2}
                />

                {/* <AppLabel labelText="Select Cateogory:" /> */}

                {/* <Picker
                    items={dummyCategories}
                    icon="face"
                    name="chore"
                    numberOfColumns={3}
                    PickerItemComponent={CategoryPickerItem}
                    placeholder="Select Category"
                    justifyContent="center"
                    width="90%"
                /> */}

                <AppPicker
                    items={itemList}
                    icon="apps"
                    placeholder="Select Item"
                    PickerItemComponent={CategoryPickerItem}
                    onSelectItem={handleSelectItem}
                    selectedItem={selectedCategory}
                    numberOfColumns={2}
                />
                {selectedCategory && (
                    <AppPicker
                        items={pickableTasks}
                        icon="star-box-outline"
                        placeholder="Select Task"
                        PickerItemComponent={CategoryPickerItem}
                        onSelectItem={handleSelectTask}
                        selectedItem={selectedTask}

                    />
                )}

                {/* <AppLabel labelText="Select Task:" /> */}

                {/* <Picker
                    items={dummyTasks}
                    icon="face"
                    name="tasks"
                    numberOfColumns={3}
                    PickerItemComponent={CategoryPickerItem}
                    placeholder="Select Tasks"
                    justifyContent="center"
                    width="90%"
                /> */}

                <AppButton
                    title="Finalise Changes"
                    onPress={handleAssignTasksToKid}
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
    container: {},
    picker: {
        marginBottom: 150,
        height: 50,
        width: 150,
        alignSelf: "center",
    },
});

export default CreateTaskListForChildScreen;
