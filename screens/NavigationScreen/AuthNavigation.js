import React from "react";
import { View, StyleSheet } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import screens from "../../config/screens";
import LoginScreen from "../login/LoginScreen";

const Stack = createStackNavigator();

function AuthNavigation(props) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screens.Login} component={LoginScreen} />
    </Stack.Navigator>
  );
}

export default AuthNavigation;
