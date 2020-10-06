import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import AppButton from "../../components/appButton";
import screens from "../../config/screens";
import AppHeading from "../../components/appHeading";
import AppChoresCard from "../../components/appChoresCard";
import TaskIcon from "../../components/TaskIcon";

const tasks = [
  { title: "Task 1", icon: "dice-5", points: 10 },
  { title: "Task 2", icon: "car", points: 11 },
  { title: "Task 3", icon: "airplane", points: 12 },
  { title: "Task 4", icon: "boombox", points: 13 },
  { title: "Task 5", icon: "briefcase", points: 14 },
  // { title: "Task 6", icon: "camera", points: 15 },
  // { title: "Task 7", icon: "clock", points: 16 },
  // { title: "Task 8", icon: "whistle", points: 17 },
  // { title: "Task 9", icon: "trophy", points: 18 },
  // { title: "Task 10", icon: "tennis", points: 19 },
  // { title: "Task 11", icon: "human-child", points: 10 },
  // { title: "Task 12", icon: "human", points: 11 },
  // { title: "Task 13", icon: "human-male-boy", points: 12 },
  // { title: "Task 14", icon: "boombox", points: 13 },
  // { title: "Task 15", icon: "briefcase", points: 14 },
  // { title: "Task 16", icon: "camera", points: 15 },
  // { title: "Task 17", icon: "clock", points: 16 },
  // { title: "Task 18", icon: "whistle", points: 17 },
  // { title: "Task 19", icon: "trophy", points: 18 },
  // { title: "Task 20", icon: "tennis", points: 19 },
];
function ChildDashBoardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <AppHeading title="Child Dashboard" />
        <ScrollView style={styles.scrollView} horizontal persistentScrollbar>
          <View>
            <View style={styles.tasks}>
              {tasks.map((task, index) => {
                if (index % 2 === 0) {
                  return (
                    <TaskIcon
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
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  scrollView: {
    height: "50%",
  },
  tasks: {
    flex: 1,
    flexDirection: "row",
  },
});

export default ChildDashBoardScreen;
