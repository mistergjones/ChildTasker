// this module will establsh the SQLite database connection and provide simple queries to understand how this will be put together
import React from "react";

import * as SQLite from "expo-sqlite";
import { array } from "yup";

// open the database
const db = SQLite.openDatabase("db.db");

/******* get specific tasks given a category id */
const getRewards = (setUserFunc) => {
    db.transaction(
        (tx) => {
            tx.executeSql(
                "select * from rewards",
                [],
                (_, { rows: { _array } }) => {
                    setUserFunc(_array);
                }
            );
        },
        (t, error) => {
            console.log("db error load tasks");
            console.log(error);
        },
        (_t, _success) => {
            console.log("Retrieved Rewards");
        }
    );
};
export const databaseRewards = {
    getRewards,
};
