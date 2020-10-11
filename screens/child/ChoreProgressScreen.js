import React from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import AppButton from "../../components/appButton";
import AppHeading from "../../components/appHeading";
import screens from "../../config/screens";

import { Grid, LineChart, XAxis, YAxis } from "react-native-svg-charts";

const tasks = [
    { name: "task1", points: 0 },
    { name: "task 1", points: 65 },
    { name: "task 2", points: 25 },
    { name: "task 3", points: 45 },
    { name: "task 4", points: 35 },
    { name: "task 5", points: 7 },
    { name: "task 6", points: 0 },
    { name: "task1", points: 0 },
    { name: "task 1", points: 65 },
    { name: "task 2", points: 25 },
    { name: "task 3", points: 45 },
    { name: "task 4", points: 35 },
    { name: "task 5", points: 7 },
    { name: "task 6", points: 0 },
];
let score = 0;
const totalScore = tasks.map((task) => {
    score += task.points;
    console.log(score);
    return score;
});

const taskScores = tasks.map((task) => task.points);
console.log(totalScore);
const data = [
    { data: totalScore, svg: { stroke: "purple" } },
    { data: taskScores, svg: { stroke: "green" } },
];

const axesSvg = { fontSize: 10, fill: "grey" };
const verticalContentInset = { top: 10, bottom: 10 };
const xAxisHeight = 30;
function ChoreProgressScreen({ navigation }) {
    return (
        <SafeAreaView>
            <AppHeading title="Progress" />

            <View
                style={{
                    height: 200,
                    padding: 10,
                    width: "100%",
                    flexDirection: "row",
                }}
            >
                <YAxis
                    data={totalScore}
                    style={{ marginBottom: xAxisHeight }}
                    contentInset={verticalContentInset}
                    svg={axesSvg}
                    formatLabel={(value, index) => value}
                />
                <View style={{ flex: 1 }}>
                    <LineChart
                        style={{ flex: 1 }}
                        data={data}
                        contentInset={verticalContentInset}
                        svg={{ stroke: "rgb(134, 65, 244)" }}
                    >
                        <Grid />
                    </LineChart>

                    <XAxis
                        style={{
                            height: xAxisHeight,
                            width: "100%",
                        }}
                        data={taskScores}
                        formatLabel={(value, index) => index}
                        contentInset={{ left: 5, right: 5 }}
                        svg={{
                            fontSize: 10,
                            fill: "black",
                            flexWrap: "wrap",
                        }}
                    />
                </View>
            </View>

            <AppButton
                title="Return"
                onPress={() => navigation.navigate(screens.ChildDashBoard)}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {},
    chart: {
        // padding: 15,
    },
});

export default ChoreProgressScreen;
