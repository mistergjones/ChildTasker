import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import * as Yup from "yup";

import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";
import Screen from "../../../components/appScreen";
import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../../../components/forms";
import CategoryPickerItem from "../../../components/appCategoryPickerItem";
import screens from "../../../config/screens";
import { UsersContext } from "../../../context/UsersContext.js";
import { Formik } from "formik";

const validationSchema = Yup.object().shape({
  label: Yup.string().required().min(1).label("label"),
  point: Yup.number().required().min(1).max(10000).label("point"),
  icon: Yup.string().required(),
});

function EditReward({ navigation }) {
  const usersContext = useContext(UsersContext);
  const { icons, selectedReward, updateReward, getRewardByID } = usersContext;

  console.log({ selectedReward });
  // console.log({ usersContext });

  let categories = [];
  icons.map((i) => {
    let tempObj = {};
    tempObj.backgroundColor = i.background_color;
    tempObj.icon = i.icon_name;
    tempObj.label = i.label;
    tempObj.value = i.icon_id;
    categories.push(tempObj);
  });

  // let reward = {
  //   background_color: "#2bcbba",
  //   icon_id: 5,
  //   icon_name: "shoe-heel",
  //   label: "Clothing",
  //   point: 10,
  // };reward_id,reward_name,reward_points,rewards.icon_id,icons.icon_name from rewards,icons WHERE rewards.icon_id=icons.icon_id and reward_id
  let reward = getRewardByID(selectedReward);
  console.log({ reward });
  let placeHolder = categories.filter(
    (category) => category.icon_id === selectedReward.icon_id
  ).icon_name;
  return (
    <Screen style={styles.container}>
      <AppHeading title="Edit Reward Form" />
      <Formik
        initialValues={{
          label: reward.reward_name,
          point: reward.reward_points,
          icon: reward.icon_id,
        }}
        onSubmit={async (fields, { setFieldError }) => {
          // console.log("reached here");
          // console.log(fields);
          try {
            await updateReward({
              reward_name: fields.label,
              reward_points: fields.point,
              icon_id: fields.icon.value,
              reward_id: selectedReward,
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
            <FormField
              maxLength={255}
              icon="pen"
              name="label"
              placeholder={reward.reward_name}
            />
            <FormField
              keyboardType="numeric"
              maxLength={8}
              name="point"
              placeholder={reward.reward_points}
              width={120}
              icon="lock"
            />
            <Picker
              items={categories}
              name="icon"
              numberOfColumns={3}
              PickerItemComponent={CategoryPickerItem}
              placeholder={placeHolder}
              width="90%"
              icon="lock"
            />
            <AppButton title="Edit Reward" onPress={handleSubmit} />
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

export default EditReward;
