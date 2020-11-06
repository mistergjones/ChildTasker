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

import { renderOddColumnsNicely } from "../../../helpers/createBlankItem";

let runningTasksToAssign = [];

function CreateTaskListForChildScreen({ navigation }) {
    // varaible to store teh current name. If name changes, we need to reset the Selected Reward other wise it still defaults to previous name's setting.
    let currentSelectedName = "";

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
        choresForKid,
        getChoresForKid,
        chores,
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
    const [totalTaskPoints, setTotalTaskPoints] = useState(null);

    // KiDS
    const [selectedKid, setSelectedKid] = useState(null);

    // REWARDS
    const [selectedReward, setSelectedReward] = useState(null);
    const [selectedRewardPoints, setSelectedRewardPoints] = useState(0);
    const [rewardList, setRewardList] = useState([]);

    // used to determine if to show a ZERO on first load in  TOTAL TASKS but then gets set to false once tasks are added so points will tally and enable the SUBMIT button
    const [isInitialScreenLoaded, setIsInitialScreenLoaded] = useState(true);

    // used to set the number of columns to show in the AppPicker components that will vary the width % accordingly.
    const [numberOfCategoryColumns, setNumberOfCategoryColumns] = useState(
        null
    );
    const [numberOfRewardColumns, setNumberOfRewardColumns] = useState(null);

    const [
        numberOfSpecificTaskColumns,
        setNumberOfSpecificTaskColumns,
    ] = useState(null);

    // used to determine when to show the "Save all Changes" button
    const [
        saveAllChangesButtonEnabled,
        setSaveAllChangesButtonEnabled,
    ] = useState(null);

    //************************************ */
    // Categories - make the selectable category list
    //************************************ */
    var categoryList = [];
    categoryList = establishCategoryTasksListInObjectFormat(categories);

    //*************************************/
    // Tasks - make the selectable task list
    //*************************************/
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
    //var rewardList = [];
    // moved rewardList as state variable

    const getRewardsThaHaveNotBeenAssignedToKid = (kidName) => {
        // here we want to show the rewards if they have not been assigned to the child.
        // filtered Rewards used to store the reward that has not been assigned to the child
        let filteredRewards = [];

        // loop through rewards
        for (let x = 0; x < rewards.length; x++) {
            let reward = rewards[x];
            // Flag used to determine if the reward is not assigned to the child already
            let noMatch = true;
            // loop through chores
            for (let i = 0; i < chores.length; i++) {
                let chore = chores[i];
                // if the reward id matches the chore rewards id and the chore kid name is the same
                // as the selected child this reward has been assigned to child so don't want
                // to display for selection as it has been assigned already
                // set noMatch to false and stop looping through chores
                if (
                    reward.reward_id === chore.reward_id &&
                    chore.kid_name === kidName
                ) {
                    noMatch = false;
                    break;
                }
            }
            // if there is no match add rewards to filtered rewrds
            if (noMatch) {
                filteredRewards.push(reward);
            }
        }
        return filteredRewards;
    };

    // needed as SPECIFICS from teh set state was not geting updated immediately.
    useEffect(() => {
        // convert rewarads from objects into an array of objects
        // etRewardList(establishRewardListInObjectFormat(rewards));
        // console.log("rewards", rewards[0]);

        var pickableTasksForThatChosenCategory = {};

        // on first render it is probabaly undefined
        if (specifics != undefined || specifics != null) {
            pickableTasksForThatChosenCategory = specifics.map(
                (theResult, index) => {
                    let tempObject = {};
                    tempObject.label =
                        theResult.task_name +
                        " (" +
                        theResult.task_points +
                        ")";
                    tempObject.value = theResult.task_id;
                    tempObject.points = theResult.task_points;
                    tempObject.backgroundColor = theResult.task_colour;
                    tempObject.icon = theResult.task_icon;
                    return tempObject;
                }
            );

            // To assist with showing 2 columns on the pickable tasks, if the length %2 != 0, we will simply add a "blank"
            if (pickableTasksForThatChosenCategory.length % 2 != 0) {
                let g = {
                    backgroundColor: "_",
                    icon:
                        "usedToEnsureThatColumnsAreNeatlyAllignedIfThereisAnOddNumber",
                    label: "",
                    points: 999,
                    value: 999,
                };
                // push the intentionaly created useless object into the array so it can then be used to RENDER OUT as a blank iten
                pickableTasksForThatChosenCategory.push(g);
            }
        } else {
            console.log(
                "Initial loading of specific tasks is undefined until a user selects a category. WE ARE IN CreateTaskListForChild --> useEffect()"
            );
        }
        // console.log(specifics.length);

        // console.log("TEMP OBJECT: ", pickableTasksForThatChosenCategory);
        // update the state. i.e. ensure to only provide the tasks applicable to the category.
        setPickableTasks(pickableTasksForThatChosenCategory);
    }, [specifics]);

    const handleSelectKid = async (item) => {
        setSelectedKid(item);

        // check to see if there has been a name change. If so, we want to nullify the Select Reward to null as we don't want to retatin the previous person's reaward
        if (item.label !== currentSelectedName) {
            setSelectedReward(null);
        } else {
            currentSelectedName = item.label;
        }

        var filteredRewards = getRewardsThaHaveNotBeenAssignedToKid(item.label);

        // set the rewrads list to only contain rewards that have not been assigned for the child selected
        setRewardList(establishRewardListInObjectFormat(filteredRewards));
    };

    // this function is to set the status of only the kids mapped to kids
    const handleSelectReward = async (item) => {
        //console.log("item ****" + item.icon);
        setSelectedReward(item);
        setSelectedRewardPoints(item.points);
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
        if (categoryList % 2 === 0) {
        } else {
            categoryList = renderOddColumnsNicely(categoryList);
        }
        // this determines when to ENABLE the SUBMIT button to allow insertions to the database
        if (totalTaskPoints >= selectedRewardPoints) {
            setSaveAllChangesButtonEnabled(true);
        } else {
            setSaveAllChangesButtonEnabled(false);
        }
    });

    // this effect will amke sure to add a "blank" reward object so that it renders nicely for 2 columns.
    useEffect(() => {
        if (rewardList.length % 2 != 0) {
            console.log("Not even");

            var tempObject = {
                backgroundColor: "blue",
                icon:
                    "usedToEnsureThatColumnsAreNeatlyAllignedIfThereisAnOddNumber",
                label: "whatever",
                points: 100,
                value: 1,
            };
            rewardList.push(tempObject);
        }
    }, [rewardList]);

    // this effect will amke sure to add a "blank" reward object so that it renders nicely for 2 columns.
    useEffect(() => {
        if (kidList.length % 2 != 0) {
            console.log("Not even");

            var tempObject = {
                backgroundColor: "blue",
                icon:
                    "usedToEnsureThatColumnsAreNeatlyAllignedIfThereisAnOddNumber",
                label: "whatever",
                points: 9999,
                value: 9999,
            };
            kidList.push(tempObject);
        }
    }, [kidList]);

    // this function is submit the required fields to the database. TABLE: kidchores
    const handleSubmitChangesToDatabase = async () => {
        try {
            if (totalTaskPoints >= selectedReward.points) {
                // if (totalTaskPoints > -1) {
                // need to iterate through each object to insert the item for the kidchore table.
                for (
                    var loopIterator = 0;
                    loopIterator < runningTasksToAssign.length;
                    loopIterator++
                ) {
                    // break each "record" into an object before database insertion
                    const items = {
                        category_id:
                            runningTasksToAssign[loopIterator].category_id,
                        category_name:
                            runningTasksToAssign[loopIterator].category_name,
                        task_id: runningTasksToAssign[loopIterator].task_id,
                        task_name: runningTasksToAssign[loopIterator].task_name,
                        task_points:
                            runningTasksToAssign[loopIterator].task_points,
                        kid_id: runningTasksToAssign[loopIterator].kid_id,
                        kid_name: runningTasksToAssign[loopIterator].kid_name,
                        reward_id: runningTasksToAssign[loopIterator].reward_id,
                        reward_name:
                            runningTasksToAssign[loopIterator].reward_name,
                        reward_points:
                            runningTasksToAssign[loopIterator].reward_points,
                        icon_name: runningTasksToAssign[loopIterator].icon_name,
                        is_completed:
                            runningTasksToAssign[loopIterator].is_completed,
                        reward_icon_name:
                            runningTasksToAssign[loopIterator].reward_icon_name,
                    };

                    await addChoresToKid(items);
                }
                // empty the array
                runningTasksToAssign = [];

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
        //console.log("We are in:  handleResetDropDownAndContinue()");

        // set the is initalScreenLoaded to false so the TASKS TOTAL box acutatlly shows the points
        setIsInitialScreenLoaded(false);

        // now add the variables to the to the item
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
            icon_name: selectedTask.icon,
            is_completed: 0,
            reward_icon_name: selectedReward.icon,
        };

        // console.log(`Selected Task icon is`, selectedTask);
        // console.log(`Items is:`, items);

        runningTasksToAssign.push(items);
        //console.log(runningTasksToAssign);

        // calculate the total task points added
        setTotalTaskPoints(totalTaskPoints + selectedTaskPoints);

        // check to see if there are
        //checkToEnableSubmitButton();

        setSelectedCategory(null);
        setSelectedTask(null);
    };

    const checkToEnableSubmitButton = () => {
        // the below determines when to show the "Save All Changes" button. NOTE: it is still passive and waits for next butotn click to render correctly.
        if (totalTaskPoints >= selectedReward.points) {
            setSaveAllChangesButtonEnabled(true);
        } else {
            setSaveAllChangesButtonEnabled(false);
        }
    };

    return (
        <Screen style={styles.container}>
            {/* <ScrollView> */}
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
                    PickerItemComponent={CategoryPickerItem}
                    numberOfColumns={2}
                    placeholder="Select Child"
                    onSelectItem={handleSelectKid}
                    selectedItem={selectedKid}
                    width="90%"
                />
                {selectedKid && (
                    <AppPicker
                        items={rewardList}
                        icon={selectedReward ? selectedReward.icon : "trophy"}
                        placeholder="Select Reward"
                        numberOfColumns={2}
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
                        numberOfColumns={2}
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
                                {isInitialScreenLoaded ? "0" : totalTaskPoints}
                            </Text>
                        </View>
                    </View>
                )}
                {selectedKid && selectedReward && selectedTask && (
                    <AppButton
                        title="Add Another task"
                        onPress={handleResetDropDownAndContinue}
                    />
                )}
                {saveAllChangesButtonEnabled && (
                    <AppButton
                        title="Save All Changes"
                        onPress={handleSubmitChangesToDatabase}
                    />
                )}
                <AppButton
                    title="Return"
                    onPress={() => navigation.navigate(screens.ParentDashBoard)}
                />
            </Form>
            {/* </ScrollView> */}
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
