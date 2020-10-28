import React, { useContext, useState, useEffect } from "react";
import {
    Alert,
    View,
    StyleSheet,
    TextInput,
    SafeAreaView,
    ScrollView,
    Text,
} from "react-native";

import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";
import colours from "../../../config/colours";

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
import { UsersContext } from "../../../context/UsersContext";

/*************************************************************************************************/

import {
    establishCategoryTasksListInObjectFormat,
    establishRewardListInObjectFormat,
    establishKidListInObjectFormat,
} from "../../../helpers/createObjectLists";

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
    const [selectedTaskPoints, setSelectedTaskPoints] = useState(0);
    const [totalTaskPoints, setTotalTaskPoints] = useState(0);

    // KiDS
    const [selectedKid, setSelectedKid] = useState(null);

    // REWARDS
    const [selectedReward, setSelectedReward] = useState(null);

    // used to set the number of columns to show in the AppPicker components that will vary the width % accordingly.
    const [numberOfCategoryColumns, setNumberOfCategoryColumns] = useState(
        null
    );
    const [numberOfRewardColumns, setNumberOfRewardColumns] = useState(null);

    const [
        numberOfSpecificTaskColumns,
        setNumberOfSpecificTaskColumns,
    ] = useState(null);

    const [submitButtonEnabled, setSubmitButtonEnabled] = useState(true);

    //************************************ */
    // Categories - make the selectable category list
    //************************************ */
    var categoryList = [];

    categoryList = establishCategoryTasksListInObjectFormat(categories);

    //************************************ */
    // Tasks - make the selectable task list
    //************************************ */
    var taskList = [];

    taskList = establishCategoryTasksListInObjectFormat(tasks);

    //************************************ */
    // Kids - make the selectabel kid list
    //************************************ */
    var kidList = [];

    kidList = establishKidListInObjectFormat(kids);

    //************************************ */
    // Reward - make the selectable reward list
    //************************************ */
    var rewardList = [];

    rewardList = establishRewardListInObjectFormat(rewards);

    // needed as SPECIFICS from teh set state was not geting updated immediately.
    useEffect(() => {
        var pickableTasksForThatChosenCategory = {};

        // on first render it is probabaly undefined
        if (specifics != undefined || specifics != null) {
            pickableTasksForThatChosenCategory = specifics.map((theResult) => {
                let a = {};
                a.label =
                    theResult.task_name + " (" + theResult.task_points + ")";
                a.value = theResult.task_id;
                a.points = theResult.task_points;
                a.backgroundColor = theResult.task_colour;
                a.icon = theResult.task_icon;

                return a;
            });
        } else {
            console.log(
                "Initial loading of specific tasks is undefined until a user selects a category. WE ARE IN CreateTaskListForChild --> useEffect()"
            );
        }

        // console.log("TEMP OBJECT: ", pickableTasksForThatChosenCategory);
        // update the state. i.e. ensure to only provide the tasks applicable to the category.
        setPickableTasks(pickableTasksForThatChosenCategory);
    }, [specifics]);

    // this function is to set the status of only the kids mapped to kids
    const handleSelectKid = async (item) => {
        setSelectedKid(item);
    };

    // this function is to set the status of only the kids mapped to kids
    const handleSelectReward = async (item) => {
        setSelectedReward(item);
        setSelectedCategory(null);
    };

    const handleSelectItem = async (item) => {
        // pass in teh task id to ensure the query is parameterised
        await getSpecificTasksGlen(item.value);
        // update the state to capture the cateogories
        setSelectedCategory(item);
        setSelectedTask(null);
    };

    // this function is to set the status of only the tasks mapped to the cateogory
    const handleSelectTask = async (item) => {
        setSelectedTask(item);
        setSelectedTaskPoints(item.points);
    };

    // if there is a render change, we will sue the below to ensure the correct number of columns will be rendered to the scren.
    useEffect(() => {
        if (categories.length % 2 === 0) {
            setNumberOfCategoryColumns(2);
        } else if (categories.length % 3 === 0) {
            setNumberOfCategoryColumns(3);
        } else {
            setNumberOfCategoryColumns(2);
        }

        if (rewards.length % 2 === 0) {
            setNumberOfRewardColumns(2);
        } else if (setNumberOfRewardColumns % 3 === 3) {
            setNumberOfRewardColumns(3);
        } else {
            setNumberOfRewardColumns(2);
        }
    }, []);

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
            // if (totalTaskPoints >= selectedReward.points) {
            if (totalTaskPoints > -1) {
                await addChoresToKid(items);

                navigation.navigate(screens.ParentDashBoard);

                // reset the drop down boxes to null
                setSelectedCategory(null);
                setSelectedTask(null);
            } else {
                Alert.alert(
                    "Cannot Submit Changes",
                    "Please make sure sure that TASKS TOTAL >= REWARD TOTAL",
                    [
                        {
                            text: "Close",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel",
                        },
                    ],
                    { cancelable: false }
                );
            }
        } catch (error) {
            console.log("The error inserting kids to chorse is", error);
        }
    };

    const handleResetDropDownAndContinue = () => {
        console.log("we are in:  handleResetDropDownAndContinue()");

        setTotalTaskPoints(totalTaskPoints + selectedTaskPoints);

        setSelectedCategory(null);
        setSelectedTask(null);

        // the code below should catpure all details in an object each and once the task total >= to REWARD total, then we submit to the database.
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
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
                    // onSubmit={(values) => console.log(values)}
                >
                    <AppPicker
                        items={kidList}
                        icon="face"
                        numberOfColumns={3}
                        placeholder="Select Child"
                        onSelectItem={handleSelectKid}
                        selectedItem={selectedKid}
                        width="90%"
                    />

                    {selectedKid && (
                        <AppPicker
                            items={rewardList}
                            icon="trophy"
                            placeholder="Select Reward"
                            numberOfColumns={numberOfRewardColumns}
                            PickerItemComponent={CategoryPickerItem}
                            onSelectItem={handleSelectReward}
                            selectedItem={selectedReward}
                            width="90%"
                        />
                    )}

                    {selectedReward && (
                        <AppPicker
                            items={categoryList}
                            icon="sitemap"
                            placeholder="Select Category"
                            numberOfColumns={numberOfCategoryColumns}
                            PickerItemComponent={CategoryPickerItem}
                            onSelectItem={handleSelectItem}
                            selectedItem={selectedCategory}
                            width="90%"
                        />
                    )}
                    {selectedCategory && (
                        <AppPicker
                            //numberofElements={}
                            items={pickableTasks}
                            icon="star-box-outline"
                            placeholder="Select Task"
                            numberOfColumns={2}
                            PickerItemComponent={CategoryPickerItem}
                            onSelectItem={handleSelectTask}
                            selectedItem={selectedTask}
                            width="90%"
                        />
                    )}

                    {selectedKid && selectedReward && (
                        <View style={styles.score}>
                            <View style={styles.currentRewardTaskContainer}>
                                <Text style={styles.currentRewardTaskScore}>
                                    Reward Total:
                                </Text>
                                <Text style={styles.currentRewardTaskValue}>
                                    {selectedReward.points}
                                </Text>
                            </View>
                            <View style={styles.currentRewardTaskContainer}>
                                <Text style={styles.currentRewardTaskScore}>
                                    Tasks Total:
                                </Text>
                                <Text style={styles.currentRewardTaskValue}>
                                    {totalTaskPoints}
                                </Text>
                            </View>
                        </View>
                    )}

                    {selectedKid && selectedReward && (
                        <AppButton
                            title="Add Another task"
                            onPress={handleResetDropDownAndContinue}
                        />
                    )}

                    <AppButton
                        title="Submit Changes"
                        onPress={handleAssignTasksToKid}
                    />

                    <AppButton
                        title="Return"
                        onPress={() =>
                            navigation.navigate(screens.ParentDashBoard)
                        }
                    />
                </Form>
            </ScrollView>
        </SafeAreaView>
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
    currentRewardTaskContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colours.defaultButtonColour,
        width: "50%",
        borderWidth: 1,
        borderColor: colours.white,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
    },
    currentRewardTaskScore: {
        paddingTop: 10,
        fontSize: 18,
        textTransform: "uppercase",
        fontWeight: "bold",
        color: colours.white,
    },
    currentRewardTaskValue: {
        padding: 5,
        fontSize: 18,
        color: "gold",
    },
    scrollView: {
        height: "50%",
        paddingLeft: 15,
    },
    score: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
    },
});

export default CreateTaskListForChildScreen;
