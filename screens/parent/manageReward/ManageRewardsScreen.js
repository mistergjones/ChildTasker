import React, { useEffect, useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import screens from "../../../config/screens";
import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";
import AppLabel from "../../../components/appLabel";
import Screen from "../../../components/appScreen";
import AppMaterialIcon from "../../../components/appMaterialCommunityIcon";
import AuthContext from "../../../components/auth/context";

function ManageRewardsScreen({ navigation }) {
  return (
    <Screen style={styles.container}>

      <AppHeading title="Manage Reward Dashboard" />
      <ScrollView>
        <View style={{ marginBottom: 30 }} />
        {/* <AppLabel labelText="Trophy cabinet with icons here" /> */}
        <View style={{ marginBottom: 30 }} />

        <AppButton
          title="Add Reward"
          onPress={() => navigation.navigate(screens.AddReward)}
        />

        <AppButton
          title="View Reward"
          onPress={() => navigation.navigate(screens.ViewReward)}
        />


        {/* <AppButton
        title="Edit Reward"
        onPress={() => navigation.navigate(screens.EditReward)}
      /> */}

        <AppButton
          title="Track Reward"
          onPress={() => navigation.navigate(screens.TrackReward)}
        />

        <AppButton
          title="Return"
          onPress={() => navigation.navigate(screens.ParentDashBoard)}
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ManageRewardsScreen;
