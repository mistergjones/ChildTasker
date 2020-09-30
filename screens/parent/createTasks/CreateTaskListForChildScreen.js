import React, { useState } from "react";
import { View, StyleSheet, TextInput, Picker } from "react-native";

import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";

import AppLabel from "../../../components/appLabel";

import AppMaterialIcon from "../../../components/appMaterialCommunityIcon";
// import { Picker } from "@react-native-community/picker";

function CreateTaskListForChildScreen(props) {
    const [selectedValue, setSelectedValue] = useState("c1");
    return (
        <View style={styles.container}>
            <AppHeading title="Create Task For Child" />

            <AppLabel labelText="Select Child:" />

            <Picker
                style={styles.picker}
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedValue(itemValue)
                }
            >
                <Picker.Item label="Child 1" value="c1" />
                <Picker.Item label="Child 2" value="c2" />
                <Picker.Item label="Child 3" value="c3" />
            </Picker>

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
    picker: {
        marginBottom: 150,
        height: 50,
        width: 150,
        alignSelf: "center",
    },
});

export default CreateTaskListForChildScreen;
