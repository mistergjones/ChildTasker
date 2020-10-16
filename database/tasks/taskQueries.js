// this module will establsh the SQLite database connection and provide simple queries to understand how this will be put together
import React from "react";

import * as SQLite from "expo-sqlite";
import { array } from "yup";

// open the database
const db = SQLite.openDatabase("db.db");

// get all tasks
// We will pass in a function that can take the users from the query and set the state.
const getTasks = (setUserFunc) => {
    db.transaction(
        (tx) => {
            tx.executeSql(
                "select * from tasks",
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
            console.log("Retrieved tasks");
        }
    );
};

/******* get specific tasks given a category id */
const getSpecficTasks = async (taskID, setUserFunc) => {
    console.log("TASK ID IS: ", taskID);
    return new Promise(async (resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "select * from tasks where category_id = ?",
                    [taskID],
                    (_, { rows: { _array } }) => {
                        setUserFunc(_array);
                        //console.log(_array);
                    }
                );
            },
            (t, error) => {
                console.log("db error in try to obtain getSpecific Tasks");
                console.log(error);
                reject(error);
            },
            (_t, _success) => {
                console.log("Retrieved Specific Tasks");

                resolve(_success);
            }
        );
    });
};

export const databaseTasks = {
    getTasks,

    getSpecficTasks,
};
