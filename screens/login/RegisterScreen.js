import React, { useContext, useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    SafeAreaView,
    Button,
    Text,
    Alert,
    Modal,
    ImageBackground,
    Image,
    ScrollView,
} from "react-native";
import AppTextInput from "../../components/AppTextInput";
import { Formik } from "formik";
import * as Yup from "yup";
import AppButton from "../../components/appButton";
import screens from "../../config/screens";
import AuthContext from "../../components/auth/context";
import { database } from "../../components/database";
import AppHeading from "../../components/appHeading";
import { UsersContext } from "../../context/UsersContext";
import { NavigationContainer } from "@react-navigation/native";
import Screen from "../../components/appScreen";
import colours from "../../config/colours";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const loginSchema = Yup.object().shape({
    username: Yup.string().required().label("Username"),
    password: Yup.string().required().length(4).label("Pin"),
    confirmPassword: Yup.string().required().length(4).label("Confirm Pin"),
});
function RegisterScreen({ navigation }) {
    const {
        user,
        setUser,
        setCount,
        count,
        firstLoad,
        setFirstLoad,
    } = useContext(AuthContext);
    const { addNewUser, users, setUsers, checkIfNewUser } = useContext(
        UsersContext
    );
    const [alertLoaded, setAlertLoaded] = useState(firstLoad);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (firstLoad) {
            setModalVisible(true);
        } else {
            setModalVisible(false);
        }
    }, []);

    return (
        <Screen>
            <ScrollView>
                <AppHeading title="Register Parent" />

                <Formik
                    initialValues={{
                        username: "",
                        password: "",
                        confirmPassword: "",
                    }}
                    onSubmit={async (fields, { setFieldError }) => {
                        // Check if passwords match
                        // console.log("pass", fields.password);
                        // console.log("cpass", fields.confirmPassword);
                        if (fields.password !== fields.confirmPassword) {
                            setFieldError("password", "pins do not match");
                            setFieldError(
                                "confirmPassword",
                                "pins do not match"
                            );

                            return;
                        }

                        // Check if username already exists
                        const isNewUser = await checkIfNewUser(fields.username);

                        // add user to db

                        if (isNewUser) {
                            try {
                                await addNewUser({
                                    username: fields.username,
                                    isParent: true,
                                    password: fields.password,
                                });
                                // set user context
                                //setUser({ username: fields.username, isParent: true });

                                if (firstLoad) {
                                    // console.log("register firstload");
                                    setFirstLoad(false);
                                    setUser(null);
                                    navigation.navigate(screens.Login);
                                } else {
                                    navigation.navigate(
                                        screens.ParentDashBoard
                                    );
                                }
                            } catch (error) {
                                // console.log("error = ", error);
                            }
                        } else {
                            setFieldError(
                                "username",
                                "username already exists"
                            );
                        }
                    }}
                    validationSchema={loginSchema}
                >
                    {({ handleChange, handleSubmit, errors }) => (
                        <>
                            <AppTextInput
                                placeholder="Enter User Name"
                                labelText="User Name"
                                icon="account"
                                onChangeText={handleChange("username")}
                                errorStyle={{
                                    color: colours.inputErrorMessage,
                                }}
                                error={errors ? errors.username : ""}
                            />
                            <AppTextInput
                                placeholder="Enter Pin"
                                labelText="Pin"
                                icon="lock"
                                secureTextEntry
                                onChangeText={handleChange("password")}
                                errorStyle={{
                                    color: colours.inputErrorMessage,
                                }}
                                error={errors ? errors.password : ""}
                                maxLength={4}
                                keyboardType="number-pad"
                            />
                            <AppTextInput
                                placeholder="Enter Confirm Pin"
                                labelText="Confirm Pin"
                                icon="lock"
                                secureTextEntry
                                onChangeText={handleChange("confirmPassword")}
                                errorStyle={{
                                    color: colours.inputErrorMessage,
                                }}
                                error={errors ? errors.confirmPassword : ""}
                                maxLength={4}
                                keyboardType="number-pad"
                            />

                            <AppButton
                                title="Register"
                                onPress={handleSubmit}
                            />

                            {!firstLoad && (
                                <AppButton
                                    title="Return"
                                    onPress={() =>
                                        navigation.navigate(
                                            screens.ParentDashBoard
                                        )
                                    }
                                />
                            )}
                        </>
                    )}
                </Formik>
                <Modal visible={modalVisible} animationType="slide">
                    <Screen style={styles.modal}>
                        <AppHeading title="Child Tasker" />

                        <ImageBackground
                            source={require("../../assets/avatar/9.png")}
                            style={styles.image}
                        >
                            <View style={styles.container}>
                                <Text style={styles.textHeading}>
                                    Welcome to Child Tasker.
                                </Text>
                                <Text style={styles.textParagraph}>
                                    This app is designed to make the job of
                                    managing and tracking the tasks required in
                                    the household in an easy as well as fun
                                    manner.
                                </Text>
                                {/* <MaterialCommunityIcons name="bike" size={100} color={colours.defaultButtonColour} /> */}
                                <AppButton
                                    title="Continue"
                                    onPress={() => setModalVisible(false)}
                                    style={{
                                        color: colours.defaultButtonColour,
                                    }}
                                />
                            </View>
                        </ImageBackground>
                    </Screen>
                </Modal>
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        alignSelf: "center",
    },
    textHeading: {
        fontSize: 24,
        color: colours.white,
        fontWeight: "bold",
    },
    textParagraph: {
        fontSize: 18,
        color: colours.white,
        marginTop: 20,
        marginBottom: 20,
        fontWeight: "bold",
        textAlign: "justify",
    },
    modal: {
        backgroundColor: colours.defaultHeadingColour,
    },
    view: {
        backgroundColor: colours.defaultHeadingColour,
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
});

export default RegisterScreen;
