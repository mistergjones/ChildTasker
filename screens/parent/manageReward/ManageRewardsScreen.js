import React from "react";
import { View, StyleSheet } from "react-native";
import screens from "../../../config/screens";
import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";
import AppLabel from "../../../components/appLabel";

import AppMaterialIcon from "../../../components/appMaterialCommunityIcon";

function ManageRewardsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <AppHeading title="Manage Reward Dashboard" />

      <View style={{ marginBottom: 30 }} />
      <AppLabel labelText="Trophy cabinet with icons here" />
      <View style={{ marginBottom: 30 }} />

      <AppButton
        title="Add Reward"
        onPress={() => navigation.navigate(screens.AddReward)}
      />

      <AppButton
        title="Edit Reward"
        onPress={() => navigation.navigate(screens.EditReward)}
      />

      <AppButton
        title="Return"
        onPress={() => navigation.navigate(screens.ParentDashBoard)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ManageRewardsScreen;
