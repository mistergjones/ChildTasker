import React from "react";
import { View, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import screens from "../../config/screens";
import LoginScreen from "../login/LoginScreen";
import ChoreStatusScreen from "../child/ChoreStatusScreen";
import ChildDashBoardScreen from "../child/ChildDashBoardScreen";
import ChoreProgressScreen from "../child/ChoreProgressScreen";
import EditProfileScreen from "../child/EditProfileScreen";
import ChildTasksForReward from "../child/ChildTasksForReward";

const Stack = createStackNavigator();

function ChildStackNavigator(props) {
  return (
    <Stack.Navigator
      initialRouteName={screens.ChildDashBoard}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name={screens.ChildDashBoard}
        component={ChildDashBoardScreen}
      />
      <Stack.Screen name={screens.ChoreStatus} component={ChoreStatusScreen} />
      <Stack.Screen
        name={screens.ChoreProgress}
        component={ChoreProgressScreen}
      />
      <Stack.Screen name={screens.EditProfile} component={EditProfileScreen} />
      <Stack.Screen name={screens.ChildTaskForRewards} component={ChildTasksForReward} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ChildStackNavigator;
