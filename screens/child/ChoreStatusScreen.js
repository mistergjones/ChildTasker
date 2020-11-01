import React, { useState, useContext } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
// import * as Yup from "yup";

import ChoresCard from "../../components/appChoresCard";
import Screen from "../../components/appScreen";
import { Form, FormField, SubmitButton } from "../../components/forms";
import Heading from "../../components/appHeading";
import AppButton from "../../components/appButton";
import screens from "../../config/screens";
import colours from "../../config/colours";
import { UsersContext } from "../../context/UsersContext";

function ChoreStatusScreen({ navigation, route }) {
    const {
        users,
        choresForKid,
        getChoresForKid,
        updateChoresForKid,
    } = useContext(UsersContext);
    const [choreCompleted, setChoreCompleted] = useState(false);

    const handleCompleted = async () => {
        console.log("route params = " + route.params.chores.length);
        await updateChoresForKid(
            choresForKid[0].chores[0].kid_name,
            route.params.task_id
        );
        navigation.navigate(screens.ChoreProgress, {
            chores: route.params.chores,
        });
    };
    return (
        <Screen style={styles.container}>
            <Heading title="Chore Status" />
            <View style={styles.body}>
                <View style={styles.bodyContent}>
                    <ChoresCard
                        title={route.params.title}
                        icon={route.params.icon}
                        subTitle={`Points: ${route.params.points}`}
                    />
                </View>
                <View style={styles.bodyForm}>
                    <Form
                        initialValues={{ completed: false }}
                        onSubmit={(values) => console.log(values)}
                    >
                        <View style={styles.switch}>
                            <Text>Completed</Text>
                            <Switch
                                value={choreCompleted}
                                onChange={() =>
                                    setChoreCompleted(!choreCompleted)
                                }
                                trackColor={{
                                    true: colours.defaultButtonColour,
                                }}
                                thumbColor={"#dfe6ed"}
                            />
                            <Text>{choreCompleted ? "Yes" : "No"}</Text>
                        </View>

                        {choreCompleted && (
                            <AppButton title="Save" onPress={handleCompleted} />
                        )}
                        <AppButton
                            title="Return"
                            onPress={() =>
                                navigation.navigate(screens.ChildDashBoard)
                            }
                        />
                    </Form>
                </View>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        // padding: 10,
        // marginVertical: 30,
    },
    body: {
        flex: 1,
        padding: 10,
    },
    bodyContent: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "50%",
    },
    bodyForm: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "50%",
    },
    switch: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
    },
    footer: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default ChoreStatusScreen;
