import React, { useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import AppButton from "../../components/appButton";

import AuthContext from "../../components/auth/context";

function SwitchUser(props) {
  const { setUser } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <AppButton title="Logout" onPress={() => setUser(null)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default SwitchUser;
