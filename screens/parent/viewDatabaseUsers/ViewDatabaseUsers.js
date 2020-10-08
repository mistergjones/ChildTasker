// this module will test to see if we can obtain data from the SQL lite database

import React, { useState } from "react";
//import { View, StyleSheet } from "react-native";
import AppHeading from "../../../components/appHeading.js";
import AppButton from "../../../components/appButton.js";
import screens from "../../../config/screens.js";

import CategoryPickerItem from "../../../components/appCategoryPickerItem";

import AppPicker from "../../../components/appPicker";

import {
    Form,
    FormField,
    FormPicker as Picker,
    SubmitButton,
} from "../../../components/forms";

import Screen from "../../../components/appScreen";
// ****************************************************************

import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";

// open and connect to a database
const db = SQLite.openDatabase("db.db");

function Items({ done: doneHeading, onPressItem }) {
    // declare items state variable
    const [items, setItems] = React.useState(null);

    // by using useEffect(), we will always run the SELECT query below to continually update afer each render
    React.useEffect(() => {
        // typical way to execute a callback for running an SQL statement
        // db.transaction(callback, error, success)
        db.transaction((tx) => {
            //The format to execute is: tx.executeSql(sqlStatement, arguments, success, error)
            tx.executeSql(
                `select * from items where done = ?;`,
                [doneHeading ? 1 : 0],
                (_, { rows: { _array } }) => setItems(_array)
            );
        });
    }, []);

    const heading = doneHeading ? "Completed" : "Todo";

    if (items === null || items.length === 0) {
        return null;
    }

    return (
        <View style={styles.sectionContainer}>
            {/* heading will be either: "Todo" or "Completed" */}
            <Text style={styles.sectionHeading}>{heading}</Text>

            {/* loop through each item and present. If TODO: show at top with white backgroud. If COMPLETED: show beneath in GREEN backgroundColor
            Make each item TOUCHABLE */}
            {items.map(({ id, done, value }) => (
                <TouchableOpacity
                    key={id}
                    onPress={() => onPressItem && onPressItem(id)}
                    style={{
                        backgroundColor: done ? "#1c9963" : "#fff",
                        borderColor: "#000",
                        borderWidth: 1,
                        padding: 8,
                    }}
                >
                    <Text style={{ color: done ? "#fff" : "#000" }}>
                        {value}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

function viewDatabaseUsers({ navigation }) {
    const [text, setText] = React.useState(null);
    const [forceUpdate, forceUpdateId] = useForceUpdate();

    // testing drop down picker to obtain db records
    const [scores, setScores] = useState([]);

    const dummyCategories = [
        { label: "Kitchen", value: 1, backgroundColor: "red", icon: "scale" },
        { label: "School", value: 2, backgroundColor: "green", icon: "school" },
        {
            label: "Bedroom",
            value: 3,
            backgroundColor: "blue",
            icon: "bed-empty",
        },
        { label: "Home", value: 4, backgroundColor: "orange", icon: "home" },
        {
            label: "Bathroom",
            value: 5,
            backgroundColor: "purple",
            icon: "shower",
        },
        {
            label: "Homework",
            value: 6,
            backgroundColor: "teal",
            icon: "book-open-page-variant",
        },
        { label: "Pets", value: 7, backgroundColor: "black", icon: "dog" },
        {
            label: "Good Behaviour",
            value: 8,
            backgroundColor: "grey",
            icon: "hand-okay",
        },
        {
            label: "Whatever",
            value: 9,
            backgroundColor: "brown",
            icon: "comment-question",
        },
    ];

    // run once on first render
    React.useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                "create table if not exists items (id integer primary key not null, done int, value text);"
            );
            tx.executeSql(
                "insert into items (done, value) values (0, ?)",
                ["First Record"],
                (_, { rows }) => setScores(rows)
            );
        });
    }, []);

    const getResults = function () {
        var sqlStatement = "select * from items;";
        db.transaction((tx) => {
            tx.executeSql(
                sqlStatement,
                [],
                (_, { rows }) => setScores(rows),
                {},
                []
            );
        });
        // console.log(scores["_array"][1].value);
        // console.log(scores["_array"]);

        var sqlResults = scores["_array"];
        console.log(sqlResults);

        // establish an array that will hold the objects so we can pass to the appPicker
        var categories = [];
        // now loop through each item to obatin id and value and assign to an object. Push this object into the array
        for (
            var loopIterator = 0;
            loopIterator < sqlResults.length;
            loopIterator++
        ) {
            var tempObject = {};
            tempObject.label = sqlResults[loopIterator].value;
            tempObject.value = sqlResults[loopIterator].id;
            categories.push(tempObject);
        }
        //console.log(categories);
        //return categories;
    };

    //var categories = getResults();

    const add = (text) => {
        // is text empty?
        if (text === null || text === "") {
            return false;
        }

        db.transaction(
            (tx) => {
                tx.executeSql("insert into items (done, value) values (0, ?)", [
                    text,
                ]);
                tx.executeSql("select * from items", [], (_, { rows }) =>
                    console.log(JSON.stringify(rows))
                );
            },
            null,
            forceUpdate
        );
    };

    return (
        <Screen style={styles.container}>
            <Form>
                <Text style={styles.heading}>SQLite Cateogory DB Example</Text>
                <View style={styles.flexRow}>
                    <TextInput
                        // is a callback that is called when the text input's text changes
                        onChangeText={(text) => setText(text)}
                        // Callback that is called when the text input's submit button is pressed with the argument. We are callinga function here.
                        onSubmitEditing={() => {
                            add(text);
                            setText(null);
                        }}
                        placeholder="What do you need to do?"
                        style={styles.input}
                        // show the text value
                        value={text}
                    />
                </View>
                <ScrollView style={styles.listArea}>
                    <Items
                        key={`forceupdate-todo-${forceUpdateId}`}
                        done={false}
                        onPressItem={(id) =>
                            db.transaction(
                                (tx) => {
                                    tx.executeSql(
                                        `update items set done = 1 where id = ?;`,
                                        [id]
                                    );
                                },
                                null,
                                forceUpdate
                            )
                        }
                    />
                    <Items
                        done
                        key={`forceupdate-done-${forceUpdateId}`}
                        onPressItem={(id) =>
                            db.transaction(
                                (tx) => {
                                    tx.executeSql(
                                        `delete from items where id = ?;`,
                                        [id]
                                    );
                                },
                                null,
                                forceUpdate
                            )
                        }
                    />
                </ScrollView>

                <AppPicker
                    items={dummyCategories}
                    icon="apps"
                    placeholder="Select Task"
                />

                <AppButton title="Console Results" onPress={getResults} />
                <AppButton
                    title="Return"
                    onPress={() => navigation.navigate(screens.ParentDashBoard)}
                />
            </Form>
        </Screen>
    );
}

function useForceUpdate() {
    const [value, setValue] = useState(0);
    // console.log(value);
    return [() => setValue(value + 1), value];
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        paddingTop: Constants.statusBarHeight,
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    flexRow: {
        flexDirection: "row",
    },
    input: {
        borderColor: "#4630eb",
        borderRadius: 4,
        borderWidth: 1,
        flex: 1,
        height: 48,
        margin: 16,
        padding: 8,
    },
    listArea: {
        backgroundColor: "#f0f0f0",
        flex: 1,
        paddingTop: 16,
    },
    sectionContainer: {
        marginBottom: 16,
        marginHorizontal: 16,
    },
    sectionHeading: {
        color: "blue",
        fontSize: 18,
        marginBottom: 8,
    },
});

export default viewDatabaseUsers;

// function viewDatabaseUsers({ navigation }) {
//     return (
//         <Screen style={styles.container}>
//             <AppHeading title="Viewing Users in DB" />

//             <Form>
//                 <AppButton
//                     title="Return"
//                     onPress={() => navigation.navigate(screens.ParentDashBoard)}
//                 />
//             </Form>
//         </Screen>
//     );
// }

// const styles = StyleSheet.create({
//     container: {},
// });

// export default viewDatabaseUsers;
