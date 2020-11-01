import React from "react";
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView, View, ImageBackground, ScrollView } from "react-native";
import colours from "../config/colours";

function appScreen({ children, style }) {
  return (

    <SafeAreaView style={[styles.screen, style]}>
      <ImageBackground source={require("../assets/avatar/9.png")} style={styles.image} >

        <View style={[styles.view, style]}>{children}</View>

      </ImageBackground>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: colours.defaultButtonColour
  },
  view: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  }
});

export default appScreen;
