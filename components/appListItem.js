import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Modal,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Icon from "./Icon";
import defaultStyles from "../config/styles";
import AppText from "./appText";
export default function appListItem({
    title,
    subTitle,
    image,
    icon,
    color = defaultStyles.colors.medium,
}) {
    return (
        <View style={styles.mainContainer}>
            <View>
                <Icon
                    name={icon}
                    size={60}
                    color={color}
                    style={styles.image}
                />
            </View>
            <AppText style={styles.text}>{title}</AppText>
            <AppText style={styles.text}>{subTitle}</AppText>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "column",
        // margin: 5,
        padding: 5,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 70,
        height: 70,
        marginHorizontal: 10,
    },
    text: {
        textAlign: "center",
        fontSize: 16,

        width: "100%",
    },
    icon: {
        width: "50%",
        height: "50%",
        alignItems: "center",
        justifyContent: "center",
    },
});
