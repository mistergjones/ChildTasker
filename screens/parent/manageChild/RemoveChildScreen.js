import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";
import AppLabel from "../../../components/appLabel";

import AppMaterialIcon from "../../../components/appMaterialCommunityIcon";

function RemoveChildScreen(props) {
    return (
        <View style={styles.container}>
            <AppHeading title="Remove Child" />
            <View style={styles.rowAlignment}>
                <AppMaterialIcon iconName="account-child" iconSize={24} />
                <AppLabel labelText="Select Child's Name:" />
            </View>

            <TextInput
                defaultValue={"DROP DOWN BOX GOES HERE"}
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

            <View style={styles.rowAlignment}>
                <AppMaterialIcon iconName="account-child" iconSize={24} />
                <AppLabel labelText="Are you sure?" />
            </View>

            <TextInput
                defaultValue={"DROP DOWN BOX GOES HERE"}
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

            <AppButton title="Yes" />

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
});

export default RemoveChildScreen;
