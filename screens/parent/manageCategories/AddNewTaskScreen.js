import React, { useContext, useState, useEffect } from "react";
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

import { renderOddColumnsNicely } from "../../../helpers/createBlankItem";

import {
  establishCategoryTasksListInObjectFormat,
  establishIconListInObjectFormat,
} from "../../../helpers/createObjectLists";

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

  // need a way to set the background colour of the selected icon
  const [selectedColor, setSelectedColor] = useState();

  // show the tasks jsut to make sure they are retrieved
  // console.log(tasks);

  // need to establish a list of icons to be made available to the user
  let iconList = [];
  iconList = establishIconListInObjectFormat(icons);

  // console.log(iconList);

  // needt to establish a list of Categories to made available to the user
  var categoryList = [];
  categoryList = establishCategoryTasksListInObjectFormat(categories);

  // this function is to set the status of icon
  const handleSelectIconItem = (item) => {
    setSelectedIconItem(item);

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

  // const handleAddNewTask = async () => {
  //     const infoToAdd = {
  //         task_name: newTaskName,
  //         task_points: Number(newPoints),
  //         task_icon: selectedIconItem.icon,
  //         task_colour: selectedColourItem.backgroundColor,
  //         category_id: selectedCategoryItem.value,
  //     };
  //     console.log(infoToAdd);
  //     try {
  //         await addNewTask(infoToAdd);
  //         console.log("WE are inside the try await Add New Tasks");
  //         navigation.navigate(screens.AddCategory);
  //     } catch (error) {
  //         console.log("There as an error inserting a NEW TASK");
  //     }
  // };

  useEffect(() => {
    if (categoryList.length % 2 === 0) {
    } else {
      // need to create a blank icon object to render nicely on the appPickerITem. This is to make sure that if there is an ODD number of elements to be shown, we add a "silent" ojbect to make it render nicely by 2 columns each row.

      categoryList = renderOddColumnsNicely(categoryList);
    }

    if (iconList.length % 2 === 0) {
    } else {
      // need to create a blank icon object to render nicely on the appPickerITem. This is to make sure that if there is an ODD number of elements to be shown, we add a "silent" ojbect to make it render nicely by 2 columns each row.

      iconList = renderOddColumnsNicely(iconList);
    }
  });

  const taskSchema = Yup.object().shape({
    task_name: Yup.string().required().label("Task name"),
    task_points: Yup.number().required().label("Task Points"),
  });

  return (
    <Screen>
      {/* <SafeAreaView style={styles.container}> */}
      <ScrollView>
        <AppHeading title="Add New Task" />

        <Formik
          initialValues={{
            task_name: "",
            task_colour: "",
            task_icon: "",
            task_points: "",
            // category_id: null,
          }}
          onSubmit={async (fields, { setFieldError }) => {
            try {
              await addNewTask({
                task_name: fields.task_name,
                task_points: fields.task_points,
                task_colour: selectedColourItem.backgroundColor,
                task_icon: selectedIconItem.icon,
              });
              console.log("WE are inside the try await ADD NEW TASK", fields);
              console.log("Finished INSERTING TASK");

              navigation.navigate(screens.AddCategory);
            } catch (error) {
              console.log("ADD NEW TASK eRROR  = ", error);
            }
          }}
          validationSchema={taskSchema}
        >
          {({ handleChange, handleSubmit, errors }) => (
            <>
              <AppTextInput
                placeholder="Type New Task"
                labelText="New task name:"
                // name="task-name"
                icon="script"
                onChangeText={handleChange("task_name")}
                errorStyle={{ color: "red" }}
                error={errors ? errors.task_name : ""}
              />

              <AppTextInput
                placeholder="Task Points"
                labelText="Task points:"
                name="task_points"
                type="number"
                // labelText="Points"
                icon="numeric-1-circle-outline"
                onChangeText={handleChange("task_points")}
                errorStyle={{ color: "red" }}
                error={errors ? errors.task_points : ""}
                keyboardType="number-pad"
              />

              <AppPicker
                items={iconList}
                icon="star-circle"
                labelText="Icon Theme:"
                numberOfColumns={2}
                PickerItemComponent={CategoryPickerItem}
                selectedItem={selectedIconItem}
                onSelectItem={handleSelectIconItem}
                placeholder="Select an Icon"
                justifyContent="center"
                width="90%"
              />

              {selectedIconItem && (
                <AppPicker
                  items={selectedColor}
                  icon="star-circle"
                  labelText="Icon Theme:"
                  numberOfColumns={2}
                  PickerItemComponent={CategoryPickerItem}
                  selectedItem={selectedColourItem}
                  onSelectItem={handleSelectColourItem}
                  placeholder="Select a background colour"
                  justifyContent="center"
                  width="90%"
                />
              )}

              {selectedColourItem && (
                <AppPicker
                  items={categoryList}
                  icon="book-open-outline"
                  labelText="Icon Theme:"
                  numberOfColumns={2}
                  PickerItemComponent={CategoryPickerItem}
                  selectedItem={selectedCategoryItem}
                  onSelectItem={handleSelectCategoryItem}
                  placeholder="Assign task to category..."
                  justifyContent="center"
                  width="90%"
                />
              )}

              {selectedCategoryItem && (
                <AppButton title="Save" onPress={handleSubmit} />
              )}

              <AppButton
                title="Return"
                onPress={() => navigation.navigate(screens.AddCategory)}
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
