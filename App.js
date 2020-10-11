import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./screens/NavigationScreen/BottomTabNavigator";

// GJ: adding splashscreen
import * as SplashScreen from "expo-splash-screen";

import useDatabase from "./hooks/useDatabase";
//import useCachedResources from "./hooks/useCachedResources";

// GJ: adding the below
import { UsersContextProvider } from "./context/UsersContext";

const App = () => {
    // GJ adding the below to show the splash screen until DB loaded
    SplashScreen.preventAutoHideAsync(); //don't let the splash screen hide

    // const isLoadingComplete = useCachedResources();
    const isDBLoadingComplete = useDatabase();

    if (isDBLoadingComplete) {
        SplashScreen.hideAsync();

        return (
            <UsersContextProvider>
                <NavigationContainer>
                    <BottomTabNavigator />
                </NavigationContainer>
            </UsersContextProvider>
        );
    } else {
        return null;
    }
};

export default App;
