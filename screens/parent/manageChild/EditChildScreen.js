import React, { useState, useContext } from "react";
import { View, StyleSheet, TextInput, Picker, ScrollView } from "react-native";

import AppButton from "../../../components/appButton";
import AppHeading from "../../../components/appHeading.js";
import AppLabel from "../../../components/appLabel";

import AppMaterialIcon from "../../../components/appMaterialCommunityIcon";

import AppPicker from "../../../components/appPicker";

import screens from "../../../config/screens";
import { UsersContext } from "../../../context/UsersContext";

import Screen from "../../../components/appScreen"
import AppTextInput from "../../../components/AppTextInput";

import { Formik } from "formik";
import * as Yup from "yup";
import UserPicker from '../../../components/userPicker';



const updateChildSchema = Yup.object().shape({
    childname: Yup.string().required().label("Child name"),

});

function EditChildScreen({ navigation }) {
    const { kids, updateKid } = useContext(UsersContext);
    const [selectedItem, setSelectedItem] = useState();
    const [childName, setChildName] = useState()
    const [newPin, setNewPin] = useState(null);

    // the below will change once we have data from teh server/text file
    console.log("kids", kids);

    const kidsData = kids.map((kid) => {
        return { label: kid.user_name, value: kid.user_id, pin: kid.password, icon: "human-child" };
    });

    console.log("kids data =" + kidsData);

    const handleSelectItem = (item) => {
        setSelectedItem(item);
    };

    const handleUpdateKid = async () => {
        const kid = {
            userId: selectedItem.value,
            userName: childName ? childName : selectedItem.label,
            password: newPin ? newPin : selectedItem.pin,
        };
        await updateKid(kid);
        navigation.navigate(screens.ParentChildDashBoard);
    };
    return (
        <Screen>
            <ScrollView style={styles.container}>
                <AppHeading title="Edit Child" />
                <UserPicker items={kidsData}
                    icon="account-child"
                    placeholder="Select Child"
                    onSelectItem={handleSelectItem}
                    selectedItem={selectedItem}
                    numberOfColumns={1}

                />

                {selectedItem && (
                    <>
                        <Formik
                            initialValues={{ childname: selectedItem.label }}
                            onSubmit={async (fields, { setFieldError }) => {
                                const kid = {
                                    userId: selectedItem.value,
                                    userName: fields.childname,
                                    password: newPin ? newPin : selectedItem.pin,
                                };
                                await updateKid(kid);
                                navigation.navigate(screens.ParentChildDashBoard);
                            }}
                            validationSchema={updateChildSchema}
                        >
                            {({ handleChange, handleSubmit, errors }) => (
                                <>



                                    <AppTextInput labelText="Child name"
                                        icon="account" onChangeText={handleChange("childname")}
                                        errorStyle={{ color: "red" }}
                                        error={errors ? errors.childname : ""}
                                        defaultValue={selectedItem.label}
                                    />

                                    {newPin && <AppLabel labelText={newPin} icon={"account"} />}
                                    {selectedItem && (
                                        <AppButton
                                            title="Generate New Pin"
                                            onPress={() => {
                                                const pin = Math.floor(Math.random() * 8999) + 1000;
                                                setNewPin(String(pin));
                                            }}
                                        />
                                    )}
                                    {selectedItem && <AppButton title="Save and Exit" onPress={handleSubmit} />}



                                </>

                            )}

                        </Formik>

                    </>
                )}
                <AppButton
                    title="Return"
                    onPress={() =>
                        navigation.navigate(screens.ParentChildDashBoard)
                    }
                />
            </ScrollView>
        </Screen>
    );

}

const styles = StyleSheet.create({
    container: {

    },
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
