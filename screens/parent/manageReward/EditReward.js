import React from "react";
import { View, StyleSheet } from "react-native";
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

const validationSchema = Yup.object().shape({
  label: Yup.string().required().min(1).label("label"),
  point: Yup.number().required().min(1).max(10000).label("point"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
});

const categories = [
  {
    backgroundColor: "#fc5c65",
    icon: "floor-lamp",
    label: "Furniture",
    value: 1,
  },
  {
    backgroundColor: "#fd9644",
    icon: "car",
    label: "Cars",
    value: 2,
  },
  {
    backgroundColor: "#fed330",
    icon: "camera",
    label: "Cameras",
    value: 3,
  },
  {
    backgroundColor: "#26de81",
    icon: "cards",
    label: "Games",
    value: 4,
  },
  {
    backgroundColor: "#2bcbba",
    icon: "shoe-heel",
    label: "Clothing",
    value: 5,
  },
  {
    backgroundColor: "#45aaf2",
    icon: "basketball",
    label: "Sports",
    value: 6,
  },
  {
    backgroundColor: "#4b7bec",
    icon: "headphones",
    label: "Movies & Music",
    value: 7,
  },
  {
    backgroundColor: "#a55eea",
    icon: "book-open-variant",
    label: "Books",
    value: 8,
  },
  {
    backgroundColor: "#778ca3",
    icon: "application",
    label: "Other",
    value: 9,
  },
];

let reward = {
  label: "Takeaway",
  point: 10,
  icon: "floorlamp",
};
function EditReward({ navigation }) {
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
        <FormField maxLength={255} name="label" placeholder={reward.label} />
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
          placeholder={reward.icon.toString()}
          width="50%"
          icon={reward.icon.toString()}
        />

        <SubmitButton title="Submit" />
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
