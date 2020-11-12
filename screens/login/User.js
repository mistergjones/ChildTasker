import React, { useContext } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import screens from "../../config/screens";
import AuthContext from "../../components/auth/context";
import colours from "../../config/colours";
//import { color } from 'react-native-reanimated';

function User({ username, color, iconName, onPress, icon, uri }) {
    const navigation = useNavigation();
    const { user, setSwitchUserName, setSwitchUser } = useContext(AuthContext);
    // console.log("icon = " + icon);
    // console.log("uri = " + uri);
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            {icon ? (
                <View style={styles.view}>
                    <View style={styles.iconview}>
                        <MaterialCommunityIcons
                            style={styles.icon}
                            name={icon}
                            size={40}
                            color={color}
                        />
                    </View>
                    <Text style={styles.text}>{username}</Text>
                </View>
            ) : (
                <View style={styles.view}>
                    <View style={styles.iconview}>
                        <Image
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                            }}
                            source={{ uri: uri }}
                        />
                    </View>
                    <Text style={styles.text}>{username}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        // alignItems: "center",
        // justifyContent: "center",
        alignSelf: "center",
        marginBottom: 15,
        borderColor: colours.buttonBorder,
        borderWidth: 1,
        width: "100%",
        borderRadius: 20,
        shadowOpacity: 1,
        backgroundColor: colours.buttonBackground,
    },
    text: {
        alignItems: "center",
        justifyContent: "center",
        width: "50%",
        padding: 20,
        color: colours.buttonText,
        fontWeight: "bold",
        fontSize: 18,
    },
    view: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
        // justifyContent: "center",
        // backgroundColor: "yellow",
        width: "100%",
        borderRadius: 20,
    },
});

export default User;
