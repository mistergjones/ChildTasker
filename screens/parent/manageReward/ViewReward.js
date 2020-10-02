import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

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
];
//this is view reward file: changed from add reward to view reward
function ViewReward({ navigation }) {
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
            {/* <AppButton title="Add Reward" /> */}
            <AppLabel labelText="Add Reward Category & Points" />
            {/* <AppHeading title="Add Reward" />
             */}
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
              {/* <AppButton title="Add Reward" />
              <AppButton title="Return" /> */}
              <AppButton
                title="Return"
                onPress={() => navigation.navigate(screens.ManageRewards)}
              />
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

export default ViewReward;
