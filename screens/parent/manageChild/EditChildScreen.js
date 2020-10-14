import React, { useState, useContext } from "react";
import { View, StyleSheet, TextInput, Picker, ScrollView } from "react-native";

import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";
import AppLabel from "../../../components/appLabel";

import AppMaterialIcon from "../../../components/appMaterialCommunityIcon";

import AppPicker from "../../../components/appPicker";

import screens from "../../../config/screens";
import { UsersContext } from "../../../context/UsersContext";

function EditChildScreen({ navigation }) {
    const { kids, updateKid } = useContext(UsersContext);
    const [selectedItem, setSelectedItem] = useState();
    const [newPin, setNewPin] = useState(null);

    // the below will change once we have data from teh server/text file
    console.log("kids", kids);

    const kidsData = kids.map((kid) => {
        return { label: kid.user_name, value: kid.user_id };
    });

    console.log("kids data =" + kidsData);

    const handleSelectItem = (item) => {
        setSelectedItem(item);
    };

    const handleUpdateKid = async () => {
        const kid = {
            userId: selectedItem.value,
            userName: selectedItem.label,
            password: newPin,
        };
        await updateKid(kid);
        navigation.navigate(screens.ParentChildDashBoard);
    };
    return (
        <ScrollView style={styles.container}>
            <AppHeading title="Change Pin" />

            <AppPicker
                items={kidsData}
                icon="account-child"
                placeholder="Select Child"
                onSelectItem={handleSelectItem}
                selectedItem={selectedItem}
            />

            <View style={styles.rowAlignment}>
                <AppMaterialIcon iconName="security" iconSize={20} />
                <AppLabel labelText="New Pin Number" />
            </View>

            {newPin && <AppLabel labelText={newPin} />}
            {selectedItem && (
                <AppButton
                    title="Generate New Pin"
                    onPress={() => {
                        const pin = Math.floor(Math.random() * 8999) + 1000;
                        setNewPin(String(pin));
                    }}
                />
            )}
            {newPin ? (
                <AppButton title="Save and Exit" onPress={handleUpdateKid} />
            ) : (
                <AppButton
                    title="Return"
                    onPress={() =>
                        navigation.navigate(screens.ParentChildDashBoard)
                    }
                />
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {},
    rowAlignment: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    picker: {
        marginBottom: 150,
        height: 50,
        width: 150,
        alignSelf: "center",
    },
});

export default EditChildScreen;
