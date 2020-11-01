import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";

import Icon from "./Icon";
import Text from "./appText";

function appCategoryPickerItem({ item, onPress, numColumns }) {
    //console.log(`The item is: `, item);
    var widthStyle = null;

    // the below determines the width percentage to be used depending on teh number of columns that will need to be displayed.
    if (numColumns % 2 === 0) {
        //console.log("2 columns");
        widthStyle = "50%";
    } else if (numColumns % 3 === 0) {
        //console.log("3 columns");
        widthStyle = "33%";
    }

    // the first condition is to render an empty space to retain perfect 2 column alignment.
    if (
        item.icon ===
        "usedToEnsureThatColumnsAreNeatlyAllignedIfThereisAnOddNumber"
    ) {
        return (
            <View style={[styles.container, { width: widthStyle }]}>
                {/* <TouchableOpacity onPress={onPress}>
                    <Icon
                        backgroundColor={item.backgroundColor}
                        name={item.icon}
                        size={80}
                    />
                </TouchableOpacity>
                <Text style={styles.label}>{item.label}</Text> */}
            </View>
        );
    } else if (
        item.icon !=
        "usedToEnsureThatColumnsAreNeatlyAllignedIfThereisAnOddNumber"
    ) {
        return (
            <View style={[styles.container, { width: widthStyle }]}>
                <TouchableOpacity onPress={onPress}>
                    <Icon
                        backgroundColor={item.backgroundColor}
                        name={item.icon}
                        size={80}
                    />
                </TouchableOpacity>
                <Text style={styles.label}>{item.label}</Text>
            </View>
        );
    } else if ("image" in item) {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={onPress}>
                    <Image source={item.image} style={styles.image} />
                </TouchableOpacity>
                <Text style={styles.label}>{item.label}</Text>
            </View>
        );
    } else {
        return null;
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 15,
        alignItems: "center",
        // width: "33%",
    },
    label: {
        marginTop: 5,
        textAlign: "center",
    },
    image: {
        width: 60,
        height: 60,
    },
});

export default appCategoryPickerItem;
