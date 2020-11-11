import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Alert,
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

import { UsersContext } from "../../../context/UsersContext";
import { renderOddColumnsNicely } from "../../../helpers/createBlankItem";

import { establishTasksListInObjectFormat } from "../../../helpers/createObjectLists";

export default function RemoveTaskScreen({ navigation }) {
  // need to utilise usersContext to make use of SQL
  const usersContext = useContext(UsersContext);

  const { tasks, removeTask } = usersContext;

  // TASK
  const [selectedItem, setSelectedItem] = useState(null);

  //************************************ */
  // Task - make the selectable task list
  //************************************ */
  var taskList = [];

  // now loop through each item to obatin id and value and assign to an object. Push this object into the array
  for (var loopIterator = 0; loopIterator < tasks.length; loopIterator++) {
    var tempObject = {};
    tempObject.label = tasks[loopIterator].task_name;
    tempObject.value = tasks[loopIterator].task_id;
    tempObject.backgroundColor = tasks[loopIterator].task_colour;
    tempObject.icon = tasks[loopIterator].task_icon;
    taskList.push(tempObject);
  }

  //console.log(`The tasks are:`, tasks);

  const removeTaskAlert = () =>
    Alert.alert(
      "Remove Task",
      "Click Ok to remove Task",
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
            await removeTask(selectedItem.value);

            setSelectedItem(null);
            navigation.navigate(screens.AddCategory);
          },
        },
      ],
      { cancelable: false }
    );

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    if (taskList.length % 2 === 0) {
    } else {
      // need to create a blank icon object to render nicely on the appPickerITem. This is to make sure that if there is an ODD number of elements to be shown, we add a "silent" ojbect to make it render nicely by 2 columns each row.

      taskList = renderOddColumnsNicely(taskList);
    }
  });

  return (
    <Screen style={styles.container}>
      {/* <SafeAreaView style={styles.container}> */}
      <ScrollView>
        <AppHeading title="Remove a task" />

        <AppPicker
          items={taskList}
          icon="script"
          name="chore"
          numberOfColumns={2}
          PickerItemComponent={CategoryPickerItem}
          selectedItem={selectedItem}
          onSelectItem={handleSelectItem}
          placeholder="Select Task to Remove"
          justifyContent="center"
          width="90%"
        />

        {selectedItem && <AppButton title="Remove" onPress={removeTaskAlert} />}

        <AppButton
          title="Return"
          onPress={() => navigation.navigate(screens.AddCategory)}
        />
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
