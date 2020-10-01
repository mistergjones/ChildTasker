import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";
import AppLabel from "../../../components/appLabel";

import AppMaterialIcon from "../../../components/appMaterialCommunityIcon";
import screens from "../../../config/screens";

function AddNewChildScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <AppHeading title="Add Child" />
      <View style={styles.rowAlignment}>
        <AppMaterialIcon iconName="account-child" iconSize={24} />
        <AppLabel labelText="Child's Name:" />
      </View>

      <TextInput
        defaultValue={"Please enter child's name"}
        style={{
          height: 40,
          borderColor: "lightgrey",
          borderWidth: 1,
          width: "60%",
          alignSelf: "center",
          marginTop: 20,
          marginBottom: 20,
        }}
      />

      <View style={styles.rowAlignment}>
        <AppMaterialIcon iconName="security" iconSize={20} />
        <AppLabel labelText="Child's Pin Number" />
      </View>

      <TextInput
        defaultValue={"Please enter child's Pin number"}
        style={{
          height: 40,
          borderColor: "lightgrey",
          borderWidth: 1,
          width: "60%",
          alignSelf: "center",
          marginTop: 20,
          marginBottom: 20,
        }}
      />
      <TextInput
        defaultValue={"Please Re-enter child's Pin number"}
        style={{
          height: 40,
          borderColor: "lightgrey",
          borderWidth: 1,
          width: "60%",
          alignSelf: "center",
          marginTop: 20,
          marginBottom: 20,
        }}
      />

      <AppButton title="Submit" />

      <AppButton
        title="Return"
        onPress={() => navigation.navigate(screens.ParentDashBoard)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  rowAlignment: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddNewChildScreen;
