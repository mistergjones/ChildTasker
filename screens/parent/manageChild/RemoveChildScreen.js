import React, { useState } from "react";
import { View, StyleSheet, TextInput, Picker } from "react-native";

import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";
import AppLabel from "../../../components/appLabel";

import AppMaterialIcon from "../../../components/appMaterialCommunityIcon";

// import { Picker } from "@react-native-community/picker";

function RemoveChildScreen(props) {
    const [selectedValue, setSelectedValue] = useState("c1");

    return (
        <View style={styles.container}>
            <AppHeading title="Remove Child" />
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
                <AppMaterialIcon iconName="account-child" iconSize={24} />
                <AppLabel labelText="Are you sure?" />
            </View>

            <Picker
                style={styles.picker}
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedValue(itemValue)
                }
            >
                <Picker.Item label="No" value="no" />
                <Picker.Item label="Yes" value="Yes" />
            </Picker>

            <AppButton title="Save Changes" />

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

export default RemoveChildScreen;
