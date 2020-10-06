import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import AppButton from "../../components/appButton";
import AppHeading from "../../components/appHeading";
import screens from "../../config/screens";
function EditProfileScreen({ navigation }) {
  return (
    <SafeAreaView>
      <AppHeading title="Edit Profile" />
      <AppButton
        title="Return"
        onPress={() => navigation.navigate(screens.ChildDashBoard)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default EditProfileScreen;
