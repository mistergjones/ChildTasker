import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from "react-native";
import AppButton from "../../components/appButton";
import AppHeading from "../../components/appHeading";
import screens from "../../config/screens";
import colours from "../../config/colours";
import Screen from "../../components/appScreen";

import { Grid, LineChart, XAxis, YAxis } from "react-native-svg-charts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// pie chart
import { PieChart } from "react-native-svg-charts";
import { Circle, G, Image } from "react-native-svg";
import Images from "../../assets/images";

import AuthContext from "../../components/auth/context";
import { UsersContext } from "../../context/UsersContext";

import PieChartWithLabels from "../../components/PieChartWithLabels";
import { changeChoresToPieChartDataObject } from "../../helpers/createObjectLists";

function ChoreProgressScreen({ navigation, route }) {
  const usersContext = useContext(UsersContext);

  //const { chores } = usersContext;
  // obtain the logged in user. We will use this for the query on the table.
  const { user } = useContext(AuthContext);
  //console.log("Route params contains:  ", route.params);

  // it seems that the first completed task is never being passed by route.params.
  const { chores } = route.params;
  // console.log("Chores got from param", chores);
  // const { chores } = usersContext;
  const { choresForKid } = usersContext;
  console.log("choresForKid got from context", choresForKid);
  // console.log(`Child Dashboard Screen. Child name is: `, user.username);
  console.log("choresForKid[0].chores.length", choresForKid[0].chores);
  // set the graphData
  const [graphData, setGraphData] = useState([]);

  // set the completed Tasks
  var [tasksComplete, setTasksComplete] = useState(0);
  var [tasksNotComplete, setTasksNotCompplete] = useState(0);

  var completedTasks = 0;
  var notCompletedTasks = 0;
  // obtain the reward name from teh first object in the array of objects
  const rewardName = chores[0].reward_name;

  // estalish empty array and colours for completion

  useEffect(() => {
    var storeCorrectKidNameRewardIDInformation = [];
    //console.log("ROUTE PARAMS CHORES INFO IS", chores);
    //console.log("KID CHORES FOR KID IS: ", choresForKid[0].chores);
    // ROUTE PARAMS is not passing the updated completd tasks. Therefore need to use 2 datasets.
    // 1. obtains CHORES PARAMS reward_id. We only need the first item in each one.
    var chores_reward_id = chores[0].reward_id;
    var chores_kid_name = chores[0].kid_name;

    // 2. obtain CHORESFORKID info - the master dataset with all kid chores
    console.log({ chores_reward_id });
    console.log({ chores_kid_name });
    // console.log("The length", choresForKid[0].chores.length);
    for (var i = 0; i < choresForKid.length; i++) {
      for (var j = 0; j < choresForKid[i].chores.length; j++) {
        // now we need to only keep the information from the choreForKid dataset that relates to the passed in data from chores.
        // storeCorrectKidNameRewardIDInformation.push(choresForKid[0].chores[j]);
        if (
          chores_kid_name === choresForKid[i].chores[j].kid_name &&
          chores_reward_id === choresForKid[i].chores[j].reward_id
        ) {
          // store each correct object in an array,
          storeCorrectKidNameRewardIDInformation.push(
            choresForKid[i].chores[j]
          );
          console.log("matched kid chore", choresForKid[i].chores[j]);
          // update the tasks ocmplete coutner
          if (choresForKid[i].chores[j].is_completed === 1) {
            // completedTasks += 1;
            setTasksComplete((tasksComplete += 1));
          } else {
            setTasksNotCompplete((tasksNotComplete += 1));
          }
        }
      }
    }
    //console.log("WTF", storeCorrectKidNameRewardIDInformation);
    // we can simply pass only those items to the helper function to finalise the graph data
    var gj = changeChoresToPieChartDataObject(
      storeCorrectKidNameRewardIDInformation
    );
    console.log(`HERE WE ARE`, gj);
    setGraphData(gj);
  }, [chores]);

  // graphData = changeChoresToPieChartDataObject(chores);

  return (
    <Screen>
      {/* <SafeAreaView> */}
      {/* <ScrollView style={styles.container}> */}
      <AppHeading title="Your Progress is:" />
      <View style={styles.reward}>
        <View style={styles.rewardContainer}>
          <Text style={styles.currentScore}>Reward:</Text>
          <Text style={styles.currentScoreValue}>{rewardName}</Text>
        </View>
      </View>

      <PieChartWithLabels data={graphData} />

      <View style={styles.score}>
        <View style={styles.currentScoreContainer}>
          <Text style={styles.currentScore}>Tasks Complete</Text>
          <Text style={styles.currentScoreValue}>{tasksComplete}</Text>
        </View>
        <View style={styles.currentScoreContainer}>
          <Text style={styles.currentScore}>Tasks Left</Text>
          <Text style={styles.currentScoreValue}>{tasksNotComplete}</Text>
        </View>
      </View>

      <AppButton
        title="Return"
        onPress={() => navigation.navigate(screens.ChildDashBoard)}
      />
      {/* </ScrollView> */}
      {/* </SafeAreaView> */}
    </Screen>
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
