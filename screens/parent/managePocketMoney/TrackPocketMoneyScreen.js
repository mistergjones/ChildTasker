import React from "react";
import { View, StyleSheet } from "react-native";

import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";
import screens from "../../../config/screens";

function TrackPocketMoneyScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <AppHeading title="Track Pocket Money Dashboard" />

      <AppButton title="Placeholder" />
      <AppButton title="Placeholder" />

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

export default TrackPocketMoneyScreen;
