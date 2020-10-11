import React, { useContext } from "react";
import { View, StyleSheet, SafeAreaView, Button, Text } from "react-native";
import AppTextInput from "../../components/AppTextInput";
import { Formik } from "formik";
import * as Yup from "yup";
import AppButton from "../../components/appButton";
import screens from "../../config/screens";
import AuthContext from "../../components/auth/context";

const loginSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen({ navigation, route }) {
  const { setUser, setCount, count } = useContext(AuthContext);
  const handleRegister = () => {
    console.log("To do register");
  };
  return (
    <SafeAreaView>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(fields) => {
          //TODO: Database validate user
          console.log(fields);
          //Assumption User is valid
          //This is done to simulate changing from a child to a parent and vice versa
          setCount(count + 1);
          const currentUser = {
            username: fields.username,
            isParent: count % 2 === 0 ? true : false,
          };
          setUser(currentUser);
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
            <AppButton title="Register" onPress={handleRegister} />
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
