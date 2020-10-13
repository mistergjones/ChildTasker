// import React from "react";
// import { View, StyleSheet, TextInput } from "react-native";

// import AppButton from "../../../components/appButton";
// import AppHeading from "../../../components/appHeading.js";
// import AppLabel from "../../../components/appLabel";

// import AppMaterialIcon from "../../../components/appMaterialCommunityIcon";
// import screens from "../../../config/screens";

import React, { useContext, useState } from "react";
import { View, StyleSheet, SafeAreaView, Button, Text } from "react-native";
import AppTextInput from "../../../components/AppTextInput";
import { Formik } from "formik";
import * as Yup from "yup";
import AppButton from "../../../components/appButton";
import screens from "../../../config/screens";
import AppHeading from "../../../components/appHeading.js";
import AuthContext from "../../../components/auth/context";
import { database } from "../../../components/database";

import { UsersContext } from "../../../context/UsersContext";
import ParentDashBoardScreen from "../../ParentDashBoardScreen";

const loginSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
});
function AddNewChildScreen({ navigation }) {
  const { addNewUser, users, setUsers, checkIfNewUser } = useContext(
    UsersContext
  );
  return (
    <SafeAreaView>
      <AppHeading title="Add Child" />
      <Formik
        initialValues={{ username: "" }}
        onSubmit={async (fields, { setFieldError }) => {
          // Check if username already exists
          console.log(1);
          const isNewUser = await checkIfNewUser(fields.username);

          // add user to db
          console.log("new user", isNewUser);
          if (isNewUser) {
            try {
              await addNewUser({ username: fields.username, isParent: false });
              // set user context
              //setUser({ username: fields.username, isParent: true });

              navigation.navigate(screens.ParentDashBoard);
            } catch (error) {
              console.log("error = ", error);
            }
          } else {
            setFieldError("username", "username already exists");
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

            <AppButton title="Add" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
}
// return (
//   <View style={styles.container}>
//     <AppHeading title="Add Child" />
//     <View style={styles.rowAlignment}>
//       <AppMaterialIcon iconName="account-child" iconSize={24} />
//       <AppLabel labelText="Child's Name:" />
//     </View>

//     <TextInput
//       defaultValue={"Please enter child's name"}
//       style={{
//         height: 40,
//         borderColor: "lightgrey",
//         borderWidth: 1,
//         width: "60%",
//         alignSelf: "center",
//         marginTop: 20,
//         marginBottom: 20,
//       }}
//     />

//     <View style={styles.rowAlignment}>
//       <AppMaterialIcon iconName="security" iconSize={20} />
//       <AppLabel labelText="Child's Pin Number" />
//     </View>

//     <TextInput
//       defaultValue={"Please enter child's Pin number"}
//       style={{
//         height: 40,
//         borderColor: "lightgrey",
//         borderWidth: 1,
//         width: "60%",
//         alignSelf: "center",
//         marginTop: 20,
//         marginBottom: 20,
//       }}
//     />
//     <TextInput
//       defaultValue={"Please Re-enter child's Pin number"}
//       style={{
//         height: 40,
//         borderColor: "lightgrey",
//         borderWidth: 1,
//         width: "60%",
//         alignSelf: "center",
//         marginTop: 20,
//         marginBottom: 20,
//       }}
//     />

//     <AppButton title="Submit" />

//     <AppButton
//       title="Return"
//       onPress={() => navigation.navigate(screens.ParentDashBoard)}
//     />
//   </View>
//   );
// }

const styles = StyleSheet.create({
  container: {},
  rowAlignment: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddNewChildScreen;
