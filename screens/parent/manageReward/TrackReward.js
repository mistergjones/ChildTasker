import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
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
import UserPicker from "../../../components/userPicker";
// import { ScrollView } from "react-native-gesture-handler";

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
        let choresForSelectedKid = await getChoresForKid(item.label);
        // console.log("choresForSelectedKid", choresForSelectedKid.length);
        setKidChoresForReward(choresForSelectedKid);
        const filteredRewards = getRewardsHaveBeenAssignedToKid(
            item.label,
            choresForSelectedKid
        );

        // set the rewrads list to only contain rewards that have not been assigned for the child selected
        setRewardList(establishRewardListInObjectFormat(filteredRewards));
        //console.log("handle selected kid filtered reards length = " + filteredRewards.length)
        setSelectedReward(null);
        setSelectedKid(item);
    };

    const getRewardsHaveBeenAssignedToKid = (kidName, rewardsForKid) => {
        // // console.log("rewardsForKid = ", Object.keys(rewardsForKid[0]));

        let filteredRewards = [];
        let filteredChores = [];
        // let choresForKid
        // loop through rewards
        // console.log("rewards length = ", rewards.length);
        // console.log("rewards for kid length = ", Object.keys(rewardsForKid[0]))
        //chore.reward_unique_id
        // for (let x = 0; x < rewards.length; x++) {
        //   let reward = rewards[x];
        // console.log("rewards for kid length = ", rewardsForKid.length);
        // rewards.map((reward) =>
        //     console.log("reward name = " + reward.reward_name)
        // );
        // rewardsForKid.map((rfk) =>
        //     console.log(
        //         "reward name = " +
        //             rfk.reward_name +
        //             "rfk.uniqueID = " +
        //             rfk.rewardUniqueId
        //     )
        // );
        // loop through chores
        for (let i = 0; i < rewardsForKid.length; i++) {
            for (let x = 0; x < rewards.length; x++) {
                let reward = rewards[x];
                let returnReward = {};
                // console.log(
                //     "rewardsForKid[i].rewardID = " + rewardsForKid[i].rewardID
                // );
                // console.log("reward.reward_id = " + reward.reward_id);
                if (rewardsForKid[i].rewardID === reward.reward_id) {
                    // console.log("match");

                    filteredChores.push({
                        rewardID: rewardsForKid[i].rewardUniqueId,
                        chores: rewardsForKid[i].chores,
                    });

                    // console.log(
                    //     "rewardsForKid[i].rewardUniqueId" +
                    //         rewardsForKid[i].rewardUniqueId
                    // );
                    // returnReward = reward;
                    // returnReward.reward_id = rewardsForKid[i].rewardUniqueId;
                    // reward.reward_id = rewardsForKid[i].rewardUniqueId;
                    // console.log(Object.keys(reward))
                    filteredRewards.push({
                        reward_id: rewardsForKid[i].rewardUniqueId,
                        reward_name: rewards[x].reward_name,
                        reward_points: rewards[x].reward_points,
                        icon_id: rewards[x].icon_id,
                        reward_icon_name: rewards[x].reward_icon_name,
                        icon_name: rewards[x].icon_name,
                        background_color: rewards[x].background_color,
                    });
                    break;
                }
            }
        }

        //console.log("filtered rewards length = ", filteredRewards.length);
        // }
        setKidChoresForReward(filteredChores);
        return filteredRewards;
    };
    // this function is to set the status of only the kids mapped to kids
    const handleSelectReward = async (item) => {
        // console.log("item ****" + item.icon);
        setSelectedReward(item);
        for (let i = 0; i < kidChoresForReward.length; i++) {
            if (kidChoresForReward[i].rewardID === item.value) {
                setChoresForReward(kidChoresForReward[i].chores);
                const data = changeChoresToPieChartDataObject(
                    kidChoresForReward[i].chores
                );
                // console.log("TRACK REWARD", data);
                setGraphData(data);
                break;
            }
        }
    };

    // useEffect(() => {
    //   getRewardsHaveBeenAssignedToKid()
    // })

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
                <UserPicker
                    style={styles.picker}
                    items={kidList}
                    icon="account-child"
                    placeholder="Select Child"
                    onSelectItem={handleSelectKid}
                    selectedItem={selectedKid}
                    numberOfColumns={1}
                />

                {selectedKid && (
                    <AppPicker
                        items={rewardList}
                        icon={selectedReward ? selectedReward.icon : "trophy"}
                        placeholder="Select Reward"
                        numberOfColumns={2}
                        PickerItemComponent={CategoryPickerItem}
                        onSelectItem={handleSelectReward}
                        selectedItem={selectedReward}
                        width="90%"
                        showModal={true}
                    />
                )}
                {selectedReward && (
                    <PieChartWithLabels
                        data={graphData}
                        key={graphData[0].id}
                    />
                )}
            </Form>
            <AppButton
                title="Return"
                onPress={() => navigation.navigate(screens.ManageRewards)}
            />
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
    picker: {
        marginBottom: 150,
        // height: 50,
        width: "90%",
        alignSelf: "center",
        backgroundColor: "transparent",
    },
});

export default TrackReward;
