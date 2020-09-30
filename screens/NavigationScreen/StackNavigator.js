import React from "react";
import { View, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import ParentDashBoardScreen from "../ParentDashBoardScreen";
import LoginScreen from "../login/LoginScreen";

const Stack = createStackNavigator();

function StackNavigator(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ParentDashBoard" component={ParentDashBoardScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default StackNavigator;
