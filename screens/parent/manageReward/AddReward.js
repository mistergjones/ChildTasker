import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

import Screen from "../../../components/appScreen";
import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";
import AppLabel from "../../../components/appLabel";
import AppText from "../../../components/appText";
import ListItem from "../../../components/appListItem";

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
];
function AddReward(props) {
  return (
    <Screen style={styles.container}>
      <FlatList
        style={styles.rewardContainer}
        numColumns={"3"}
        data={rewards}
        keyExtractor={(reward) => reward.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.points}
            image={item.image}
          />
        )}
        ListHeaderComponent={
          <>
            <AppHeading title="Add Reward" />
            <AppLabel labelText="Add Reward Category & Points" />
          </>
        }
        ListFooterComponent={
          <>
            <View style={styles.tabLinks}>
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
            </View>
            <View>
              <AppButton title="Finalise Changes" />
              <AppButton title="Return" />
            </View>
          </>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  rewardContainer: {
    margin: 15,
  },
  tabLinks: {
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  tab: {
    margin: 10,
  },
});

export default AddReward;
