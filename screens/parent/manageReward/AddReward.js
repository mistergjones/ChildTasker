import React from "react";
import { View, StyleSheet } from "react-native";

import Screen from "../../../components/appScreen";
import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";
import AppLabel from "../../../components/appLabel";

import AppMaterialIcon from "../../../components/appMaterialCommunityIcon";

function AddReward(props) {
  return (
    <Screen style={styles.container}>
      <AppHeading title="Add Reward" />
      <AppLabel labelText="Add Reward Category & Points" />
      <View></View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AddReward;
