import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Modal,
  Button,
  TouchableHighlight,
  Alert,
  ScrollView,
} from "react-native";

import Screen from "../../../components/appScreen";
import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";
import AppLabel from "../../../components/appLabel";
import AppText from "../../../components/appText";
import ListItem from "../../../components/appListItem";
import screens from "../../../config/screens";
import AppMaterialIcon from "../../../components/appMaterialCommunityIcon";
import { UsersContext } from "../../../context/UsersContext.js";

function ViewReward({ navigation }) {
  const {
    rewards,
    selectedReward,
    setSelectedReward,
    deleteReward,
    // updateReward,
    getRewardByID,
    selectedRewardDetails,
    // selectedRewardDetails,
  } = useContext(UsersContext);
  console.log("View Reward line 33", rewards);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Screen>
      <AppHeading title="View Reward Category & Points" />
      <AppText style={{ textAlign: "center", color: "white" }}>
        Long press the icon to edit or delete the reward
      </AppText>

      <FlatList
        style={styles.rewardContainer}
        // contentContainerStyle={styles.wrapper}
        numColumns={"2"}
        data={rewards}
        keyExtractor={(reward) => reward.reward_id}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                backgroundColor: "#af7b4b",
                height: 15,
              }}
            />
          );
        }}
        renderItem={({ item }) => (
          <TouchableHighlight
            style={{ padding: 5, width: "50%" }}
            onLongPress={() => {
              setSelectedReward(item.reward_id);
              setModalVisible(!modalVisible);
            }}
          >
            <ListItem
              title={item.reward_name}
              subTitle={item.reward_points}
              // image={item.image}
              icon={item.icon_name}
              color={item.background_color}
              style={{
                borderBottom: "#af7b4b",
                borderWidth: 15,
              }}
            />
          </TouchableHighlight>
        )}
        // ListHeaderComponent={}
        // ListFooterComponent={<></>}
      />
      <AppButton
        width="90%"
        title="Return"
        onPress={() => navigation.navigate(screens.ManageRewards)}
      />

      <>
        <Modal visible={modalVisible} animationType="slide">
          <Screen>
            <AppButton
              title="Close"
              onPress={() => {
                setModalVisible(false);
              }}
            />
            <View>
              <AppButton
                title="Delete Reward"
                onPress={() =>
                  Alert.alert(
                    "Remove Reward",
                    "Click Ok to remove reward",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                      },
                      {
                        text: "OK",
                        onPress: async () => {
                          setModalVisible(!modalVisible);
                          deleteReward(selectedReward);
                          // console.log("Long pressed deleted", selectedReward);
                          // Alert.alert("Deleted");
                          navigation.navigate(screens.ViewReward);
                        },
                      },
                    ],
                    { cancelable: false }
                  )
                }
              />
              <AppButton
                title="Edit Reward"
                onPress={async () => {
                  setModalVisible(!modalVisible);
                  // console.log("1", selectedRewardDetails);
                  await getRewardByID(selectedReward);
                  // console.log("2", selectedRewardDetails);
                  navigation.navigate("EditReward");
                }}
              />
            </View>
          </Screen>
        </Modal>
      </>
    </Screen>
  );
}

const styles = StyleSheet.create({
  rewardContainer: {
    paddingBottom: 25,
    margin: 15,
    backgroundColor: "#f1d8b0",
    borderColor: "#af7b4b",
    borderWidth: 15,
    elevation: 4,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },

  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ViewReward;
