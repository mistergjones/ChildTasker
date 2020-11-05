import React, { useState } from "react";
import { View } from "react-native";
import { Text, ForeignObject, Svg, Rect, Circle } from "react-native-svg";
import { PieChart } from "react-native-svg-charts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "./appText";

function PieChartWithLabels({
  data,
  completedColor = "#A42CD6",
  incompleteColor = "#859C27",
  iconColor = "white",
}) {
  const Labels = ({ slices, height, width }) => {
    return slices.map((slice, index) => {
      const { labelCentroid, pieCentroid, data } = slice;
      return (
        <View key={data.id + 400} style={{ flex: 1, justifyContent: "center" }}>
          <ForeignObject
            style={{ backgroundColor: "red" }}
            x={pieCentroid[0]}
            y={pieCentroid[1] + 25}
            width={500}
            height={500}
            key={data.id + 100}
          >
            <MaterialCommunityIcons
              name={data.icon}
              size={30}
              color={iconColor}
              key={data.id + 200}
            />
          </ForeignObject>

          <Text
            key={index}
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
            {(data.amount, data.taskName)}
          </Text>
        </View>
      );
    });
  };
  return (
    <>
      <PieChart
        style={{ height: "50%", width: "100%", alignSelf: "center" }}
        valueAccessor={({ item }) => item.amount}
        data={data}
        spacing={0}
        outerRadius={"90%"}
      >
        <Labels />
      </PieChart>
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
    </>
  );
}
export default PieChartWithLabels;
