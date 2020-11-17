import React, { useState, useContext, useEffect } from "react";
import {
    View,
    StyleSheet,
    TextInput,
    SafeAreaView,
    ScrollView,
} from "react-native";
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

import CategoryPickerItem from "../../../components/appCategoryPickerItem";

import AppPicker from "../../../components/appPicker";
import AppTextInput from "../../../components/AppTextInput";

import { UsersContext } from "../../../context/UsersContext";
import { Formik } from "formik";
import * as Yup from "yup";

import { renderOddColumnsNicely } from "../../../helpers/createBlankItem";

import { checkForDuplicatesTasknamesAndTaskPoints } from "../../../helpers/checkForDuplicateTasknameAndPoints";

export default function EditExistingTaskScreen({ navigation }) {
    // need to utilise usersContext to make use of SQL
    const usersContext = useContext(UsersContext);

    // obtain data/items from tasks users context
    const { tasks, updateTask } = usersContext;

    // TASK
    const [selectedTask, setSelectedTask] = useState(null);

    //************************************ */
    // Task - make the selectable task list
    //************************************ */
    var taskList = [];

    // now loop through each item to obatin id and value and assign to an object. Push this object into the array
    for (var loopIterator = 0; loopIterator < tasks.length; loopIterator++) {
        var tempObject = {};
        tempObject.label = tasks[loopIterator].task_name;
        tempObject.value = tasks[loopIterator].task_id;
        tempObject.category_id = tasks[loopIterator].category_id;
        tempObject.backgroundColor = tasks[loopIterator].task_colour;
        tempObject.icon = tasks[loopIterator].task_icon;
        taskList.push(tempObject);
    }

    // this function is to set the status of only the tasks mapped to the cateogory
    const handleSelectedTask = (item) => {
        setSelectedTask(item);
    };

    // Validation Schema
    const taskSchema = Yup.object().shape({
        task_name: Yup.string().min(2).required().label("Task name"),
        task_points: Yup.number()
            .required()
            .label("Task Points")
            .typeError("Task Points must be a number"),
        // task_colour: Yup.string().required().label("Task Colour"),
        // task_icon: Yup.string().required().label("Task Icon"),
    });

    useEffect(() => {
        if (taskList.length % 2 === 0) {
        } else {
            // need to create a blank icon object to render nicely on the appPickerITem. This is to make sure that if there is an ODD number of elements to be shown, we add a "silent" ojbect to make it render nicely by 2 columns each row.
            taskList = renderOddColumnsNicely(taskList);
        }
    });

    return (
        <Screen>
            {/* <SafeAreaView style={styles.container}> */}
            <ScrollView>
                <AppHeading title="Edit Task" />

                <Formik
                    initialValues={{
                        task_name: "",
                        task_colour: "",
                        task_icon: "",
                        task_points: "",
                        category_id: "",
                    }}
                    onSubmit={async (fields, { setFieldError }) => {
                        var checkResult = checkForDuplicatesTasknamesAndTaskPoints(
                            tasks,
                            fields.task_name,
                            fields.task_points
                        );

                        // if tehre is no match (i.e a unique task name and points), proceed with task insertion
                        if (checkResult !== true) {
                            try {
                                await updateTask({
                                    task_id: Number(selectedTask.value),
                                    task_name: fields.task_name,
                                    task_colour: selectedTask.backgroundColor,
                                    task_icon: selectedTask.icon,
                                    task_points: Number(fields.task_points),
                                    category_id: Number(
                                        selectedTask.category_id
                                    ),
                                });

                                // console.log("WE are inside the try await edit existing", fields);
                                // console.log("Finished updating task");

                                navigation.navigate(screens.AddCategory);
                            } catch (error) {
                                // console.log(
                                //     "Edit Existing Task screen with update error = ",
                                //     error
                                // );
                            }
                        }
                    }}
                    validationSchema={taskSchema}
                >
                    {({ handleChange, handleSubmit, errors }) => (
                        <>
                            <AppPicker
                                items={taskList}
                                icon="script"
                                numberOfColumns={2}
                                PickerItemComponent={CategoryPickerItem}
                                placeholder="Select Task to Edit"
                                onSelectItem={handleSelectedTask}
                                selectedItem={selectedTask}
                                justifyContent="center"
                                width="90%"
                                showModal={true}
                            />
                            {selectedTask && (
                                <AppTextInput
                                    placeholder="Rename Task here"
                                    labelText="Rename Task:"
                                    // labelText="Task"
                                    icon="script"
                                    onChangeText={handleChange("task_name")}
                                    errorStyle={{ color: "red" }}
                                    error={errors ? errors.task_name : ""}
                                />
                            )}

                            {selectedTask && (
                                <AppTextInput
                                    placeholder="Update Points Here"
                                    labelText="Update Points:"
                                    type=""
                                    // labelText="Task"
                                    icon="numeric-1-circle-outline"
                                    onChangeText={handleChange("task_points")}
                                    errorStyle={{ color: "red" }}
                                    error={errors ? errors.task_points : ""}
                                    keyboardType="number-pad"
                                />
                            )}

                            {selectedTask && (
                                <AppButton
                                    title="Save"
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
            </ScrollView>
            {/* </SafeAreaView> */}
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
