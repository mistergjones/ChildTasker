import React from "react";
import { View, StyleSheet } from "react-native";

import AppText from "./appText.js";

import AppMaterialCommunityIcon from "./appMaterialCommunityIcon.js";

function appChoresCategoryPicker({ item, onPress }) {
    // console.log(`chorePickerItem.js: `, item);
    return (
        <View style={styles.container}>
            <AppMaterialCommunityIcon
                backgroundColor={item.backgroundColor}
                iconName={item.icon}
                size={24}
            />
            <AppText>{item.label}</AppText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 15,
        alignItems: "center",
        width: "33%",
    },
    label: {
        marginTop: 5,
        textAlign: "center",
    },
});

export default appChoresCategoryPicker;
