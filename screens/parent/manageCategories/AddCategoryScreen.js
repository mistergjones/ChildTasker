import React from "react";
import { View, StyleSheet } from "react-native";

import screens from "../../../config/screens";
import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";

function AddCategoryScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <AppHeading title="Add a Category" />

      <AppButton title="Add New Category" />

      <AppButton title="Edit Category" />

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

export default AddCategoryScreen;
