import React from "react";
import { View, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import screens from "../../config/screens";
import ParentDashBoardScreen from "../ParentDashBoardScreen";
import LoginScreen from "../login/LoginScreen";
import CreateTaskListForChildScreen from "../parent/createTasks/CreateTaskListForChildScreen";
import AddCategoryScreen from "../parent/manageCategories/AddCategoryScreen";
import ManageRewardsScreen from "../parent/manageReward/ManageRewardsScreen";
import TrackPocketMoneyScreen from "../parent/managePocketMoney/TrackPocketMoneyScreen";
import ParentChildDashBoardScreen from "../parent/manageChild/ParentChildDashBoardScreen";
import AddReward from "../parent/manageReward/AddReward";
import EditReward from "../parent/manageReward/EditReward";
import AddNewChildScreen from "../parent/manageChild/AddNewChildScreen";
import RemoveChildScreen from "../parent/manageChild/RemoveChildScreen";
import EditChildScreen from "../parent/manageChild/EditChildScreen";
import ViewReward from "../parent/manageReward/ViewReward";
import TrackReward from "../parent/manageReward/TrackReward";
import ViewDatabaseUsers from "../parent/viewDatabaseUsers/ViewDatabaseUsers";

// GJ 17/10/2020 - added the following screens
import AddNewCategoryScreen from "../parent/manageCategories/AddNewCategoryScreen";
import EditExistingCategoryScreen from "../parent/manageCategories/EditExistingCategoryScreen";
import RemoveCategoryScreen from "../parent/manageCategories/RemoveCategoryScreen";
import AddNewTaskScreen from "../parent/manageCategories/AddNewTaskScreen";
import EditExistingTaskScreen from "../parent/manageCategories/EditExistingTaskScreen";
import RemoveTaskScreen from "../parent/manageCategories/RemoveTaskScreen";

import RegisterScreen from "../login/RegisterScreen";

const Stack = createStackNavigator();

function ParentStackNavigator(props) {
  return (
    <Stack.Navigator
      initialRouteName={screens.ParentDashBoard}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name={screens.ParentDashBoard}
        component={ParentDashBoardScreen}
      />
      <Stack.Screen
        name={screens.CreateTaskListForChild}
        component={CreateTaskListForChildScreen}
      />
      <Stack.Screen name={screens.AddCategory} component={AddCategoryScreen} />
      {/* GJ: Added the 6 screens below to help with manage categories / tasks*/}
      <Stack.Screen
        name={screens.AddNewCategory}
        component={AddNewCategoryScreen}
      />
      <Stack.Screen
        name={screens.EditExistingCategory}
        component={EditExistingCategoryScreen}
      />
      <Stack.Screen
        name={screens.RemoveCategory}
        component={RemoveCategoryScreen}
      />

      <Stack.Screen name={screens.AddNewTask} component={AddNewTaskScreen} />
      <Stack.Screen
        name={screens.EditExistingTask}
        component={EditExistingTaskScreen}
      />
      <Stack.Screen name={screens.RemoveTask} component={RemoveTaskScreen} />

      <Stack.Screen
        name={screens.ManageRewards}
        component={ManageRewardsScreen}
      />
      <Stack.Screen
        name={screens.TrackPocketMoney}
        component={TrackPocketMoneyScreen}
      />
      <Stack.Screen
        name={screens.ViewAccomplishments}
        component={LoginScreen}
      />
      <Stack.Screen
        name={screens.ParentChildDashBoard}
        component={ParentChildDashBoardScreen}
      />
      <Stack.Screen name={screens.AddReward} component={AddReward} />
      <Stack.Screen name={screens.EditReward} component={EditReward} />
      <Stack.Screen name={screens.AddChild} component={AddNewChildScreen} />
      <Stack.Screen name={screens.EditChild} component={EditChildScreen} />
      <Stack.Screen name={screens.RemoveChild} component={RemoveChildScreen} />
      <Stack.Screen name={screens.ViewReward} component={ViewReward} />
      <Stack.Screen name={screens.TrackReward} component={TrackReward} />
      <Stack.Screen
        name={screens.ViewDatabaseUsers}
        component={ViewDatabaseUsers}
      />
      <Stack.Screen name={screens.Register} component={RegisterScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ParentStackNavigator;
