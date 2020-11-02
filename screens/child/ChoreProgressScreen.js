import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView, Text, ScrollView } from "react-native";
import AppButton from "../../components/appButton";
import AppHeading from "../../components/appHeading";
import screens from "../../config/screens";
import colours from "../../config/colours";

import { Grid, LineChart, XAxis, YAxis } from "react-native-svg-charts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// pie chart
import { PieChart } from "react-native-svg-charts";
import { Circle, G, Image } from "react-native-svg";
import Images from "../../assets/images";

import AuthContext from "../../components/auth/context";
import { UsersContext } from "../../context/UsersContext";

function ChoreProgressScreen({ navigation, route }) {
    const usersContext = useContext(UsersContext);

    //const { chores } = usersContext;
    // obtain the logged in user. We will use this for the query on the table.
    const { user } = useContext(AuthContext);
    //console.log("Route params contains:  ", route.params);

    // it seems that the first completed task is never being passed by route.params.
    const { chores } = route.params;
    // const { chores } = usersContext;
    // console.log(`Child Dashboard Screen. Child name is: `, user.username);

    // get the latest copy of the kidchores table for the logged in KID. We will then use this in a for loop to update our chart.
    // Given the depth of the array provided to us, we have to add [0].chores to the array to get exactly what we want.
    const { choresForKid } = useContext(UsersContext);

    var rewardPoints = 20;

    //console.log(`The chores are: `, chores);

    // loop through chores and establish the data for the pie charts
    const data = [];
    // an array for the labels
    const labelName = [];
    // an array just for the task points
    const taskPoints = [];
    // an array for all rewards. This will also be used to set the HEADING furtherdown below iva
    const rewardNames = [];

    // variable for counting how many tasks completed and how many remaining
    var completedTasks = 0;
    var notCompletedTasks = 0;

    // obtain the data relevant for the logged in user.
    // Given the depth of the array provided to us, we have to add [0].chores to the array to get exactly what we want.
    for (var i = 0; i < choresForKid[0].chores.length; i++) {
        if (choresForKid[0].chores[i].kid_name === user.username) {
            //console.log(user.username);
            //console.log(choresForKid[0].chores[i].is_completed);
            // console.log(choresForKid[0].chores[i].task_points);

            // push some items into a seperate array
            labelName.push(choresForKid[0].chores[i].task_name);
            taskPoints.push(choresForKid[0].chores[i].task_points);
            rewardNames.push(choresForKid[0].chores[i].reward_name);

            let tempObject = {};
            // to start the numbering at 1 instead of 0 for the keys
            tempObject.Key = i + 1;
            tempObject.amount = choresForKid[0].chores[i].task_points;

            // determine if the task is completed or not/
            if (choresForKid[0].chores[i].is_completed === 0) {
                // assign a light shade of purle
                tempObject.svg = { fill: "#ecb3ff" };
                tempObject.is_complete = 0;
                // update the not completed task counter
                notCompletedTasks += 1;
            } else if (choresForKid[0].chores[i].is_completed === 1) {
                // assign a dark shade of purle
                tempObject.svg = { fill: "#600080" };
                tempObject.is_complete = 1;
                completedTasks += 1;
            }

            data.push(tempObject);
        }
    }
    //console.log(`the GRAPH data array is:`, data);

    // set the REWARD heading to the first instance in the array.
    var rewardName = rewardNames[0];

    const Labels = ({ slices, height, width }) => {
        return slices.map((slice, index) => {
            // console.log(slice);
            const { labelCentroid, pieCentroid, data } = slice;

            // change the icon depending on whether it is completed or not

            if (data.is_complete === 0) {
                var isTaskCompleted = false;
            } else {
                var isTaskCompleted = true;
            }

            return (
                <G key={index} x={labelCentroid[0]} y={labelCentroid[1]}>
                    <Circle r={15} fill={"white"} />

                    <Image
                        x={-10}
                        y={-10}
                        width={20}
                        height={20}
                        preserveAspectRatio="xMidYMid slice"
                        opacity="1"
                        // href={Images.memes[index + 1]}
                        // href={Images.questionMark[index + 1]}
                        href={
                            isTaskCompleted
                                ? Images.ticks[index + 1]
                                : Images.questionMark[index + 1]
                        }
                    />

                    {/* <Text>{labelName[index]}</Text> */}
                </G>
            );
        });
    };

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <AppHeading title="Your Progress is:" />
                <View style={styles.reward}>
                    <View style={styles.rewardContainer}>
                        <Text style={styles.currentScore}>Reward:</Text>
                        <Text style={styles.currentScoreValue}>
                            {rewardName}
                        </Text>
                    </View>
                </View>

                <View>
                    <PieChart
                        key={1}
                        style={{ height: 400 }}
                        valueAccessor={({ item }) => item.amount}
                        data={data}
                        spacing={0}
                        outerRadius={"80%"}
                        key={1}
                    >
                        <Labels />
                    </PieChart>
                </View>

                <View style={styles.score}>
                    <View style={styles.currentScoreContainer}>
                        <Text style={styles.currentScore}>Tasks Complete</Text>
                        <Text style={styles.currentScoreValue}>
                            {completedTasks}
                        </Text>
                    </View>
                    <View style={styles.currentScoreContainer}>
                        <Text style={styles.currentScore}>Tasks Left</Text>
                        <Text style={styles.currentScoreValue}>
                            {notCompletedTasks}
                        </Text>
                    </View>
                </View>

                <AppButton
                    title="Return"
                    onPress={() => navigation.navigate(screens.ChildDashBoard)}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {},
    chart: {
        // padding: 15,
    },
    rewardContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colours.defaultButtonColour,
        borderWidth: 1,
        borderColor: colours.white,
        width: "90%",
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
    },
    reward: {
        alignItems: "center",
        justifyContent: "space-between",
        padding: 5,
    },
    currentScoreContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colours.defaultButtonColour,
        width: "50%",
        borderWidth: 1,
        borderColor: colours.white,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
    },
    currentScore: {
        fontSize: 25,
        color: colours.white,
    },
    currentScoreValue: {
        fontSize: 25,
        color: "gold",
    },
    score: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
    },
    tasks: {
        flex: 1,
        flexDirection: "row",
    },
    task: {
        marginEnd: 10,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },
});

export default ChoreProgressScreen;
