// this module will establsh the SQLite database connection and provide simple queries to understand how this will be put together
import React from "react";

import * as SQLite from "expo-sqlite";
import { array } from "yup";

// open the database
const db = SQLite.openDatabase("db.db");

// get all categories
// We will pass in a function that can take the users from the query and set the state.
const getCategories = (setUserFunc) => {
    return new Promise(async (resolve, reject) => {
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
                reject(error);
            },
            (_t, _success) => {
                console.log("Retrieved CATEGORIES");
                resolve(_success);
            }
        );
    });
};

// inserst a category into the table
// we pass in a successFunc that will be called after the insert has happened. In our case, we are passing in the function to refresh the categories from the database. This way we know that our state will reflect what is in the database.
const insertCategory = (
    category_name,

    successFunc
) => {
    db.transaction(
        (tx) => {
            tx.executeSql(
                "insert into categories (category_name, category_colour, category_icon) values (?,?,?)",
                [category_name, "Blue", "School"]
            );
        },
        (t, error) => {
            console.log("db error INSERT CATEGORY");
            console.log(error);
        },
        (t, success) => {
            console.log("CATEGORY insertion was successful");
            successFunc();
        }
    );
};

const removeCategory = async (task_id) => {
    console.log("Category ID is:  = ", task_id);
    return new Promise(async (resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "delete from categories where category_id = ?",
                    [task_id],
                    (_, { rows: { _array } }) => {
                        console.log("_array" + _array.length);
                        // setUserFunc(_array);
                    }
                );
            },
            (t, error) => {
                console.log("db error in remove CAtegory");
                console.log(error);
                reject(error);
            },
            (_t, _success) => {
                console.log("removed Category" + _t);
                resolve(_success);
            }
        );
    });
};

// update category
const updateCategory = async (category) => {
    console.log(
        "Category = ",

        category.category_name,
        category.category_icon,
        category.category_colour,

        category.category_id
    );
    return new Promise(async (resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "update categories set category_name = ?, category_icon =?, category_colour =? where category_id =?",
                    [
                        category.category_name,
                        category.category_icon,
                        category.category_colour,
                        category.category_id,
                    ]
                );
            },
            (t, error) => {
                console.log("db error update category");
                console.log(`The error in updateCategory is:`, error);
                reject(error);
            },
            (_t, _success) => {
                console.log("updated Category");
                resolve(_success);
            }
        );
    });
};

export const databaseCategories = {
    getCategories,
    insertCategory,
    removeCategory,
    updateCategory,
};
