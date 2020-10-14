import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./screens/NavigationScreen/BottomTabNavigator";
import AuthContext from "./components/auth/context";
import LoginScreen from "./screens/login/LoginScreen";
import ParentStackNavigator from "./screens/NavigationScreen/ParentStackNavigator";
import ChildStackNavigator from "./screens/NavigationScreen/ChildStackNavigator";
import AuthNavigation from "./screens/NavigationScreen/AuthNavigation";

// GJ: adding splashscreen
import * as SplashScreen from "expo-splash-screen";

import useDatabase from "./hooks/useDatabase";
//import useCachedResources from "./hooks/useCachedResources";

// GJ: adding the below
import { UsersContextProvider } from "./context/UsersContext";

const App = () => {
  const [user, setUser] = useState(null);
  const [switchUser, setSwitchUser] = useState(false);
  const [count, setCount] = useState(0);
  // GJ adding the below to show the splash screen until DB loaded
  //SplashScreen.preventAutoHideAsync(); //don't let the splash screen hide

  // const isLoadingComplete = useCachedResources();
  const isDBLoadingComplete = useDatabase();

  if (isDBLoadingComplete) {
    //SplashScreen.hideAsync();

    return (
      <UsersContextProvider>
        <AuthContext.Provider
          value={{ user, setUser, switchUser, setSwitchUser }}
        >
          <NavigationContainer>
            {user ? <BottomTabNavigator /> : <AuthNavigation />}
          </NavigationContainer>
        </AuthContext.Provider>
      </UsersContextProvider>
    );
  } else {
    return null;
  }
};

export default App;
