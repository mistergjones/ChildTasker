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

// import {
//     SlideAreaChart,
//     SlideBarChart,
//     SlideBarChartProps,
//     SlideAreaChartProps,
//     YAxisProps,
//     XAxisProps,
//     XAxisLabelAlignment,
//     YAxisLabelAlignment,
//     CursorProps,
//     ToolTipProps,
//     ToolTipTextRenderersInput,
//     GradientProps,
// } from "react-native-slide-charts";
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
      <AppHeading title="Track Pocket Money Heading" />
      <AppLabel labelText="For Child...X" />
      <View style={styles.lineGraphContainer}>
        <YAxis
          data={data2}
          style={{ marginBottom: xAxisHeight }}
          formatLabel={(value, index) => value}
          contentInset={verticalContentInset}
          svg={axesSvg}
        />
        <View style={{ flex: 1 }}>
          <LineChart
            style={{ height: 200, width: "100%" }}
            // xAccessor={({ item }) => item}
            data={data}
            contentInset={{ top: 20, bottom: 20 }}
            svg={{ stroke: "rgb(134, 65, 244)" }}
            contentInset={contentInset}
          >
            <Grid />
          </LineChart>

          <XAxis
            style={{
              marginHorizontal: -10,
              marginVertical: -10,
              height: xAxisHeight,
              width: "100%",
            }}
            data={data2}
            formatLabel={(index, value) => index}
            contentInset={{ left: 10, right: 10 }}
            svg={axesSvg}
          />
        </View>
      </View>
      {/* <View style={styles.lineGraphContainer}>
        <SlideAreaChart
          chartLineColor="black"
          data={
            ([
              { x: 1, y: 0 },
              { x: 3, y: 8 },
              { x: 4, y: 2 },
              { x: 5, y: 12 },
              { x: 4, y: 4 },
            ],
            [
              { x: 1, y: 10 },
              { x: 3, y: 2 },
              { x: 4, y: 2 },
              { x: 5, y: 7 },
              { x: 4, y: 7 },
            ])
          }
        />
      </View> */}
      <View style={styles.tabLinks}>
        <View style={styles.tab}>
          <AppMaterialIcon iconName="dice-5" iconSize={42} iconColor="blue" />
          <AppText>Tab 1</AppText>
        </View>
        <View style={styles.tab}>
          <AppMaterialIcon iconName="table-large" iconSize={42} />
          <AppText>Tab 2</AppText>
        </View>
      </View>
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
  lineGraphContainer: {
    flexDirection: "row",
    height: 200,
    // flex: 1,
    padding: 10,
    // justifyContent: "center",
    // alignItems: "center",
    // borderWidth: 5,
    // borderColor: "#FF1744",
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
