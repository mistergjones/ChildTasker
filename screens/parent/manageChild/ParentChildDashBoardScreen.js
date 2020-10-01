import React from "react";
import { View, StyleSheet } from "react-native";

import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";
import screens from "../../../config/screens";

function ParentChildDashBoardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <AppHeading title="Manage Child Dashboard" />

      <AppButton
        title="Add New Child"
        onPress={() => navigation.navigate(screens.AddChild)}
      />

      <AppButton
        title="Edit Child Details"
        onPress={() => navigation.navigate(screens.EditChild)}
      />

      <AppButton
        title="Remove Child"
        onPress={() => navigation.navigate(screens.RemoveChild)}
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

export default ParentChildDashBoardScreen;
