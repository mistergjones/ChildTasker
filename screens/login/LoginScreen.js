import React from "react";
import { View, StyleSheet, SafeAreaView, Button, Text } from "react-native";
import AppTextInput from "../../components/AppTextInput";
import { Formik } from "formik";
import * as Yup from "yup";
import AppButton from "../../components/appButton";
import screens from "../../config/screens";

const loginSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen({ navigation, route }) {
  return (
    <SafeAreaView>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={() => {
          if (route.name === screens.LoginParent) {
            navigation.navigate(screens.ParentDashBoard);
          } else if (route.name === screens.LoginChild) {
            navigation.navigate(screens.ChildDashBoard);
          }
        }}
        validationSchema={loginSchema}
      >
        {({ handleChange, handleSubmit, errors }) => (
          <>
            <AppTextInput
              placeholder="Username"
              labelText="Username"
              icon="account"
              onChangeText={handleChange("username")}
              errorStyle={{ color: "red" }}
              error={errors ? errors.username : ""}
            />
            <AppTextInput
              placeholder="Password"
              labelText="Password"
              icon="lock"
              secureTextEntry
              onChangeText={handleChange("password")}
              errorStyle={{ color: "red" }}
              error={errors ? errors.password : ""}
            />
            <AppButton title="login" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default LoginScreen;
