import React, { useState, useContext } from "react";
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
import { UsersContext } from "../../../context/UsersContext.js";

function ViewReward({ navigation }) {
  const {
    rewards,
    selectedReward,
    setSelectedReward,
    deleteReward,
    // updateReward,
    // getRewardByID,
  } = useContext(UsersContext);
  console.log("View Reward", rewards);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Screen>
      <AppHeading title="View Reward Category & Points" />
      <FlatList
        style={styles.rewardContainer}
        contentContainerStyle={styles.wrapper}
        numColumns={"3"}
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
            style={{ margin: 5 }}
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
              style={{ borderBottom: "#af7b4b", borderWidth: 15 }}
            />
          </TouchableHighlight>
        )}
        ListHeaderComponent={
          <>
            <Modal visible={modalVisible} animationType="slide">
              <Screen>
                <Button
                  title="Close"
                  onPress={() => {
                    setModalVisible(false);
                  }}
                />
                <View>
                  <AppButton
                    title="Delete Reward"
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      deleteReward(selectedReward);
                      console.log("Long pressed deleted", selectedReward);
                      Alert.alert("Deleted");
                      // setSelectedReward(null);
                      navigation.navigate(screens.ViewReward);
                    }}
                  />
                  <AppButton
                    title="Edit Reward"
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      navigation.navigate("EditReward");
                    }}
                  />
                </View>
              </Screen>
            </Modal>
          </>
        }
        ListFooterComponent={
          <>
            {/* <View style={styles.tabLinks}>
<View style={styles.tab}>
<AppMaterialIcon
iconName="dice-5"
iconSize={42}
iconColor="blue"
/>
<AppText>Tab 1</AppText>
</View>
<View style={styles.tab}>
<AppMaterialIcon iconName="table-large" iconSize={42} />
<AppText>Tab 2</AppText>
</View>
</View> */}
            {/* <View style={{ width: "100%" }}>
<AppButton
width="90%"
title="Return"
onPress={() => navigation.navigate(screens.ManageRewards)}
/>
</View> */}
          </>
        }
      />
      <AppButton
        width="90%"
        title="Return"
        onPress={() => navigation.navigate(screens.ManageRewards)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  rewardContainer: {
    paddingBottom: 5,
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
  tabLinks: {
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  tab: {
    margin: 10,
  },
  wrapper: {
    alignItems: "center",
  },
});

export default ViewReward;
