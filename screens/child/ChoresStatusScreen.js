import React from "react";
import { StyleSheet, Text, View } from "react-native";
// import * as Yup from "yup";

import ChoresCard from "../../components/appChoresCard";
import Screen from "../../components/appScreen";
import { Form, FormField, SubmitButton } from "../../components/forms";
import Heading from "../../components/appHeading";

function ChoresStatusScreen() {
  return (
    <Screen style={styles.container}>
      <Heading title="Chore Heading" />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <ChoresCard
            height={200}
            title={"Task Name"}
            image={require("../../assets/splash.png")}
            subTitle={"Points: 11"}
          />
        </View>
        <View style={styles.bodyForm}>
          <Form
            initialValues={{ completed: false }}
            onSubmit={(values) => console.log(values)}
          >
            <SubmitButton title="Yes /No Dropdown" color="themeColor" />
            <SubmitButton title="Submit" color="defaultButtonColour" />
            <SubmitButton title="Return" color="defaultButtonColour" />
          </Form>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  body: {
    flex: 10,
    justifyContent: "space-around",
    alignItems: "center",
    overflow: "hidden",
  },
  bodyContent: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    overflow: "hidden",
    width: "100%",
    position: "absolute",
    top: 0,
    padding: 20,
    marginBottom: 25,
  },
  bodyForm: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    overflow: "hidden",
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  footer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChoresStatusScreen;
