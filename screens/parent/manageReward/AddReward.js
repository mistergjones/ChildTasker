import React, { useContext, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import * as Yup from "yup";

import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";
import AppLabel from "../../../components/appLabel";
import Screen from "../../../components/appScreen";
import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../../../components/forms";
import CategoryPickerItem from "../../../components/appCategoryPickerItem";
import AppMaterialIcon from "../../../components/appMaterialCommunityIcon";
import screens from "../../../config/screens";
import { UsersContext } from "../../../context/UsersContext.js";
import { Formik } from "formik";
import AppPicker from "../../../components/appPicker";
import AppTextInput from "../../../components/AppTextInput";

const validationSchema = Yup.object().shape({
  label: Yup.string().required().min(1).label("Reward Name"),
  point: Yup.number()
    .required()
    .label("Reward Points")
    .typeError("Reward Points must be a number"),
  // icon: Yup.string().required(),
});

function AddReward({ navigation }) {
  const usersContext = useContext(UsersContext);
  const { icons } = usersContext;
  const { addNewReward } = useContext(UsersContext);
  const [label, setLabel] = useState();
  const [point, setPoint] = useState();
  const [selectedIcon, setSelectedIcon] = useState();

  let categories = [];
  icons.map((i) => {
    let tempObj = {};
    tempObj.backgroundColor = i.background_color;
    tempObj.icon = i.icon_name;
    tempObj.label = i.label;
    tempObj.value = i.icon_id;
    categories.push(tempObj);
  });

  const handleNewLabel = async (item) => {
    console.log("item line 48", item);
    await setLabel(item);
  };
  const handleNewPoint = async (item) => {
    await setPoint(item);
  };
  const handleSelectIcon = async (item) => {
    await setSelectedIcon(item);
  };

  return (
    <Screen style={styles.container}>
      <AppHeading title="Add Reward Form" />
      <Formik
        initialValues={{
          label: "",
          point: "",
          icon: selectedIcon,
        }}
        onSubmit={async (fields, { setFieldError }) => {
          console.log("reached here");
          console.log(
            "fields" +
              fields.label +
              fields.point +
              selectedIcon.icon +
              selectedIcon.label +
              selectedIcon.value
          );
          try {
            await addNewReward({
              reward_name: fields.label,
              reward_points: Number(fields.point),
              icon_id: Number(selectedIcon.value),
              icon_name: selectedIcon.icon,
            });
            navigation.navigate("ViewReward");
          } catch (error) {
            console.log("error = ", error);
          }
        }}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, errors }) => (
          <>
            <AppTextInput
              placeholder="Type Reward Name"
              labelText="Reward Name"
              icon="trophy"
              onChangeText={handleChange("label")}
              error={errors ? errors.label : ""}
            />
            <AppTextInput
              placeholder="Type Reward Points"
              labelText="Reward Points"
              keyboardType="number-pad"
              icon="numeric-1-circle-outline"
              onChangeText={handleChange("point")}
              error={errors ? errors.point : ""}
            />
            <AppPicker
              items={categories}
              name="icon"
              icon="star-circle"
              placeholder="Select Reward Icon"
              numberOfColumns="2"
              PickerItemComponent={CategoryPickerItem}
              onSelectItem={handleSelectIcon}
              selectedItem={selectedIcon}
              width="90%"
            />
            {selectedIcon && (
              <AppButton
                isDisabled={selectedIcon ? false : true}
                title="SAVE"
                onPress={handleSubmit}
              />
            )}
          </>
        )}
      </Formik>
      <View>
        <AppButton
          title="Return"
          onPress={() => navigation.navigate(screens.ManageRewards)}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AddReward;
