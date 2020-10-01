import React from "react";
import { View, StyleSheet } from "react-native";
import screens from "../../../config/screens";
import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";

function AddTaskToCategoryScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <AppHeading title="Add Task To Category" />

      <AppButton title="Add New Tasks" />

      <AppButton title="Edit Tasks" />

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

export default AddTaskToCategoryScreen;
