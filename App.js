import React, { useState, useEffect } from "react";
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
import RegisterScreen from './screens/login/RegisterScreen';
import { getIsLoaded } from "./asyncStorage/asyncStorage"

const App = () => {
  const [user, setUser] = useState(null);
  const [switchUser, setSwitchUser] = useState(false);
  const [switchUserName, setSwitchUserName] = useState(null)
  const [firstLoad, setFirstLoad] = useState();
  const { users } = UsersContextProvider
  const loadUser = async () => {
    setFirstLoad(await getIsLoaded("firstLogin"))
  }

  useEffect(() => {
    loadUser()
  }, [])

  // GJ adding the below to show the splash screen until DB loaded
  //SplashScreen.preventAutoHideAsync(); //don't let the splash screen hide

  // const isLoadingComplete = useCachedResources();
  const isDBLoadingComplete = useDatabase();

  if (isDBLoadingComplete) {
    //SplashScreen.hideAsync();

    return (
      <UsersContextProvider value={{ users }}>
        <AuthContext.Provider
          value={{
            user, setUser, switchUser, setSwitchUser, switchUserName, setSwitchUserName, firstLoad, setFirstLoad
          }}
        >
          <NavigationContainer>
            {firstLoad ? <RegisterScreen /> :
              user ? <BottomTabNavigator /> : <AuthNavigation />}
          </NavigationContainer>
        </AuthContext.Provider>
      </UsersContextProvider>
    );
  } else {
    return null;
  }
};

export default App;
