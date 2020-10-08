import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./screens/NavigationScreen/BottomTabNavigator";

const App = () => {
    return (
        <NavigationContainer>
            <BottomTabNavigator />
        </NavigationContainer>
    );
};

export default App;
