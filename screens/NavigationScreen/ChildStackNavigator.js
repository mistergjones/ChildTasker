import React from "react";
import { View, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import screens from "../../config/screens";
import LoginScreen from "../login/LoginScreen";
import ChoreStatusScreen from "../child/ChoreStatusScreen";
import ChildDashBoardScreen from "../child/ChildDashBoardScreen";

const Stack = createStackNavigator();

function ChildStackNavigator(props) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screens.LoginChild} component={LoginScreen} />
      <Stack.Screen
        name={screens.ChildDashBoard}
        component={ChildDashBoardScreen}
      />
      <Stack.Screen name={screens.ChoreStatus} component={ChoreStatusScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ChildStackNavigator;
