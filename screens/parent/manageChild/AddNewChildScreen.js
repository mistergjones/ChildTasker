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
import AppLabel from "../../../components/appLabel";
import { UsersContext } from "../../../context/UsersContext";
import ParentDashBoardScreen from "../../ParentDashBoardScreen";
import Screen from "../../../components/appScreen";
import colours from "../../../config/colours";
import { set } from "react-native-reanimated";

const loginSchema = Yup.object().shape({
  childname: Yup.string().required().label("Child name"),
});
function AddNewChildScreen({ navigation }) {
  const { addNewUser, users, setUsers, checkIfNewUser } = useContext(
    UsersContext
  );

  const [newPin, setNewPin] = useState(null);
  const [childName, setChildName] = useState(null);

  return (
    <Screen>
      <AppHeading title="Add Child" />
      <Formik
        initialValues={{ childname: "" }}
        onSubmit={async (fields, { setFieldError }) => {
          // Check if username already exists
          console.log(1);
          const isNewUser = await checkIfNewUser(fields.childname);

          // add user to db
          console.log("new user", isNewUser);
          if (isNewUser) {
            try {
              await addNewUser({
                username: fields.childname,
                isParent: false,
                password: newPin,
              });

              navigation.navigate(screens.ParentChildDashBoard);
            } catch (error) {
              console.log("error = ", error);
            }
          } else {
            setFieldError("childname", "username already exists");
          }
        }}
        validationSchema={loginSchema}
      >
        {({ handleChange, handleSubmit, errors }) => (
          <>
            <AppTextInput
              placeholder="Child name"
              labelText="Child name"
              icon="account"
              onChangeText={handleChange("childname")}
              errorStyle={{ color: colours.inputErrorMessage }}
              error={errors ? errors.childname : ""}
            />
            {newPin && <AppLabel labelText={newPin} />}
            {
              <AppButton
                title="Generate New Pin"
                onPress={() => {
                  const pin = Math.floor(Math.random() * 8999) + 1000;
                  setNewPin(String(pin));
                }}
              />
            }
            {newPin && <AppButton title="SAVE" onPress={handleSubmit} />}

            <AppButton
              title="Return"
              onPress={() => navigation.navigate(screens.ParentChildDashBoard)}
            />
          </>
        )}
      </Formik>
    </Screen>
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
