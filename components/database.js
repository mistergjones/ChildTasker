// this module will establsh the SQLite database connection and provide simple queries to understand how this will be put together
import React from "react";

import * as SQLite from "expo-sqlite";

// open the database
const db = SQLite.openDatabase("childtasker.db");

// lets select all from users.
// We will pass in a function that can take the users from the query and set the state.
const getUsers = (setUserFunc) => {
    db.transaction(
        (tx) => {
            tx.executeSql(
                "select * from users",
                [],
                (_, { rows: { _array } }) => {
                    setUserFunc(_array);
                }
            );
        },
        (t, error) => {
            console.log("db error load users");
            console.log(error);
        },
        (_t, _success) => {
            console.log("loaded users");
        }
    );
};

// inserst a user into the table
// we pass in a successFunc that will be called after the insert has happened. In our case, we are passing in the function to refresh the users from the database. This way we know that our state will reflect what is in the database.
const insertUser = (userName, successFunc) => {
    db.transaction(
        (tx) => {
            tx.executeSql("insert into users (name) values (?)", [userName]);
        },
        (t, error) => {
            console.log("db error insertUser");
            console.log(error);
        },
        (t, success) => {
            successFunc();
        }
    );
};

// drop the table users
const dropDatabaseTablesAsync = async () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "drop table users",
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    console.log("error dropping users table");
                    reject(error);
                }
            );
        });
    });
};

// create the user table if it does not exist
const setupDatabaseAsync = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "create table if not exists users (id integer primary key not null, name text);"
                );
            },
            // the error and success functions are called when the transaction is complete. We use the promise resolve and reject functions here.
            (_, error) => {
                console.log("db error creating tables");
                console.log(error);
                reject(error);
            },
            (_, success) => {
                resolve(success);
            }
        );
    });
};

// insert a user
const setupUsersAsync = async () => {
    return new Promise((resolve, _reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql("insert into users (id, name) values (?,?)", [
                    1,
                    "john",
                ]);
            },
            (t, error) => {
                console.log("db error insertUser");
                console.log(error);
                resolve();
            },
            (t, success) => {
                resolve(success);
            }
        );
    });
};

export const database = {
    getUsers,
    insertUser,
    setupDatabaseAsync,
    setupUsersAsync,
    dropDatabaseTablesAsync,
};
