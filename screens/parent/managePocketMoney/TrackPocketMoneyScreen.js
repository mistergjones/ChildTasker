import React from "react";
import { View, StyleSheet } from "react-native";

import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";

function TrackPocketMoneyScreen(props) {
    return (
        <View style={styles.container}>
            <AppHeading title="Track Pocket Money Dashboard" />

            <AppButton title="Placeholder" />
            <AppButton title="Placeholder" />

            <AppButton title="Return" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
});

export default TrackPocketMoneyScreen;
