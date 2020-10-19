import React, { useState } from "react";
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

const rewards = [
  {
    id: 1,
    title: "Takeaway",
    points: 10,
    image: require("../../../assets/favicon.png"),
  },
  {
    id: 2,
    title: "Games",
    points: 15,
    image: require("../../../assets/favicon.png"),
  },
  {
    id: 3,
    title: "Internet",
    points: 15,
    image: require("../../../assets/favicon.png"),
  },
  {
    id: 4,
    title: "Whatever",
    points: 10,
    image: require("../../../assets/favicon.png"),
  },
  {
    id: 5,
    title: "Whatever",
    points: 10,
    image: require("../../../assets/favicon.png"),
  },
  {
    id: 6,
    title: "Whatever",
    points: 10,
    image: require("../../../assets/favicon.png"),
  },
  {
    id: 7,
    title: "Whatever",
    points: 10,
    image: require("../../../assets/favicon.png"),
  },
  {
    id: 8,
    title: "Whatever",
    points: 10,
    image: require("../../../assets/favicon.png"),
  },
  {
    id: 9,
    title: "Whatever",
    points: 10,
    image: require("../../../assets/favicon.png"),
  },
  {
    id: 10,
    title: "Whatever",
    points: 10,
    image: require("../../../assets/favicon.png"),
  },
  {
    id: 11,
    title: "Whatever",
    points: 10,
    image: require("../../../assets/favicon.png"),
  },
  {
    id: 12,
    title: "Whatever",
    points: 10,
    image: require("../../../assets/favicon.png"),
  },
];
//this is view reward file: changed from add reward to view reward
function ViewReward({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Screen>
      <AppHeading title="View Reward Category & Points" />
      <FlatList
        style={styles.rewardContainer}
        contentContainerStyle={styles.wrapper}
        numColumns={"3"}
        data={rewards}
        keyExtractor={(reward) => reward.id.toString()}
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
              setModalVisible(!modalVisible);
            }}
          >
            <ListItem
              title={item.title}
              subTitle={item.points}
              image={item.image}
              style={{ borderBottom: "#af7b4b", borderWidth: 15 }}
            />
          </TouchableHighlight>
        )}
        ListHeaderComponent={
          <>
            {/* <AppHeading title="View Reward Category & Points" /> */}
            <Modal visible={modalVisible} animationType="slide">
              <Screen>
                <Button title="Close" onPress={() => setModalVisible(false)} />
                <View>
                  <AppButton
                    title="Delete Reward"
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      Alert.alert("Deleted");
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
