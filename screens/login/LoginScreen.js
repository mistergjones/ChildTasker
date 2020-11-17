import React, { useContext, useState } from "react";
import { View, StyleSheet, SafeAreaView, Button, Text } from "react-native";
import AppTextInput from "../../components/AppTextInput";
import { Formik } from "formik";
import * as Yup from "yup";
import AppButton from "../../components/appButton";
import screens from "../../config/screens";
import AuthContext from "../../components/auth/context";
import { database } from "../../components/database";
import AppHeading from "../../components/appHeading";
import { UsersContext } from "../../context/UsersContext";
import Screen from "../../components/appScreen";
import colours from "../../config/colours";

const loginSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  password: Yup.string().required().length(4).label("Pin"),
});

function LoginScreen({ navigation, route }) {
  const {
    user,
    setUser,
    switchUser,
    setSwitchUser,
    switchUserName,
    setSwitchUserName,
  } = useContext(AuthContext);
  const { addNewUser, users, setUsers, getUsers } = useContext(UsersContext);

  const handleRegister = () => {
    // console.log("To do register");
  };

  return (
    <Screen>
      <AppHeading title="Login" />
      <Formik
        initialValues={{
          username: switchUserName ? switchUserName : "",
          password: "",
        }}
        onSubmit={async (fields, { setFieldError }) => {
          //// console.log("users = " + users);
          for (let i = 0; i < users.length; i++) {
            // console.log(users[i]);
            if (
              users[i].user_name === fields.username &&
              users[i].password === fields.password
            ) {
              const currentUser = {
                username: fields.username,
                isParent:
                  users[i].is_parent === 1 ? true : false,
                uri: users[i].uri,
                userId: users[i].user_id,
                icon: users[i].icon,
              };

              setUser(currentUser);
              setSwitchUser(false);
              setSwitchUserName(null);
              return;
            }
          }

          setFieldError("username", "username/password incorrect");
          setFieldError("password", "username/password incorrect");

          // await addNewUser(fields.username);
          //database.insertUser(fields.username, () => // console.log("Hi"));
          //await database.getUsers(setUsers);

          //await database.getItems(setUser);

          //TODO: Database validate user
          //// console.log("User" + fields.username);
          //Assumption User is valid
          //This is done to simulate changing from a child to a parent and vice versa
        }}
        validationSchema={loginSchema}
      >
        {({ handleChange, handleSubmit, errors }) => (
          <>
            <AppTextInput
              placeholder="Enter User Name"
              labelText="User Name"
              icon="account"
              onChangeText={handleChange("username")}
              errorStyle={{ color: colours.inputErrorMessage }}
              error={errors ? errors.username : ""}
              defaultValue={switchUserName ? switchUserName : ""}
            />
            <AppTextInput
              placeholder="Enter Pin"
              labelText="Pin"
              icon="lock"
              secureTextEntry
              onChangeText={handleChange("password")}
              errorStyle={{ color: colours.inputErrorMessage }}
              error={errors ? errors.password : ""}
              maxLength={4}
              keyboardType="number-pad"
            />
            <AppButton title="login" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default LoginScreen;
