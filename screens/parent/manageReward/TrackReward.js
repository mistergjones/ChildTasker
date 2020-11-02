import React, { useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Modal,
  Button,
  TouchableHighlight,
  Alert,
} from "react-native";
import Screen from "../../../components/appScreen";
import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";
import AppLabel from "../../../components/appLabel";
import AppText from "../../../components/appText";
import ListItem from "../../../components/appListItem";
import screens from "../../../config/screens";
import AppMaterialIcon from "../../../components/appMaterialCommunityIcon";
import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../../../components/forms";
import CategoryPickerItem from "../../../components/appCategoryPickerItem";
import { UsersContext } from "../../../context/UsersContext";
import {
  establishCategoryTasksListInObjectFormat,
  establishRewardListInObjectFormat,
  establishKidListInObjectFormat,
} from "../../../helpers/createObjectLists";
import AppPicker from "../../../components/appPicker";
import { PieChart } from "react-native-svg-charts";
import { Circle, G, Image, Text } from "react-native-svg";
function TrackReward({ navigation }) {
  const usersContext = useContext(UsersContext);
  const {
    kids,
    rewards,
    items,
    addNewItem,
    categories,
    addNewCategory,
    tasks,
    addNewTask,
    getSpecificTasksGlen,
    specifics,
    addChoresToKid,
    choresForKid,
    getChoresForKid,
    chores,
  } = usersContext;

  // KiDS
  const [selectedKid, setSelectedKid] = useState(null);

  //to get all kids name for dropdown menu
  var kidList = [];
  kidList = establishKidListInObjectFormat(kids);

  // REWARDS
  const [selectedReward, setSelectedReward] = useState(null);

  const [rewardList, setRewardList] = useState([]);
  const [kidChoresForReward, setKidChoresForReward] = useState([]);
  const [choresForReward, setChoresForReward] = useState([]); //this will be storing filtered actual chores for the reward

  const [graphData, setGraphData] = useState();
  // this function is to set the status of only the kids mapped to kids
  const handleSelectKid = async (item) => {
    setSelectedKid(item);
    let choresForSelectedKid = await getChoresForKid(item.label);
    console.log("choresForSelectedKid", choresForSelectedKid.length);
    setKidChoresForReward(choresForSelectedKid);
    const filteredRewards = getRewardsHaveBeenAssignedToKid(
      item.label,
      choresForSelectedKid
    );

    // set the rewrads list to only contain rewards that have not been assigned for the child selected
    setRewardList(establishRewardListInObjectFormat(filteredRewards));
    setSelectedReward(null);
    // console.log(selectedKid);
  };

  const getRewardsHaveBeenAssignedToKid = (kidName, rewardsForKid) => {
    console.log("rewardsForKid = ", Object.keys(rewardsForKid[0]));

    let filteredRewards = [];
    let filteredChores = [];
    // let choresForKid
    // loop through rewards
    for (let x = 0; x < rewards.length; x++) {
      let reward = rewards[x];

      let match = false;
      // loop through chores
      for (let i = 0; i < rewardsForKid.length; i++) {
        if (rewardsForKid[i].rewardID === reward.reward_id) {
          match = true;
          filteredChores.push({
            rewardID: reward.reward_id,
            chores: rewardsForKid[i].chores,
          });
        }
      }

      if (match) {
        filteredRewards.push(reward);
      }
    }
    setKidChoresForReward(filteredChores);
    return filteredRewards;
  };
  // this function is to set the status of only the kids mapped to kids
  const handleSelectReward = async (item) => {
    console.log("item ****" + item.icon);
    setSelectedReward(item);
    for (let i = 0; i < kidChoresForReward.length; i++) {
      if (kidChoresForReward[i].rewardID === item.value) {
        setChoresForReward(kidChoresForReward[i].chores);
        const data = kidChoresForReward[i].chores.map((chore, index) => {
          return {
            key: index,
            amount: chore.task_points,
            taskName: chore.task_name,
            svg:
              chore.is_completed === 1
                ? { fill: "#A42CD6" }
                : { fill: "#859C27" },
          };
        });
        setGraphData(data);
        break;
      }
    }
  };

  const Labels = ({ slices, height, width }) => {
    return slices.map((slice, index) => {
      const { labelCentroid, pieCentroid, data } = slice;
      return (
        <Text
          key={index}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill={"white"}
          textAnchor={"middle"}
          alignmentBaseline={"middle"}
          fontSize={18}
          fontWeight="bold"
          stroke={"white"}
          strokeWidth={0.2}
        >
          {(data.amount, data.taskName)}
          {index === 0 ? (
            <>
              {/* <AppText style={{ color: "black" }}>Legend:</AppText> */}
              <AppText style={{ color: "#A42CD6", fontWeight: "bold" }}>
                Completed
              </AppText>
              <AppText
                style={{
                  color: "#859C27",
                  fontWeight: "bold",
                  marginRight: 5,
                }}
              >
                Incomplete
              </AppText>
            </>
          ) : (
            ""
          )}
        </Text>
      );
    });
  };
  return (
    <Screen>
      <AppHeading title="Track Reward" />
      <Form
        initialValues={{
          category_id: "",
          category_name: "",
          task_id: "",
          task_name: "",
          task_points: "",
          kid_id: "",
          kid_name: "",
          reward_id: "",
          reward_name: "",
          reward_Points: "",
        }}
        // onSubmit={(values) => console.log(values)}
      >
        <AppPicker
          items={kidList}
          icon="face"
          numberOfColumns={3}
          placeholder="Select Child"
          onSelectItem={handleSelectKid}
          selectedItem={selectedKid}
          width="90%"
        />
        {selectedKid && (
          <AppPicker
            items={rewardList}
            icon={selectedReward ? selectedReward.icon : "trophy"}
            placeholder="Select Reward"
            numberOfColumns="2"
            PickerItemComponent={CategoryPickerItem}
            onSelectItem={handleSelectReward}
            selectedItem={selectedReward}
            width="90%"
          />
        )}
        {selectedReward && (
          <PieChart
            style={{ height: "50%", width: "95%", alignSelf: "center" }}
            valueAccessor={({ item }) => item.amount}
            data={graphData}
            spacing={0}
            outerRadius={"94%"}
          >
            <Labels />
          </PieChart>
        )}
        <AppButton
          title="Return"
          onPress={() => navigation.navigate(screens.ManageRewards)}
        />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  lineGraphContainer: {
    flexDirection: "row",
    height: 200,
    padding: 10,
    width: "100%",
  },
  tabLinks: {
    marginTop: 15,
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  tab: {
    margin: 10,
  },
});

export default TrackReward;
