import React, { useContext } from "react";
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
import { UsersContext } from "../../../context/UsersContext.js";

const validationSchema = Yup.object().shape({
  label: Yup.string().required().min(1).label("label"),
  point: Yup.number().required().min(1).max(10000).label("point"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
});

function AddReward({ navigation }) {
  const usersContext = useContext(UsersContext);
  const { icons } = usersContext;

  let categories = [];
  icons.map((i) => {
    let tempObj = {};
    tempObj.backgroundColor = i.background_color;
    tempObj.icon = i.icon_name;
    tempObj.label = i.label;
    tempObj.value = i.icon_id;
    categories.push(tempObj);
  });
  console.log(categories);
  return (
    <Screen style={styles.container}>
      <AppHeading title="Add Reward Form" />
      <Form
        initialValues={{
          label: "",
          point: "",
          icon: "",
        }}
        onSubmit={(values) => {
          console.log(values);
          navigation.navigate("ViewReward");
        }}
        validationSchema={validationSchema}
      >
        <FormField
          icon="pen"
          maxLength={255}
          name="label"
          placeholder="Label"
        />
        <FormField
          keyboardType="numeric"
          maxLength={8}
          name="point"
          placeholder="Point"
          width={120}
          icon="lock"
        />
        <Picker
          items={categories}
          name="icon"
          numberOfColumns={3}
          PickerItemComponent={CategoryPickerItem}
          placeholder="Icon"
          width="90%"
          icon="lock"
        />

        <SubmitButton title="ADD REWARD" />
      </Form>
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
