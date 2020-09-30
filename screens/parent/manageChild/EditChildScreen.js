import React, { useState } from "react";
import { View, StyleSheet, TextInput, Picker } from "react-native";

import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";
import AppLabel from "../../../components/appLabel";

import AppMaterialIcon from "../../../components/appMaterialCommunityIcon";
// import { Picker } from "@react-native-community/picker";

function EditChildScreen(props) {
    const [selectedValue, setSelectedValue] = useState("c1");
    return (
        <View style={styles.container}>
            <AppHeading title="Select Child" />
            <View style={styles.rowAlignment}>
                <AppMaterialIcon iconName="account-child" iconSize={24} />
                <AppLabel labelText="Select Child's Name:" />
            </View>

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

            <View style={styles.rowAlignment}>
                <AppMaterialIcon iconName="security" iconSize={20} />
                <AppLabel labelText="New Pin Number" />
            </View>

            <TextInput
                defaultValue={"Pleas enter Pin number"}
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
            <TextInput
                defaultValue={"Please Re-enter Pin number"}
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

            <AppButton title="Submit" />

            <AppButton title="Return" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    rowAlignment: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    picker: {
        marginBottom: 150,
        height: 50,
        width: 150,
        alignSelf: "center",
    },
});

export default EditChildScreen;
