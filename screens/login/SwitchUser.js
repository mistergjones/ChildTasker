import React, { useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import AppButton from "../../components/appButton";

import AuthContext from "../../components/auth/context";
import screens from "../../config/screens";

function SwitchUser({ navigation, route }) {
  const { user, setUser, setSwitchUser } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <AppButton
        title="Logout"
        onPress={() => {
          user.isParent
            ? navigation.jumpTo("Parent")
            : navigation.jumpTo("Child");
          setSwitchUser(true);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default SwitchUser;
