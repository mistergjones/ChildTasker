import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
    View,
    StyleSheet,
    Image,
    TouchableHighlightComponent,
    TouchableOpacity,
} from "react-native";
import { Text } from "react-native";
import screens from "../config/screens";
import AppMaterialIcon from "../components/appMaterialCommunityIcon";
import colours from "../config/colours";

function RewardIcon({
    title,
    icon,
    points,
    style,
    color,
    task_id,
    chores,
    rewardName,
    completed,
    reward_id,
}) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate(screens.ChildTaskForRewards, {
                    rewardName,
                    chores,
                    completed,
                    reward_id,
                })
            }
        >
            <View style={styles.container}>
                <Text style={styles.text}>{title}</Text>
                <AppMaterialIcon
                    iconName={icon}
                    iconSize={60}
                    iconColor={color}
                />
                <Text style={styles.text}>{points}</Text>
            </View>
        </TouchableOpacity>
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
    },
});

export default RewardIcon;
