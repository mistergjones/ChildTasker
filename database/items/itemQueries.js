// this module will establsh the SQLite database connection and provide simple queries to understand how this will be put together
import React from "react";

import * as SQLite from "expo-sqlite";
import { array } from "yup";

// open the database
console.log("BEFORE Database");
const db = SQLite.openDatabase("db.db");
console.log("AFTER Database");
// get all items
// We will pass in a function that can take the users from the query and set the state.
const getItems = (setUserFunc) => {
    console.log("AM I BEING CALLED GET ITEMS");
    try {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "select * from items",
                    [],
                    (_, { rows: { _array } }) => {
                        setUserFunc(_array);
                    }
                );
            },
            (t, error) => {
                console.log("db error load ITEMS");
                console.log(error);
            },
            (_t, _success) => {
                console.log("Retrieved ITEMS");
            }
        );
    } catch (error) {
        console.log("error = ", error);
    }
};

// inserst a ITEM into the table
// we pass in a successFunc that will be called after the insert has happened. In our case, we are passing in the function to refresh the items from the database. This way we know that our state will reflect what is in the database.
const insertItem = (item, successFunc) => {
    db.transaction(
        (tx) => {
            tx.executeSql("insert into items (done,value) values (0,?)", [
                item,
            ]);
        },
        (t, error) => {
            console.log("db error INSERT ITEM");
            console.log(error);
        },
        (t, success) => {
            successFunc();
        }
    );
};

export const databaseItems = {
    getItems,
    insertItem,
};
