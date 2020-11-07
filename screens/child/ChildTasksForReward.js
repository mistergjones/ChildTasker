import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import Screen from "../../components/appScreen";
import AppHeading from "../../components/appHeading";
import AppButton from "../../components/appButton";
import colours from "../../config/colours";
import TaskIcon from "../../components/TaskIcon";
import screens from "../../config/screens";

function ChildTasksForReward({ navigation, route }) {
    const { chores, rewardName, reward_id } = route.params;
    const [score, setScore] = useState(0);
    const [available, setAvailable] = useState(0);
    console.log("chores length" + chores.length);
    useEffect(() => {
        let score = 0;
        let available = 0;
        console.log(`The reward id is:`, reward_id);
        chores.map((chore) => {
            chore.is_completed === 1
                ? (score += chore.task_points)
                : (available += chore.task_points);
        });
        setScore(score);
        setAvailable(available);
    }, []);
    return (
        <Screen>
            <AppHeading title="Tasks For Reward" />
            <View style={styles.reward}>
                <View style={styles.rewardContainer}>
                    <Text style={styles.currentScore}>
                        Reward: {rewardName}
                    </Text>
                    <Text style={styles.currentScoreValue}>
                        Points: {chores[0].reward_points}
                    </Text>
                </View>
            </View>
            <ScrollView
                style={styles.scrollView}
                horizontal
                persistentScrollbar
                alwaysBounce={false}
            >
                <View>
                    <View style={styles.tasks}>
                        {chores.map((chore, index) => {
                            if (index % 2 === 0) {
                                return (
                                    <TaskIcon
                                        style={styles.task}
                                        key={index}
                                        title={chore.task_name}
                                        icon={chore.icon_name}
                                        points={chore.task_points}
                                        color={
                                            chore.is_completed === 1
                                                ? "green"
                                                : "red"
                                        }
                                        task_id={chore.task_id}
                                        chores={chores}
                                        completed={chore.is_completed}
                                    />
                                );
                            }
                        })}
                    </View>
                    <View style={styles.tasks}>
                        {chores.map((chore, index) => {
                            if (index % 2 !== 0) {
                                return (
                                    <TaskIcon
                                        style={styles.task}
                                        key={index}
                                        title={chore.task_name}
                                        icon={chore.icon_name}
                                        points={chore.task_points}
                                        color={
                                            chore.is_completed === 1
                                                ? "green"
                                                : "red"
                                        }
                                        task_id={chore.task_id}
                                        chores={chores}
                                        completed={chore.is_completed}
                                    />
                                );
                            }
                        })}
                    </View>
                </View>
            </ScrollView>
            <View style={styles.score}>
                <View style={styles.currentScoreContainer}>
                    <Text style={styles.currentScore}>Score</Text>
                    <Text style={styles.currentScoreValue}>{score}</Text>
                </View>
                <View style={styles.currentScoreContainer}>
                    <Text style={styles.currentScore}>Remaining</Text>
                    <Text style={styles.currentScoreValue}>{available}</Text>
                </View>
            </View>
            <AppButton
                title="Return"
                onPress={() => navigation.navigate(screens.ChildDashBoard)}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        // height: "50%"
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
        width: "45%",
        borderWidth: 1,
        borderColor: colours.white,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
    },
    currentScore: {
        fontSize: 25,
        color: "gold",
    },
    currentScoreValue: {
        fontSize: 25,
        color: "gold",
    },
    tasks: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "center",
        // backgroundColor: "yellow",
        // borderColor: colours.buttonBorder,
        // borderWidth: 1,
        width: "100%",
    },
    scrollView: {
        marginTop: 20,
        height: "50%",
        // paddingLeft: 15,
        backgroundColor: colours.buttonBackground,
        width: "90%",
        alignSelf: "center",
        opacity: 0.9,
        borderRadius: 20,
        // borderWidth: 1,
        // borderColor: colours.buttonBorder,
        borderWidth: 1,
        borderColor: colours.white,
    },
    task: {
        alignItems: "center",
        justifyContent: "center",
    },
    score: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        padding: 15,
    },
});

export default ChildTasksForReward;
