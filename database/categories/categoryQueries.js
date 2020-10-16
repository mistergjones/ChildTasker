// this module will establsh the SQLite database connection and provide simple queries to understand how this will be put together
import React from "react";

import * as SQLite from "expo-sqlite";
import { array } from "yup";

// open the database
const db = SQLite.openDatabase("db.db");

// get all categories
// We will pass in a function that can take the users from the query and set the state.
const getCategories = (setUserFunc) => {
    db.transaction(
        (tx) => {
            tx.executeSql(
                "select * from categories",
                [],
                (_, { rows: { _array } }) => {
                    setUserFunc(_array);
                }
            );
        },
        (t, error) => {
            console.log("db error load CATEGORIES");
            console.log(error);
        },
        (_t, _success) => {
            console.log("Retrieved CATEGORIES");
        }
    );
};

// inserst a category into the table
// we pass in a successFunc that will be called after the insert has happened. In our case, we are passing in the function to refresh the categories from the database. This way we know that our state will reflect what is in the database.
const insertCategory = (
    category_name,

    successFunc
) => {
    db.transaction(
        (tx) => {
            tx.executeSql("insert into categories (category_name) values (?)", [
                category_name,
            ]);
        },
        (t, error) => {
            console.log("db error INSERT CATEGORY");
            console.log(error);
        },
        (t, success) => {
            successFunc();
        }
    );
};

export const databaseCategories = {
    getCategories,
    insertCategory,
};
