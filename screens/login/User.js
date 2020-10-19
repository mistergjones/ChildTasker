import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import screens from '../../config/screens';
import AuthContext from '../../components/auth/context';




function User({ username, iconName }) {
    const navigation = useNavigation()
    const { user, setSwitchUserName, setSwitchUser } = useContext(AuthContext)
    return (
        <TouchableOpacity style={styles.container} onPress={() => {
            user.isParent
                ? navigation.jumpTo("Parent")
                : navigation.jumpTo("Child");
            setSwitchUser(true);
            setSwitchUserName(username)
        }}>
            <View style={styles.view}>
                <MaterialCommunityIcons style={styles.icon} name="account" size={40} color={"grey"} />
                <Text style={styles.text}>{username}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {

        alignItems: "center",

    },
    icon: {
        marginRight: 20
    },
    text: {
        alignItems: "center",
        justifyContent: "center"
    },
    view: {
        width: "90%",
        flexDirection: "row",
        alignItems: "center"
    }

})

export default User;