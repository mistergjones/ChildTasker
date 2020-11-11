import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
    View,
    StyleSheet,
    Image,
    TouchableHighlightComponent,
    TouchableOpacity,
    ColorPropType,
} from "react-native";
import { Text } from "react-native";
import screens from "../config/screens";
import AppMaterialIcon from "../components/appMaterialCommunityIcon";
import colours from "../config/colours";

function TaskIcon({
    title,
    icon,
    points,
    style,
    color,
    task_id,
    chores,
    completed,
    chore_id
}) {
    const navigation = useNavigation();
    console.log("task icon chores length = " + chores.length);
    return (
        <TouchableOpacity
            onPress={() => {
                if (!completed) {
                    navigation.navigate(screens.ChoreStatus, {
                        title,
                        icon,
                        points,
                        task_id,
                        chores,
                        chore_id
                    });
                }
            }}
        >
            <View style={styles.container}>
                <Text style={styles.text}>{title}</Text>
                <View style={{ backgroundColor: colours.white, borderRadius: 30 }}>
                    <AppMaterialIcon
                        iconName={icon}
                        iconSize={60}
                        iconColor={color}
                    />
                </View>
                <Text style={styles.text}>{points}</Text>
            </View>
        </TouchableOpacity >
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",

        height: "100%",
        width: 150,
        padding: 10,
        // borderWidth: 1,
        // borderColor: "black"
    },
    text: {
        marginTop: 20,
        height: 40,
        color: colours.white,
        fontSize: 14,
        fontWeight: "bold",
    },
});

export default TaskIcon;
