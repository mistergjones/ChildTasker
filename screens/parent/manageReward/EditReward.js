import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import * as Yup from "yup";
// import Picker from "../../../components/appPicker";
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
    // getRewardByID,
    selectedRewardDetails,
  } = usersContext;
  const [rewardName, setRewardName] = useState(
    selectedRewardDetails ? selectedRewardDetails[0].reward_name : ""
  );
  const [point, setPoint] = useState(
    selectedRewardDetails ? selectedRewardDetails[0].reward_points : ""
  );
  const [selectedIcon, setSelectedIcon] = useState({
    label: selectedRewardDetails ? selectedRewardDetails[0].icon_name : "",
    value: selectedRewardDetails ? selectedRewardDetails[0].icon_id : "",
  });
  console.log({ selectedReward });
  console.log({ selectedRewardDetails });

  let placeHolder;
  let iconData = [];
  icons.map((i) => {
    let tempObj = {};
    tempObj.backgroundColor = i.background_color;
    tempObj.icon = i.icon_name;
    tempObj.label = i.label;
    tempObj.value = i.icon_id;
    iconData.push(tempObj);
    // selectedRewardDetails
    //   ? i.icon_id === selectedRewardDetails[0].icon_id
    //     ? (placeHolder = i.label)
    //     : (placeHolder = "")
    //   : "";
  });

  // console.log(icons.filter((icon) => icon.icon_id == iconID));
  // console.log({ selectedRewardDetails });
  const handleSelectedIcon = (item) => {
    console.log("ITEM", item);
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
          // console.log("reached here");
          // console.log(fields);
          try {
            console.log(
              "hit edit reward button",
              fields.label,
              fields.point,
              // fields.icon
              selectedIcon.value,
              selectedReward
            );
            await updateReward({
              reward_name: fields.label,
              reward_points: fields.point,
              icon_id: selectedIcon.value,
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
            {/* <FormField
              maxLength={255}
              icon="pen"
              name="label"
              placeholder={
                selectedRewardDetails
                  ? selectedRewardDetails[0].reward_name
                  : ""
              }
            /> */}
            <AppTextInput
              labelText="Reward Name"
              icon="pen"
              onChangeText={handleChange("label")}
              errorStyle={{ color: "white" }}
              error={errors ? errors.label : ""}
              defaultValue={rewardName}
            />
            {/* <FormField
              keyboardType="numeric"
              maxLength={8}
              name="point"
              placeholder={
                selectedRewardDetails
                  ? selectedRewardDetails[0].reward_points.toString()
                  : ""
              }
              width={120}
              icon="lock"
            /> */}
            <AppTextInput
              labelText="Reward Points"
              icon="lock"
              onChangeText={handleChange("point")}
              errorStyle={{ color: "white" }}
              error={errors ? errors.point : ""}
              defaultValue={point.toString()}
            />

            <AppPicker
              items={iconData}
              name="icon"
              numberOfColumns={3}
              PickerItemComponent={CategoryPickerItem}
              placeholder={
                // icons.filter((icon) => icon.icon_id == iconID).icon_name
                selectedRewardDetails ? selectedRewardDetails[0].icon_name : ""
              }
              // placeholder={placeHolder}
              width="90%"
              icon={selectedIcon.label}
              onSelectItem={handleSelectedIcon}
              selectedItem={selectedIcon}
              defaultValue={selectedIcon}
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
