import React, { useContext, useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import Screen from "../../../components/appScreen";
import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";
import screens from "../../../config/screens";
import { Form } from "../../../components/forms";
import CategoryPickerItem from "../../../components/appCategoryPickerItem";
import { UsersContext } from "../../../context/UsersContext";
import {
  establishRewardListInObjectFormat,
  establishKidListInObjectFormat,
  changeChoresToPieChartDataObject,
} from "../../../helpers/createObjectLists";
import AppPicker from "../../../components/appPicker";
//Added component
import PieChartWithLabels from "../../../components/PieChartWithLabels";

function TrackReward({ navigation }) {
  const usersContext = useContext(UsersContext);
  const { kids, rewards, getChoresForKid } = usersContext;

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
        const data = changeChoresToPieChartDataObject(
          kidChoresForReward[i].chores
        );
        setGraphData(data);
        break;
      }
    }
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
        {selectedReward && <PieChartWithLabels data={graphData} />}
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
