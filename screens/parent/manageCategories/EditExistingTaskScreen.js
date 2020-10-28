import React, { useState, useContext } from "react";
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

export default function EditExistingTaskScreen({ navigation }) {
    // need to utilise usersContext to make use of SQL
    const usersContext = useContext(UsersContext);

    const {
        updateTask,
        tasks,
        addNewTask,
        getSpecificTasksGlen,
        specifics,
    } = usersContext;

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
        tempObject.backgroundColor = "blue";
        tempObject.icon = "school";
        taskList.push(tempObject);
    }

    // this function is to set the status of only the tasks mapped to the cateogory
    const handleSelectedTask = (item) => {
        setSelectedTask(item);
    };

    // Validation Schema
    const taskSchema = Yup.object().shape({
        task_name: Yup.string().required().label("Task name"),
        task_points: Yup.number().required().label("Task Points"),
        task_colour: Yup.string().required().label("Task Colour"),
        task_icon: Yup.string().required().label("Task Icon"),
    });

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <AppHeading title="Edit Task" />

                <Formik
                    initialValues={{
                        task_name: "",
                        task_colour: "orange",
                        task_icon: "pets",
                        task_points: "",
                    }}
                    onSubmit={async (fields, { setFieldError }) => {
                        try {
                            await updateTask({
                                task_id: Number(selectedTask.value),
                                task_name: fields.task_name,
                                task_colour: fields.task_colour,
                                task_icon: fields.task_icon,
                                task_points: Number(fields.task_points),
                                category_id: Number(selectedTask.category_id),
                            });
                            console.log(
                                "WE are inside the try await edit existing",
                                fields
                            );
                            console.log("Finished updating task");

                            navigation.navigate(screens.AddCategory);
                        } catch (error) {
                            console.log(
                                "Edit Existing Task screen with update error = ",
                                error
                            );
                        }
                    }}
                    validationSchema={taskSchema}
                >
                    {({ handleChange, handleSubmit, errors }) => (
                        <>
                            <AppPicker
                                items={taskList}
                                icon="face"
                                numberOfColumns={3}
                                PickerItemComponent={CategoryPickerItem}
                                placeholder="Select Task to Edit"
                                onSelectItem={handleSelectedTask}
                                selectedItem={selectedTask}
                                justifyContent="center"
                                width="90%"
                            />
                            <AppTextInput
                                placeholder="Rename Task here"
                                labelText="Rename Task:"
                                // labelText="Task"
                                icon="account"
                                onChangeText={handleChange("task_name")}
                            />

                            <AppTextInput
                                placeholder="Update Points Here"
                                labelText="Update Points:"
                                type="number"
                                // labelText="Task"
                                icon="account"
                                onChangeText={handleChange("task_points")}
                            />
                            {/* <AppTextInput
                            placeholder="Update colour Here"
                            // labelText="Task"
                            icon="account"
                            onChangeText={handleChange("task_colour")}
                        />
                        <AppTextInput
                            placeholder="Update Icon Here"
                            // labelText="Task"
                            icon="account"
                            onChangeText={handleChange("task_icon")}
                        /> */}

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
});
