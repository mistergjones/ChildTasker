import React, { useContext, useState, useEffect } from "react";
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
import AppTextInput from "../../../components/AppTextInput";
import AppPicker from "../../../components/appPicker";

const validationSchema = Yup.object().shape({
  label: Yup.string().required().min(1).label("label"),
  point: Yup.number().required().min(1).max(10000).label("point"),
  icon: Yup.string().required(),
});

function EditReward({ navigation }) {
  const usersContext = useContext(UsersContext);
  const {
    icons,
    selectedReward,
    updateReward,
    selectedRewardDetails,
  } = usersContext;
  const [rewardName, setRewardName] = useState(
    selectedRewardDetails ? selectedRewardDetails[0].reward_name : ""
  );
  const [point, setPoint] = useState(
    selectedRewardDetails ? selectedRewardDetails[0].reward_points : ""
  );
  const [selectedIcon, setSelectedIcon] = useState({
    label: selectedRewardDetails ? selectedRewardDetails[0].label : "",
    value: selectedRewardDetails ? selectedRewardDetails[0].icon_id : "",
    icon: selectedRewardDetails ? selectedRewardDetails[0].icon : "",
  });

  let placeHolder;
  let iconData = [];
  icons.map((i) => {
    let tempObj = {};
    tempObj.backgroundColor = i.background_color;
    tempObj.icon = i.icon_name;
    tempObj.label = i.label;
    tempObj.value = i.icon_id;
    iconData.push(tempObj);
  });

  const handleSelectedIcon = (item) => {
    setSelectedIcon(item);
  };

  return (
    <Screen style={styles.container}>
      <AppHeading title="Edit Reward Form" />
      <Formik
        initialValues={{
          label: rewardName,
          point: point,
          icon: selectedIcon,
        }}
        onSubmit={async (fields, { setFieldError }) => {
          try {
            // console.log(
            //   "hit edit reward button",
            //   fields.label,
            //   fields.point,
            //   selectedIcon.icon,
            //   selectedIcon.value,
            //   selectedReward
            // );
            await updateReward({
              reward_name: fields.label,
              reward_points: fields.point,
              icon_id: selectedIcon.value,
              reward_id: selectedReward,
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
              labelText="Reward Name"
              icon="trophy"
              onChangeText={handleChange("label")}
              errorStyle={{ color: "white" }}
              error={errors ? errors.label : ""}
              defaultValue={rewardName}
            />

            <AppTextInput
              labelText="Reward Points"
              icon="numeric-1-circle-outline"
              onChangeText={handleChange("point")}
              errorStyle={{ color: "white" }}
              error={errors ? errors.point : ""}
              defaultValue={point.toString()}
            />

            <AppPicker
              items={iconData}
              name="icon"
              numberOfColumns={2}
              PickerItemComponent={CategoryPickerItem}
              placeholder={selectedIcon.label}
              width="90%"
              icon={selectedIcon.icon}
              onSelectItem={handleSelectedIcon}
              selectedItem={selectedIcon}
              defaultValue={selectedIcon}
            />
            <AppButton title="EDIT REWARD" onPress={handleSubmit} />
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
