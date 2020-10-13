import React, { useState, useContext } from "react";
import { View, StyleSheet, TextInput, Picker, ScrollView } from "react-native";

import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";
import AppLabel from "../../../components/appLabel";

import AppMaterialIcon from "../../../components/appMaterialCommunityIcon";

import AppPicker from "../../../components/appPicker";

import screens from "../../../config/screens";
import { UsersContext } from "../../../context/UsersContext";

function EditChildScreen({ navigation }) {
  const { kids } = useContext(UsersContext);
  const [selectedItem, setSelectedItem] = useState();
  // the below will change once we have data from teh server/text file
  console.log("kids", kids);

  const kidsData = kids.map((kid) => {
    return { label: kid.user_name, value: kid.user_id };
  });

  console.log("kids data =" + kidsData);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };
  return (
    <ScrollView style={styles.container}>
      <AppHeading title="Change Pin" />
      <View style={styles.rowAlignment}>
        <AppLabel labelText="Select Child's Name:" />
      </View>

      <AppPicker
        items={kidsData}
        icon="account-child"
        placeholder="Select Child"
        onSelectItem={handleSelectItem}
        selectedItem={selectedItem}
      />

      <View style={styles.rowAlignment}>
        <AppMaterialIcon iconName="security" iconSize={20} />
        <AppLabel labelText="New Pin Number" />
      </View>

      <TextInput
        defaultValue={"Please enter Pin number"}
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
        defaultValue={"Please Re-enter Pin number"}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  rowAlignment: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  picker: {
    marginBottom: 150,
    height: 50,
    width: 150,
    alignSelf: "center",
  },
});

export default EditChildScreen;
