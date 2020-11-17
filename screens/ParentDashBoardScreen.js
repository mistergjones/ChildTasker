import React, { useContext, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import AppButton from "../components/appButton";
import AppHeading from "../components/appHeading.js";
import AuthContext from "../components/auth/context";

import screens from "../config/screens";
import Screen from "../components/appScreen"

function ParentDashBoardScreen({ navigation }) {
    const { setUser, switchUser, setSwitchUser } = useContext(AuthContext);

    return (
        <Screen>


            <ScrollView style={styles.container}>
                <AppHeading title="Parent Dashboard" />

                <AppButton
                    title="Manage Child Details"
                    onPress={() =>
                        navigation.navigate(screens.ParentChildDashBoard)
                    }
                />

                <AppButton
                    title="Manage Rewards"
                    onPress={() => navigation.navigate(screens.ManageRewards)}
                />

                <AppButton
                    title="Manage Categories & Tasks"
                    onPress={() => navigation.navigate(screens.AddCategory)}
                />

                <AppButton
                    title="Create Tasks for Child"
                    onPress={() =>
                        navigation.navigate(screens.CreateTaskListForChild)
                    }
                />





                {/* <AppButton
                title="Track Pocket Money"
                onPress={() => navigation.navigate(screens.TrackPocketMoney)}
            />

            <AppButton
                title="View Accomplishments"
                onPress={() => navigation.navigate(screens.ViewAccomplishments)}
            /> */}



                {/* <AppButton
                title="View Database users"
                onPress={() => navigation.navigate(screens.ViewDatabaseUsers)}
            /> */}
                <AppButton
                    title="Register Parent"
                    onPress={() => navigation.navigate(screens.Register)}
                />

                <AppButton title="Logout" onPress={() => setUser(null)} />
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {},
});

export default ParentDashBoardScreen;
