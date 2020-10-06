import React from "react";
import { StyleSheet, Text, View } from "react-native";
// import * as Yup from "yup";

import ChoresCard from "../../components/appChoresCard";
import Screen from "../../components/appScreen";
import { Form, FormField, SubmitButton } from "../../components/forms";
import Heading from "../../components/appHeading";
import AppButton from "../../components/appButton";
import screens from "../../config/screens";

function ChoreStatusScreen({ navigation, route }) {
  return (
    <Screen style={styles.container}>
      <Heading title="Chore Heading" />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <ChoresCard
            title={route.params.title}
            icon={route.params.icon}
            subTitle={`Points: ${route.params.points}`}
          />
        </View>
        <View style={styles.bodyForm}>
          <Form
            initialValues={{ completed: false }}
            onSubmit={(values) => console.log(values)}
          >
            <SubmitButton title="Submit" color="defaultButtonColour" />
            <AppButton
              title="Return"
              onPress={() => navigation.navigate(screens.ChildDashBoard)}
            />
          </Form>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 10,
    // marginVertical: 30,
  },
  body: {
    flex: 1,
    padding: 10,
  },
  bodyContent: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "50%",
  },
  bodyForm: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "50%",
  },
  footer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChoreStatusScreen;
