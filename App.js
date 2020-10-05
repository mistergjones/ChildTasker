import React from "react";
import StackNavigator from "./screens/NavigationScreen/StackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import styles from "./config/styles";
const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default App;
