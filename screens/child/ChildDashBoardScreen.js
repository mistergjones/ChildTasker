import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import AppButton from "../../components/appButton";
import screens from "../../config/screens";
import AppHeading from "../../components/appHeading";
import AppChoresCard from "../../components/appChoresCard";
import TaskIcon from "../../components/TaskIcon";
import colours from "../../config/colours";
import AuthContext from "../../components/auth/context";
import { UsersContext } from "../../context/UsersContext";

const tasks = [
  { title: "Task 1", icon: "dice-5", points: 10 },
  { title: "Task 2", icon: "car", points: 11 },
  { title: "Task 3", icon: "airplane", points: 12 },
  { title: "Task 4", icon: "boombox", points: 13 },
  { title: "Task 5", icon: "briefcase", points: 14 },
  { title: "Task 6", icon: "camera", points: 15 },
  { title: "Task 7", icon: "clock", points: 16 },
  { title: "Task 8", icon: "whistle", points: 17 },
  { title: "Task 9", icon: "trophy", points: 18 },
  { title: "Task 10", icon: "tennis", points: 19 },
  { title: "Task 11", icon: "human-child", points: 10 },
  { title: "Task 12", icon: "human", points: 11 },
  { title: "Task 13", icon: "human-male-boy", points: 12 },
  { title: "Task 14", icon: "boombox", points: 13 },
  { title: "Task 15", icon: "briefcase", points: 14 },
  { title: "Task 16", icon: "camera", points: 15 },
  { title: "Task 17", icon: "clock", points: 16 },
  { title: "Task 18", icon: "whistle", points: 17 },
  { title: "Task 19", icon: "trophy", points: 18 },
  { title: "Task 20", icon: "tennis", points: 19 },
];
function ChildDashBoardScreen({ navigation }) {
  const { setUser } = useContext(AuthContext);
  const { users } = useContext(UsersContext);
  const [availablePoints, setAvailblePoints] = useState(0);

  useEffect(() => {
    let points = 0;
    tasks.map((task) => {
      points += task.points;
    });
    setAvailblePoints(points);
  }, []);
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <AppHeading title="Child Dashboard" />
        <ScrollView
          style={styles.scrollView}
          horizontal
          persistentScrollbar
          alwaysBounce={false}
        >
          <View>
            <View style={styles.tasks}>
              {tasks.map((task, index) => {
                if (index % 2 === 0) {
                  return (
                    <TaskIcon
                      style={styles.task}
                      key={index}
                      title={task.title}
                      icon={task.icon}
                      points={task.points}
                    />
                  );
                }
              })}
            </View>
            <View style={styles.tasks}>
              {tasks.map((task, index) => {
                if (index % 2 !== 0) {
                  return (
                    <TaskIcon
                      style={styles.task}
                      key={index}
                      title={task.title}
                      icon={task.icon}
                      points={task.points}
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
            <Text style={styles.currentScoreValue}>100</Text>
          </View>
          <View style={styles.currentScoreContainer}>
            <Text style={styles.currentScore}>Available</Text>
            <Text style={styles.currentScoreValue}>{availablePoints}</Text>
          </View>
        </View>

        <AppButton
          title="View Progress"
          onPress={() => navigation.navigate(screens.ChoreProgress)}
        />

        <AppButton
          title="Edit Profile"
          onPress={() => navigation.navigate(screens.EditProfile)}
        />
        <AppButton title="Logout" onPress={() => setUser(null)} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  currentScoreContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colours.defaultButtonColour,
    width: "50%",
    borderWidth: 1,
    borderColor: colours.white,
  },
  currentScore: {
    fontSize: 25,
    color: colours.white,
  },
  currentScoreValue: {
    fontSize: 25,
    color: "gold",
  },
  scrollView: {
    height: "50%",
    paddingLeft: 15,
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

export default ChildDashBoardScreen;
