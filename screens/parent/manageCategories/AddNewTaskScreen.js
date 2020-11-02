import React, { useContext, useState } from "react";
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

import CategoryPickerItem from "../../../components/appCategoryPickerItem";
import AppTextInput from "../../../components/AppTextInput";

import { Formik } from "formik";
import * as Yup from "yup";

import AppPicker from "../../../components/appPicker";

import {
    Form,
    FormField,
    FormPicker as Picker,
    SubmitButton,
} from "../../../components/forms";

// import AppPicker from "../../../components/appPicker";
import { UsersContext } from "../../../context/UsersContext";

export default function AddNewTaskScreen({ navigation }) {
    // need to utilise usersContext to make use of SQL
    const usersContext = useContext(UsersContext);
    // just need the addNewCategory context
    const { tasks, addNewTask, icons, categories } = usersContext;

    // now use a state to obtain the the text input for new task name
    const [newTaskName, setNewTaskName] = useState();

    // now use a state to obtain the the text input for new task points
    const [newPoints, setNewPoints] = useState();

    // now set a state for selecting an icon name
    const [selectedIconItem, setSelectedIconItem] = useState();

    // now set a state for selecting a colour
    const [selectedColourItem, setSelectedColourItem] = useState();

    // now set a state for selecting a category
    const [selectedCategoryItem, setSelectedCategoryItem] = useState();

    // show the tasks jsut to make sure they are retrieved
    // console.log(tasks);

    // need to establish a list of icons to be made available to the user
    let iconList = [];
    icons.map((individualIcon) => {
        let tempObj = {};
        tempObj.backgroundColor = individualIcon.background_color;
        tempObj.icon = individualIcon.icon_name;
        tempObj.label = individualIcon.label;
        tempObj.value = individualIcon.icon_id;
        iconList.push(tempObj);
    });

    // Categories
    var categoryList = [];

    // now loop through each item to obatin id and value and assign to an object. Push this object into the array
    //************************************ */
    // Categories - make the selectable task list
    //************************************ */
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

    const taskSchema = Yup.object().shape({
        task_name: Yup.string().required().label("Task name"),
        task_colour: Yup.string().required().label("Task Colour"),
        task_icon: Yup.string().required().label("Task Icon"),
        task_points: Yup.number().required().label("Task Points"),
        category_id: Yup.number().required().label("Category ID"),
    });

    // this function is to set the status of icon
    const handleSelectIconItem = (item) => {
        setSelectedIconItem(item);
    };

    // this function is to set the status of colours
    const handleSelectColourItem = (item) => {
        setSelectedColourItem(item);
    };

    // this function is to set the status of categories
    const handleSelectCategoryItem = (item) => {
        setSelectedCategoryItem(item);
    };

    // this function is to capture the state is what has bene written for new task name
    const handleNewTaskName = (item) => {
        setNewTaskName(item);
    };

    // this function is to capture the state is what has bene written for new pints
    const handleNewPoints = (item) => {
        setNewPoints(item);
    };

    const handleAddNewTask = async () => {
        const infoToAdd = {
            task_name: newTaskName,
            task_points: Number(newPoints),
            task_icon: selectedIconItem.value,
            task_colour: selectedColourItem.label,
            category_id: selectedCategoryItem.value,
        };
        try {
            await addNewTask(infoToAdd);
            navigation.navigate(screens.AddCategory);
        } catch (error) {
            console.log("There as an error inserting a NEW TASK");
        }
    };

    const dummyColours = [
        { label: "Red", value: 1 },
        { label: "Blue", value: 2 },
        { label: "Teal", value: 3 },
        { label: "Orange", value: 4 },
        { label: "Red", value: 5 },
    ];

    return (
        <Screen>
            {/* <SafeAreaView style={styles.container}> */}
            <ScrollView>
                <AppHeading title="Add New Task" />

                <Form
                    initialValues={{
                        task_name: "",
                        task_colour: "",
                        task_icon: "",
                        task_points: "",
                        category_id: null,
                    }}
                    onSubmit={(values) => console.log(values)}
                >
                    <AppTextInput
                        placeholder="Type New Task"
                        labelText="New task name:"
                        // name="task-name"
                        icon="account"
                        onChangeText={handleNewTaskName}
                    />

                    <AppTextInput
                        placeholder="Task Points"
                        labelText="Task points:"
                        name="task_points"
                        type="number"
                        // labelText="Points"
                        icon="account"
                        onChangeText={handleNewPoints}
                    />

                    <AppPicker
                        items={iconList}
                        icon="face"
                        labelText="Icon Theme:"
                        numberOfColumns={3}
                        PickerItemComponent={CategoryPickerItem}
                        selectedItem={selectedIconItem}
                        onSelectItem={handleSelectIconItem}
                        placeholder="Select an Icon"
                        justifyContent="center"
                        width="90%"
                    />

                    <AppPicker
                        items={dummyColours}
                        icon="face"
                        labelText="Icon Theme:"
                        selectedItem={selectedColourItem}
                        onSelectItem={handleSelectColourItem}
                        placeholder="Select a background colour"
                        justifyContent="center"
                        width="90%"
                    />

                    <AppPicker
                        items={categoryList}
                        icon="face"
                        labelText="Icon Theme:"
                        numberOfColumns={3}
                        PickerItemComponent={CategoryPickerItem}
                        selectedItem={selectedCategoryItem}
                        onSelectItem={handleSelectCategoryItem}
                        placeholder="Assign task to category..."
                        justifyContent="center"
                        width="90%"
                    />

                    <AppButton
                        title="Save Changes"
                        onPress={handleAddNewTask}
                    />

                    <AppButton
                        title="Return"
                        onPress={() =>
                            navigation.navigate(screens.ParentDashBoard)
                        }
                    />
                </Form>
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

// return (
//         <SafeAreaView style={styles.container}>
//             <AppHeading title="Add New Task" />
//             <AppPicker
//                 items={iconList}
//                 icon="face"
//                 numberOfColumns={3}
//                 PickerItemComponent={CategoryPickerItem}
//                 placeholder="Select Category"
//             />
//             <Formik
//                 initialValues={{
//                     task_name: "",
//                     task_colour: "",
//                     task_icon: "",
//                     task_points: "",
//                     category_id: null,
//                 }}
//                 onSubmit={async (fields, { setFieldError }) => {
//                     try {
//                         await addNewTask({
//                             task_name: fields.task_name,
//                             task_colour: fields.task_colour,
//                             task_icon: fields.task_icon,
//                             task_points: fields.task_points,
//                             category_id: fields.category_id,
//                         });
//                         console.log(fields);
//                         console.log("finisedh");

//                         navigation.navigate(screens.ParentDashBoard);
//                     } catch (error) {
//                         console.log("error = ", error);
//                     }
//                 }}
//                 validationSchema={taskSchema}
//             >
//                 {({ handleChange, handleSubmit, errors }) => (
//                     <>
//                         <AppTextInput
//                             placeholder="Type New Task"
//                             labelText="New task name:"
//                             name="task-name"
//                             icon="account"
//                             onChangeText={handleChange("task_name")}
//                         />

//                         <AppTextInput
//                             placeholder="Task Colour"
//                             labelText="Background colour:"
//                             name="task-colour"
//                             // labelText="Points"
//                             icon="account"
//                             onChangeText={handleChange("task_colour")}
//                         />

//                         <AppTextInput
//                             placeholder="Task Icon"
//                             labelText="Icon name:"
//                             name="task-icon"
//                             // labelText="Points"
//                             icon="account"
//                             onChangeText={handleChange("task_icon")}
//                         />

//                         <AppTextInput
//                             placeholder="Task Points"
//                             labelText="Task points:"
//                             name="task_points"
//                             // labelText="Points"
//                             icon="account"
//                             onChangeText={handleChange("task_points")}
//                         />

//                         <AppTextInput
//                             placeholder="Add to which Category?"
//                             labelText="Assign to category:"
//                             name="category_id"
//                             // labelText="Points"
//                             icon="account"
//                             onChangeText={handleChange("category_id")}
//                         />

//                         <AppButton
//                             title="Save Changes"
//                             onPress={handleSubmit}
//                         />

//                         <AppButton
//                             title="Return"
//                             onPress={() =>
//                                 navigation.navigate(screens.ParentDashBoard)
//                             }
//                         />
//                     </>
//                 )}
//             </Formik>
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {},
//     picker: {
//         marginBottom: 150,
//         height: 50,
//         width: 150,
//         alignSelf: "center",
//     },
// });
