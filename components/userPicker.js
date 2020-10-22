import React, { useState } from "react";
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Modal,
    Button,
    FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Text from "./appText";
import defaultStyles from "../config/styles";
import PickerItem from "./appPickerItem";
import Screen from "./appScreen";
import colours from "../config/colours";
import AppButton from "./appButton";
import User from '../screens/login/User';

function UserPicker({
    icon,
    items,
    numberOfColumns,
    onSelectItem,
    PickerItemComponent = PickerItem,
    placeholder,
    selectedItem,
    width = "100%",
    marginLeft = 12,
}) {
    console.log("Placeholder", placeholder);
    console.log("selectedItem", selectedItem);
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <Screen>
            <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                <View style={[styles.container, { width }, { marginLeft }]}>
                    {icon && (
                        <MaterialCommunityIcons
                            name={icon}
                            size={20}
                            color={defaultStyles.colors.medium}
                            style={styles.icon}
                        />
                    )}
                    {selectedItem ? (
                        <Text style={styles.text}>{selectedItem.label}</Text>
                    ) : (
                            <Text style={styles.placeholder}>{placeholder}</Text>
                        )}

                    <MaterialCommunityIcons
                        name="chevron-down"
                        size={20}
                        color={defaultStyles.colors.medium}
                    />
                </View>
            </TouchableWithoutFeedback>
            <Modal visible={modalVisible} animationType="slide">
                <Screen>
                    <AppButton
                        title="Close"
                        onPress={() => setModalVisible(false)}
                        style={{ color: colours.defaultButtonColour }}
                    />
                    <FlatList
                        contentContainerStyle={styles.pickerItem}
                        data={items}
                        keyExtractor={(item) => item.value.toString()}
                        numColumns={numberOfColumns}
                        renderItem={({ item }) => (

                            <User iconName={item.icon} username={item.label} color={"gold"} onPress={() => {
                                setModalVisible(false);
                                onSelectItem(item);
                            }} />
                        )}
                    />
                </Screen>
            </Modal>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultStyles.colors.light,
        borderRadius: 25,
        flexDirection: "row",
        padding: 15,
        marginVertical: 10,
        width: "90%"
    },
    icon: {
        marginRight: 10,
    },
    placeholder: {
        color: defaultStyles.colors.medium,
        flex: 1,
    },
    text: {
        flex: 1,
    },
    pickerItem: {

        width: "100%",


    },
    user: {
        width: "100%",
        backgroundColor: "yellow",
        marginBottom: 20
    }
});

export default UserPicker;