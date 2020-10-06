import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ParentStackNavigator from "./ParentStackNavigator";
import ChildStackNavigator from "./ChildStackNavigator";

const Tab = createBottomTabNavigator();

function BottomTabNavigator(props) {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Parent" component={ParentStackNavigator} />
      <Tab.Screen name="Child" component={ChildStackNavigator} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default BottomTabNavigator;
