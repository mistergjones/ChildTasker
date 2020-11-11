import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Text, ForeignObject, Svg, Rect, Circle, G } from "react-native-svg";
import { PieChart } from "react-native-svg-charts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "./appText";
import Color from "../config/colours";

function PieChartWithLabels({
  data,
  completedColor = Color.pieChartCompletedColor,
  incompleteColor = Color.pieChartInCompletedColor,
  iconColor = Color.inputPlaceholder,
}) {
  const Labels = ({ slices, height, width }) => {
    return slices.map((slice, index) => {
      const { labelCentroid, pieCentroid, data } = slice;
      return (
        <G key={index} style={{ flex: 1, justifyContent: "center" }}>
          <ForeignObject
            style={{ backgroundColor: "red" }}
            x={pieCentroid[0] - 10}
            y={pieCentroid[1] - 10}
            width={500}
            height={500}
          >
            <MaterialCommunityIcons
              name={data.icon}
              size={30}
              color={iconColor}
            />
          </ForeignObject>

          {/* <Text
            x={pieCentroid[0]}
            y={pieCentroid[1]}
            fill={"white"}
            textAnchor={"middle"}
            alignmentBaseline={"top"}
            fontSize={18}
            fontWeight="bold"
            stroke={"white"}
            strokeWidth={0.2}
          >
            {index + 1}
          </Text> */}
        </G>
      );
    });
  };
  return (
    <ScrollView style={{ marginTop: 15 }}>
      <View
        style={{
          backgroundColor: "#ffffff",
          marginHorizontal: "6%",
          borderRadius: 8,
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignSelf: "stretch",
          height: 30,
        }}
      >
        <AppText style={{ color: "black", fontWeight: "bold" }}>
          Legend:
        </AppText>
        <AppText
          style={{
            color: completedColor,
            fontWeight: "bold",
            marginLeft: 15,
          }}
        >
          Completed
        </AppText>
        <Svg height="24" width="24">
          <Circle cx="12" cy="12" r="8" fill={completedColor} />
        </Svg>
        <AppText
          style={{
            color: incompleteColor,
            fontWeight: "bold",
            marginLeft: 15,
          }}
        >
          Incomplete
        </AppText>
        <Svg height="24" width="24">
          <Circle cx="12" cy="12" r="8" fill={incompleteColor} />
        </Svg>
      </View>
      <PieChart
        style={{ height: "60%", width: "100%", alignSelf: "center" }}
        valueAccessor={({ item }) => item.amount}
        data={data}
        spacing={0}
        outerRadius={"90%"}
      >
        <Labels />
      </PieChart>
      <View
        style={{
          justifyContent: "center",
          alignSelf: "center",
          marginTop: 30,
        }}
      >
        {data.map((datum, index) => {
          return (
            <View key={index} style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons
                name={datum.icon}
                size={30}
                color={iconColor}
              />
              <AppText
                key={index}
                style={{
                  color: "white",
                  fontWeight: "bold",
                  // marginLeft: 25,
                }}
              >{` = ${datum.taskName}`}</AppText>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
export default PieChartWithLabels;
