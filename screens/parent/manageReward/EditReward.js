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

const validationSchema = Yup.object().shape({
  label: Yup.string().required().min(1).label("label"),
  point: Yup.number().required().min(1).max(10000).label("point"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
});

function EditReward({ navigation }) {
  const usersContext = useContext(UsersContext);
  const { icons } = usersContext;

  console.log({ icons });
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

  let reward = {
    background_color: "#2bcbba",
    icon_id: 5,
    icon_name: "shoe-heel",
    label: "Clothing",
    point: 10,
  };
  let placeHolder = reward.label;
  return (
    <Screen style={styles.container}>
      <AppHeading title="Edit Reward Form" />
      <Form
        initialValues={{
          label: reward.label,
          point: reward.point,
          icon: reward.icon,
        }}
        onSubmit={(values) => {
          // console.log(values);
          navigation.navigate("ViewReward");
        }}
        validationSchema={validationSchema}
      >
        <FormField
          maxLength={255}
          icon="pen"
          name="label"
          placeholder={reward.label}
        />
        <FormField
          keyboardType="numeric"
          maxLength={8}
          name="point"
          placeholder={reward.point.toString()}
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
        <SubmitButton title="Edit Reward" />
        <View>
          <AppButton
            title="Return"
            onPress={() => navigation.navigate(screens.ManageRewards)}
          />
        </View>
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default EditReward;
