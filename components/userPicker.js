import React, { useState } from "react";
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Modal,
    Button,
    FlatList,
    Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Text from "./appText";
import defaultStyles from "../config/styles";
import PickerItem from "./appPickerItem";
import Screen from "./appScreen";
import colours from "../config/colours";
import AppButton from "./appButton";
import User from "../screens/login/User";

function UserPicker({
    icon,
    items,
    numberOfColumns,
    onSelectItem,
    PickerItemComponent = PickerItem,
    placeholder,
    selectedItem,
    //width = "100%",
    marginLeft = 12,
}) {
    // console.log("Placeholder", placeholder);
    // console.log("selectedItem", selectedItem);
    const [modalVisible, setModalVisible] = useState(false);

    // console.log("What is the items?", items.length);
    // console.log("selected item", selectedItem)
    return (
        <>
            <View style={styles.screen}>
                <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                    <View style={[styles.container]}>
                        {selectedItem ? (
                            selectedItem.icon ? (
                                <MaterialCommunityIcons
                                    name={selectedItem.icon}
                                    size={20}
                                    color={colours.inputIcon}
                                    style={styles.icon}
                                />
                            ) : (
                                <Image
                                    style={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: 15,
                                    }}
                                    source={{ uri: selectedItem.uri }}
                                />
                            )
                        ) : (
                            <MaterialCommunityIcons
                                name={"account"}
                                size={20}
                                color={colours.inputIcon}
                                style={styles.icon}
                            />
                        )}
                        {selectedItem ? (
                            <Text style={styles.text}>
                                {selectedItem.label}
                            </Text>
                        ) : (
                            <Text style={styles.placeholder}>
                                {placeholder}
                            </Text>
                        )}

                        <MaterialCommunityIcons
                            name="chevron-down"
                            size={20}
                            color={colours.inputIcon}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <Modal visible={modalVisible} animationType="slide">
                <Screen>
                    <AppButton
                        title="Close"
                        onPress={() => setModalVisible(false)}
                    />
                    <FlatList
                        contentContainerStyle={styles.pickerItem}
                        data={items}
                        keyExtractor={(item) => item.value.toString()}
                        numColumns={numberOfColumns}
                        renderItem={({ item }) => (
                            <User
                                iconName={item.icon}
                                username={item.label}
                                color={colours.buttonText}
                                uri={item.uri}
                                icon={item.icon}
                                onPress={() => {
                                    setModalVisible(false);
                                    onSelectItem(item);
                                }}
                            />
                        )}
                    />
                </Screen>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colours.white,
        borderRadius: 25,
        flexDirection: "row",
        padding: 15,
        marginVertical: 10,
        width: "90%",
        shadowOpacity: 1,
        borderWidth: 1,
    },
    icon: {
        marginRight: 10,
    },
    placeholder: {
        color: defaultStyles.colors.medium,
        flex: 1,
        textAlign: "center",
        fontWeight: "bold",
    },

    text: {
        flex: 1,
        color: colours.dropdownLabel,
        // color: "black",
        alignSelf: "center",
        textAlign: "center",
        fontWeight: "bold",
    },
    pickerItem: {
        width: "90%",
        alignSelf: "center",
        marginTop: 10,
    },
    user: {
        width: "100%",
        backgroundColor: "yellow",
        marginBottom: 20,
    },

    screen: {
        width: "100%",
        alignSelf: "center",
        // backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        opacity: 0.2,
    },
});

export default UserPicker;
