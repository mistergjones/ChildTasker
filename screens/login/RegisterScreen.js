import React, { useContext, useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    SafeAreaView,
    Button,
    Text,
    Alert,
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

const loginSchema = Yup.object().shape({
    username: Yup.string().required().label("Username"),
    password: Yup.string().required().min(4).label("Password"),
    confirmPassword: Yup.string().required().min(4).label("Confirm Password"),
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

    useEffect(() => {
        {
            if (firstLoad) {
                Alert.alert(
                    "Welcome to Childtasker. Please ensure you remember the password you create.",
                    "Click OK to continue ",
                    [
                        {
                            text: "OK",
                            onPress: async () => {
                                setAlertLoaded(false);
                            },
                        },
                    ],
                    { cancelable: false }
                );
            }
        }
    }, []);

    return (
        <Screen>
            <AppHeading title="Register Parent" />

            <Formik
                initialValues={{
                    username: "",
                    password: "",
                    confirmPassword: "",
                }}
                onSubmit={async (fields, { setFieldError }) => {
                    // Check if passwords match
                    console.log("pass", fields.password);
                    console.log("cpass", fields.confirmPassword);
                    if (fields.password !== fields.confirmPassword) {
                        setFieldError("password", "passwords do not match");
                        setFieldError(
                            "confirmPassword",
                            "passwords do not match"
                        );
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
                                console.log("register firstload");
                                setFirstLoad(false);
                                setUser(null);
                                navigation.navigate(screens.Login);
                            } else {
                                navigation.navigate(screens.ParentDashBoard);
                            }
                        } catch (error) {
                            console.log("error = ", error);
                        }
                    } else {
                        setFieldError("username", "username already exists");
                    }
                }}
                validationSchema={loginSchema}
            >
                {({ handleChange, handleSubmit, errors }) => (
                    <>
                        <AppTextInput
                            placeholder="Parent Name"
                            labelText="Parent Name"
                            icon="account"
                            onChangeText={handleChange("username")}
                            errorStyle={{ color: "red" }}
                            error={errors ? errors.username : ""}
                        />
                        <AppTextInput
                            placeholder="Password"
                            labelText="Password"
                            icon="lock"
                            secureTextEntry
                            onChangeText={handleChange("password")}
                            errorStyle={{ color: "red" }}
                            error={errors ? errors.password : ""}
                        />
                        <AppTextInput
                            placeholder="Confirm Password "
                            labelText="Confirm Password"
                            icon="lock"
                            secureTextEntry
                            onChangeText={handleChange("confirmPassword")}
                            errorStyle={{ color: "red" }}
                            error={errors ? errors.confirmPassword : ""}
                        />

                        <AppButton title="Register" onPress={handleSubmit} />
                    </>
                )}
            </Formik>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {},
});

export default RegisterScreen;
