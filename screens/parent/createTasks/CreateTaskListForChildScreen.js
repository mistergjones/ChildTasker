import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";

import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";

import AppLabel from "../../../components/appLabel";

import AppMaterialIcon from "../../../components/appMaterialCommunityIcon";

function CreateTaskListForChildScreen(props) {
    return (
        <View style={styles.container}>
            <AppHeading title="Create Task For Child" />

            <TextInput
                defaultValue={"Select Child (drop down box here)"}
                style={{
                    height: 40,
                    borderColor: "lightgrey",
                    borderWidth: 1,
                    width: "60%",
                    alignSelf: "center",
                    marginTop: 20,
                    marginBottom: 20,
                }}
            />

            <AppLabel
                labelText="PUT THE GRID ELEMENT HERE"
                style={{ paddingmarginBottom: 40 }}
            />

            <AppLabel labelText="Select Cateogory:" />

            <AppButton title="Finalise Changes" />

            <AppButton title="Return" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
});

export default CreateTaskListForChildScreen;
