import React, { useState, useContext } from "react";
import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";
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

    // chore_id instaed of task_id
    const handleCompleted = async () => {
        await updateChoresForKid(
            choresForKid[0].chores[0].kid_name,
            route.params.chore_id
        );
        navigation.navigate(screens.ChoreProgress, {
            chores: route.params.chores,
            chore_id: route.params.chore_id
        });
    };
    return (
        <Screen style={styles.container}>
            <Heading title="Chore Status" />
            <ScrollView >
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
                            onSubmit={(values) => {
                                // console.log(values);
                            }}
                        >
                            <View style={styles.switch}>
                                <Text style={styles.text}>Completed</Text>
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
                                <Text style={styles.text}>
                                    {choreCompleted ? "Yes" : "No"}
                                </Text>
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
            </ScrollView>
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
        width: "90%",
        height: "100%",
        alignSelf: "center",
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
        justifyContent: "space-evenly",
    },
    footer: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: colours.white,
        fontSize: 24,
    }
});

export default ChoreStatusScreen;
