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

import { UsersContext } from "../../../context/UsersContext";

/*************************************************************************************************/

function CreateTaskListForChildScreen({ navigation }) {
    const usersContext = useContext(UsersContext);

    // DESTRUCTURE: stores the name and addNewItem function
    const {
        kids,
        rewards,
        items,
        addNewItem,
        categories,
        addNewCategory,
        tasks,
        addNewTask,
        getSpecificTasksGlen,
        specifics,
        addChoresToKid,
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

    // KiDS
    const [selectedKid, setSelectedKid] = useState(null);

    // REWARDS
    const [selectedReward, setSelectedReward] = useState(null);

    //************************************ */
    // Categories - make the selectable category list
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

    //************************************ */
    // Tasks - make the selectable task list
    //************************************ */
    var taskList = [];

    // now loop through each item to obatin id and value and assign to an object. Push this object into the array
    for (var loopIterator = 0; loopIterator < tasks.length; loopIterator++) {
        var tempObject = {};
        tempObject.label = tasks[loopIterator].task_name;
        tempObject.value = tasks[loopIterator].task_id;
        tempObject.points = tasks[loopIterator].task_points;
        tempObject.backgroundColor = "red";
        tempObject.icon = "silverware-fork-knife";
        taskList.push(tempObject);
    }

    //************************************ */
    // Kids - make the selectabel kid list
    //************************************ */
    var kidList = [];
    // now loop through each item to obatin id and value and assign to an object. Push this object into the array

    for (var loopIterator = 0; loopIterator < kids.length; loopIterator++) {
        var tempObject = {};
        tempObject.label = kids[loopIterator].user_name;
        tempObject.value = kids[loopIterator].user_id;

        kidList.push(tempObject);
    }

    //************************************ */
    // Reward - make the selectable reward list
    //************************************ */
    var rewardList = [];

    // now loop through each item to obatin id and value and assign to an object. Push this object into the array
    for (var loopIterator = 0; loopIterator < rewards.length; loopIterator++) {
        var tempObject = {};
        tempObject.label = rewards[loopIterator].reward_name;
        tempObject.value = rewards[loopIterator].reward_id;
        tempObject.points = rewards[loopIterator].reward_points;
        rewardList.push(tempObject);
    }

    // needed as SPECIFICS from teh set state was not geting updated immediately.
    useEffect(() => {
        var pickableTasksForThatChosenCategory = {};

        // on first render it is probabaly undefined
        if (specifics != undefined) {
            pickableTasksForThatChosenCategory = specifics.map((theResult) => {
                let a = {};
                a.label = theResult.task_name;
                a.value = theResult.task_id;
                a.points = theResult.task_points;
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

    // this function is to set the status of only the kids mapped to kids
    const handleSelectReward = async (item) => {
        setSelectedReward(item);
    };

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

    // this function is to set the status of only the kids mapped to kids
    const handleSelectKid = async (item) => {
        setSelectedKid(item);
    };

    // this function is to obtain teh values from teh UI and insert hte data into the tables.
    const handleAssignTasksToKid = async () => {
        const items = {
            category_id: selectedCategory.value,
            category_name: selectedCategory.label,
            task_id: selectedTask.value,
            task_name: selectedTask.label,
            task_points: selectedTask.points,
            kid_id: selectedKid.value,
            kid_name: selectedKid.label,
            reward_id: selectedReward.value,
            reward_name: selectedReward.label,
            reward_points: selectedReward.points,
        };
        try {
            await addChoresToKid(items);

            await console.log(items);
        } catch (error) {
            console.log("The error inserting kids to chorse is", error);
        }
    };

    return (
        <Screen style={styles.container}>
            <AppHeading title="Create Task For Child" />
            <Form
                initialValues={{
                    category_id: "",
                    category_name: "",
                    task_id: "",
                    task_name: "",
                    task_points: "",
                    kid_id: "",
                    kid_name: "",
                    reward_id: "",
                    reward_name: "",
                    reward_Points: "",
                }}
                onSubmit={(values) => console.log(values)}
            >
                <AppPicker
                    items={kidList}
                    icon="face"
                    placeholder="Select Child"
                    onSelectItem={handleSelectKid}
                    selectedItem={selectedKid}
                />

                {selectedKid && (
                    <AppPicker
                        items={rewardList}
                        icon="face"
                        placeholder="Select Reward"
                        onSelectItem={handleSelectReward}
                        selectedItem={selectedReward}
                    />
                )}

                {selectedReward && (
                    <AppPicker
                        items={categoryList}
                        icon="apps"
                        placeholder="Select Category"
                        numberOfColumns={3}
                        PickerItemComponent={CategoryPickerItem}
                        onSelectItem={handleSelectItem}
                        selectedItem={selectedCategory}
                    />
                )}
                {selectedCategory && (
                    <AppPicker
                        items={pickableTasks}
                        icon="star-box-outline"
                        placeholder="Select Task"
                        numberOfColumns={3}
                        PickerItemComponent={CategoryPickerItem}
                        onSelectItem={handleSelectTask}
                        selectedItem={selectedTask}
                    />
                )}

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
