import React, { useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import AppButton from "../../components/appButton";

import AuthContext from "../../components/auth/context";
import screens from "../../config/screens";

function SwitchUser({ navigation }) {
  const { setUser } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <AppButton
        title="Logout"
        onPress={() => {
          console.log(navigation);
          console.log(navigation.isFocused());
          navigation.jumpTo("Parent");
          console.log(navigation.isFocused());
          setUser(null);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default SwitchUser;
