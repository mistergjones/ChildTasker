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

const Stack = createStackNavigator();

function ParentStackNavigator(props) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screens.LoginParent} component={LoginScreen} />
      <Stack.Screen
        name={screens.ParentDashBoard}
        component={ParentDashBoardScreen}
      />
      <Stack.Screen
        name={screens.CreateTaskListForChild}
        component={CreateTaskListForChildScreen}
      />
      <Stack.Screen name={screens.AddCategory} component={AddCategoryScreen} />
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
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ParentStackNavigator;
