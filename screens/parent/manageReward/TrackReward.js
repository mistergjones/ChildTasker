import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Modal,
  Button,
  TouchableHighlight,
  Alert,
} from "react-native";

import Screen from "../../../components/appScreen";
import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";
import AppLabel from "../../../components/appLabel";
import AppText from "../../../components/appText";
import ListItem from "../../../components/appListItem";
import screens from "../../../config/screens";
import AppMaterialIcon from "../../../components/appMaterialCommunityIcon";
import { LineChart, Path, Grid, XAxis, YAxis } from "react-native-svg-charts";

import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../../../components/forms";

import CategoryPickerItem from "../../../components/appCategoryPickerItem";
// avatars
const avatars = [
  {
    value: 1,
    label: "Takeaway",
    points: 10,
    image: require("../../../assets/avatar/1.png"),
  },
  {
    value: 2,
    label: "Games",
    points: 15,
    image: require("../../../assets/avatar/2.png"),
  },
  {
    value: 3,
    label: "Internet",
    points: 15,
    image: require("../../../assets/avatar/3.png"),
  },
  {
    value: 4,
    label: "Whatever",
    points: 10,
    image: require("../../../assets/avatar/4.png"),
  },
  {
    value: 5,
    label: "Whatever",
    points: 10,
    image: require("../../../assets/avatar/5.png"),
  },
  {
    value: 6,
    label: "Whatever",
    points: 10,
    image: require("../../../assets/avatar/6.png"),
  },
  {
    value: 7,
    label: "Whatever",
    points: 10,
    image: require("../../../assets/avatar/7.png"),
  },
  {
    value: 8,
    label: "Whatever",
    points: 10,
    image: require("../../../assets/avatar/8.png"),
  },
  {
    value: 9,
    label: "Whatever",
    points: 10,
    image: require("../../../assets/avatar/9.png"),
  },
  {
    value: 10,
    label: "Whatever",
    points: 10,
    image: require("../../../assets/avatar/10.png"),
  },
  {
    value: 11,
    label: "Whatever",
    points: 10,
    image: require("../../../assets/avatar/11.png"),
  },
  {
    value: 12,
    label: "Whatever",
    points: 10,
    image: require("../../../assets/avatar/12.png"),
  },
];

function TrackReward({ navigation }) {
  const data1 = [
    50,
    10,
    40,
    95,
    -4,
    -24,
    85,
    91,
    35,
    53,
    -53,
    24,
    50,
    -20,
    -80,
  ];
  const data2 = [
    -87,
    66,
    -69,
    92,
    -40,
    -61,
    16,
    62,
    20,
    -93,
    -54,
    47,
    -89,
    -44,
    18,
  ];

  const data = [
    {
      data: data1,
      svg: { stroke: "purple" },
    },
    {
      data: data2,
      svg: { stroke: "red" },
    },
  ];
  const axesSvg = { fontSize: 10, fill: "grey" };
  const verticalContentInset = { top: 10, bottom: 10 };
  const xAxisHeight = 30;
  const contentInset = { top: 20, bottom: 20 };
  return (
    <Screen>
      <AppHeading title="Track Reward" />
      {/* <AppLabel labelText="For Child...X" /> */}
      <View>
        <Form
          initialValues={{
            avatar: "",
          }}
          onSubmit={(values) => {
            console.log(values);
            navigation.navigate("ViewReward");
          }}
          // validationSchema={validationSchema}
        >
          <Picker
            items={avatars}
            name="avatar"
            numberOfColumns={3}
            PickerItemComponent={CategoryPickerItem}
            placeholder="Select Child"
            width="90%"
            textAlign="center"
          />
        </Form>
      </View>
      <View
        style={{
          height: 200,
          padding: 10,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <YAxis
          data={data2}
          style={{ marginBottom: xAxisHeight }}
          formatLabel={(value, index) => value}
          contentInset={verticalContentInset}
          svg={axesSvg}
        />
        <View style={{ flex: 1 }}>
          <LineChart
            style={{ flex: 1 }}
            data={data}
            contentInset={{ top: 20, bottom: 20 }}
            // xAccessor={({ item }) => item}
            svg={{ stroke: "rgb(134, 65, 244)" }}
            // contentInset={contentInset}
          >
            <Grid />
          </LineChart>
          <XAxis
            style={{
              height: xAxisHeight,
              width: "100%",
            }}
            data={data2}
            formatLabel={(value, index) => index}
            contentInset={{ left: 5, right: 5 }}
            svg={{
              fontSize: 10,
              fill: "black",
              flexWrap: "wrap",
            }}
          />
        </View>
      </View>
      {/* <View style={styles.tabLinks}>
        <View style={styles.tab}>
          <AppMaterialIcon iconName="dice-5" iconSize={42} iconColor="blue" />
          <AppText>Tab 1</AppText>
        </View>
        <View style={styles.tab}>
          <AppMaterialIcon iconName="table-large" iconSize={42} />
          <AppText>Tab 2</AppText>
        </View>
      </View> */}
      <View>
        <AppButton
          title="Return"
          onPress={() => navigation.navigate(screens.ManageRewards)}
        />
      </View>
      <View>
        <Form
          initialValues={{
            avatar: "",
          }}
          onSubmit={(values) => {
            console.log(values);
            navigation.navigate("ViewReward");
          }}
          // validationSchema={validationSchema}
        >
          {/* Avatar Selection to be used somewhere else */}
          {/* <Picker
            items={avatars}
            name="avatar"
            numberOfColumns={3}
            PickerItemComponent={CategoryPickerItem}
            placeholder="Avatar"
            width="50%"
          /> */}
          {/* <SubmitButton title="Submit" /> */}
        </Form>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  lineGraphContainer: {
    flexDirection: "row",
    height: 200,
    padding: 10,
    width: "100%",
  },
  tabLinks: {
    marginTop: 15,
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  tab: {
    margin: 10,
  },
});

export default TrackReward;
