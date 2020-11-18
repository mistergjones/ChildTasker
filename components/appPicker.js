import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Modal,
    Button,
    FlatList,
    SafeAreaView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Text from "./appText";
import defaultStyles from "../config/styles";
import PickerItem from "./appPickerItem";
import Screen from "./appScreen";
import colours from "../config/colours";
import AppButton from "./appButton";
import AppTextInput from "./AppTextInput";

import { renderOddColumnsNicely } from "../helpers/createBlankItem";

function AppPicker({
    icon,
    items,
    numberOfColumns,
    onSelectItem,
    PickerItemComponent = PickerItem,
    placeholder,
    selectedItem,
    width = "100%",
    marginLeft = 0,
    onPickerPress,
    showModal = false,
}) {
    // add a blank item obtech to the modal screen to ensure nice 2 column alignment.
    if (items.length % 2 !== 0) {
        items = renderOddColumnsNicely(items);
    }

    // // console.log("Placeholder", placeholder);
    // // console.log("selectedItem", selectedItem);
    const [modalVisible, setModalVisible] = useState(showModal);
    const [itemsList, setItemsList] = useState(items);
    // // console.log("selected item keys = ", Object.keys(selectedItem))
    return (
        <SafeAreaView>
            <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                <View style={[styles.container, { width }, { marginLeft }]}>
                    {icon && (
                        <MaterialCommunityIcons
                            name={selectedItem ? selectedItem.icon : icon}
                            size={20}
                            color={
                                selectedItem
                                    ? selectedItem.backgroundColor
                                    : colours.inputIcon
                            }
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
                        color={colours.inputIcon}
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
                    <AppTextInput
                        labelText={"Search"}
                        placeholder={"Enter search criteria"}
                        icon={"magnify"}
                        onChangeText={(text) => {
                            //console.log("The text is: ", text);
                            let filteredItems = [];
                            filteredItems = items.filter((item) => {
                                if (
                                    String(item.label)
                                        .toLowerCase()
                                        .includes(text.toLowerCase())
                                )
                                    return item;
                                return "";
                            });
                            console.log("Filtered items is:", filteredItems);

                            if (filteredItems.length % 2 !== 0) {
                                setItemsList(
                                    renderOddColumnsNicely(filteredItems)
                                );
                            } else {
                                setItemsList(filteredItems);
                            }
                        }}
                    />
                    <FlatList
                        contentContainerStyle={styles.pickerItem}
                        data={itemsList}
                        keyExtractor={(item) => item.value.toString()}
                        numColumns={numberOfColumns}
                        renderItem={({ item }) => (
                            <PickerItemComponent
                                item={item}
                                label={item.label}
                                numColumns={numberOfColumns}
                                onPress={() => {
                                    setModalVisible(false);
                                    onSelectItem(item);
                                    onPickerPress ? onPickerPress() : "";
                                }}
                            />
                        )}
                    />
                </Screen>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultStyles.colors.light,
        borderRadius: 25,
        flexDirection: "row",
        padding: 15,
        marginVertical: 10,
        alignSelf: "center",
    },
    icon: {
        marginRight: 10,
    },
    placeholder: {
        color: defaultStyles.colors.medium,
        flex: 1,
        fontWeight: "bold",
        textAlign: "center",
    },
    text: {
        flex: 1,
        textAlign: "center",
    },
    pickerItem: {
        // flexDirection: "row",
        // width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    search: {
        // backgroundColor: "grey",
        width: "90%",
    },
});

export default AppPicker;
