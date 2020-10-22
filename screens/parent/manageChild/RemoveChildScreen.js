import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Picker,
  ScrollView,
  Alert,
} from "react-native";

import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";
import AppLabel from "../../../components/appLabel";

import AppMaterialIcon from "../../../components/appMaterialCommunityIcon";
import screens from "../../../config/screens";

import AppPicker from "../../../components/appPicker";
import { UsersContext } from "../../../context/UsersContext";

import Screen from "../../../components/appScreen"
import UserPicker from '../../../components/userPicker';

function RemoveChildScreen({ navigation }) {
  const { kids, removeKid } = useContext(UsersContext);
  const [selectedItem, setSelectedItem] = useState();

  console.log("kids", kids);

  const kidsData = kids.map((kid) => {
    return { label: kid.user_name, value: kid.user_id, icon: "human-child" };
  });

  console.log("kids data =" + kidsData);

  const removeKidAlert = () =>
    Alert.alert(
      "Remove Child",
      "Click Ok to remove child",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            console.log(selectedItem.value);
            await removeKid(selectedItem.value);
            setSelectedItem(null);
            navigation.navigate(screens.ParentChildDashBoard);
          },
        },
      ],
      { cancelable: false }
    );

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  return (
    <Screen>
      <ScrollView style={styles.container}>
        <AppHeading title="Remove Child" />

        <UserPicker
          items={kidsData}
          icon="account-child"
          placeholder="Select Child"
          selectedItem={selectedItem}
          onSelectItem={handleSelectItem}
        />


        {selectedItem && <AppButton title="Remove" onPress={removeKidAlert} />}

        <AppButton
          title="Return"
          onPress={() => navigation.navigate(screens.ParentChildDashBoard)}
        />
      </ScrollView>
    </Screen>
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

export default RemoveChildScreen;
