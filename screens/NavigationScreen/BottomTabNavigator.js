import React, { useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ParentStackNavigator from "./ParentStackNavigator";
import ChildStackNavigator from "./ChildStackNavigator";
import colours from "../../config/colours";
import AuthContext from "../../components/auth/context";
import LoginScreen from "../login/LoginScreen";
import SwitchUser from "../login/SwitchUser";
import screens from "../../config/screens";
import { useRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

function BottomTabNavigator(props) {
    const { user, setUser, switchUser, setSwitchUser } = useContext(
        AuthContext
    );
    useEffect(() => {
        if (switchUser) {
            setSwitchUser(false);
            setUser(null);
        }
    }, [switchUser]);
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
            tabBarOptions={{
                activeBackgroundColor: colours.defaultButtonColour,
                activeTintColor: colours.white,
                inactiveBackgroundColor: colours.light,
                inactiveTintColor: "grey",
                labelStyle: {
                    fontSize: 20,
                    fontWeight: "bold",
                },
                tabStyle: {
                    fontSize: 50,
                },
            }}
        >
            {user.isParent && (
                <Tab.Screen
                    name="Parent"
                    component={ParentStackNavigator}
                    options={{
                        tabBarIcon: ({ size, color }) => (
                            <MaterialCommunityIcons
                                name="human-male-female"
                                size={size}
                                color={color}
                            />
                        ),
                    }}
                />
            )}
            {!user.isParent && (
                <Tab.Screen
                    name="Child"
                    component={ChildStackNavigator}
                    options={{
                        tabBarIcon: ({ size, color }) => (
                            <MaterialCommunityIcons
                                name="human-child"
                                size={size}
                                color={color}
                            />
                        ),
                    }}
                />
            )}

            <Tab.Screen
                name="Switch User"
                component={SwitchUser}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <MaterialCommunityIcons
                            name="settings"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {},
});

export default BottomTabNavigator;
