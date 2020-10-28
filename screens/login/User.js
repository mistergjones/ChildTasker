import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import screens from '../../config/screens';
import AuthContext from '../../components/auth/context';
import colours from '../../config/colours';
//import { color } from 'react-native-reanimated';




function User({ username, color, iconName, onPress }) {
    const navigation = useNavigation()
    const { user, setSwitchUserName, setSwitchUser } = useContext(AuthContext)
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.view}>
                <MaterialCommunityIcons style={styles.icon} name={iconName} size={40} color={color} />
                <Text style={styles.text}>{username}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

    container: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginBottom: 15,
        borderColor: colours.buttonBorder,
        borderWidth: 1,
        width: "100%",
        borderRadius: 20,
        shadowOpacity: 1

    },
    text: {
        alignItems: "center",
        justifyContent: "center",
        // width: 125,
        padding: 20,
        color: colours.buttonText
    },
    view: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colours.buttonBackground,
        width: "100%",
        borderRadius: 20


    }

})

export default User;