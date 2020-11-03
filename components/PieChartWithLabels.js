import React, { useState } from "react";
import { View } from "react-native";
import { Text, ForeignObject } from "react-native-svg";
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
        <View style={{ flex: 1, justifyContent: "center" }}>
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
            {index === 0 ? (
              <>
                <AppText style={{ color: completedColor, fontWeight: "bold" }}>
                  Completed
                </AppText>
                <AppText
                  style={{
                    color: incompleteColor,
                    fontWeight: "bold",
                    marginRight: 5,
                  }}
                >
                  Incomplete
                </AppText>
              </>
            ) : (
              ""
            )}
          </Text>
        </View>
      );
    });
  };
  return (
    <PieChart
      style={{ height: "50%", width: "100%", alignSelf: "center" }}
      valueAccessor={({ item }) => item.amount}
      data={data}
      spacing={0}
      outerRadius={"90%"}
    >
      <Labels />
    </PieChart>
  );
}
export default PieChartWithLabels;
