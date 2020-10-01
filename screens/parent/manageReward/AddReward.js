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

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  point: Yup.number().required().min(1).max(10000).label("point"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
});

const categories = [
  {
    id: 1,
    title: "Takeaway",
    points: 10,
    image: require("../../../assets/favicon.png"),
  },
  {
    id: 2,
    title: "Games",
    points: 15,
    image: require("../../../assets/favicon.png"),
  },
  {
    id: 3,
    title: "Internet",
    points: 15,
    image: require("../../../assets/favicon.png"),
  },
  {
    id: 4,
    title: "Whatever",
    points: 10,
    image: require("../../../assets/favicon.png"),
  },
  {
    id: 5,
    title: "Whatever",
    points: 10,
    image: require("../../../assets/favicon.png"),
  },
  {
    id: 6,
    title: "Whatever",
    points: 10,
    image: require("../../../assets/favicon.png"),
  },
  {
    id: 7,
    title: "Whatever",
    points: 10,
    image: require("../../../assets/favicon.png"),
  },
  {
    id: 8,
    title: "Whatever",
    points: 10,
    image: require("../../../assets/favicon.png"),
  },
  {
    id: 9,
    title: "Whatever",
    points: 10,
    image: require("../../../assets/favicon.png"),
  },
];
//this is add reward file
function AddReward(props) {
  return (
    <Screen style={styles.container}>
      <AppLabel labelText="Add Reward Form" />
      <Form
        initialValues={{
          title: "",
          point: "",
          description: "",
          category: null,
        }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <FormField maxLength={255} name="title" placeholder="Title" />
        <FormField
          keyboardType="numeric"
          maxLength={8}
          name="point"
          placeholder="Point"
          width={120}
        />
        <Picker
          items={categories}
          name="category"
          numberOfColumns={3}
          PickerItemComponent={CategoryPickerItem}
          placeholder="Category"
          width="50%"
        />

        <SubmitButton title="Submit" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AddReward;
