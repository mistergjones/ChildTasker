// this module will establsh the SQLite database connection and provide simple queries to understand how this will be put together
import React from "react";

import * as SQLite from "expo-sqlite";
import { array } from "yup";

// open the database
const db = SQLite.openDatabase("db.db");

const getChores = (setUserFunc) => {
    db.transaction(
        (tx) => {
            tx.executeSql(
                "select * from kidchores",
                [],
                (_, { rows: { _array } }) => {
                    setUserFunc(_array);
                }
            );
        },
        (t, error) => {
            console.log("db error load KIDCHORES");
            console.log(error);
        },
        (_t, _success) => {
            console.log("Retrieved KIDCHORES");
        }
    );
};

// inserst a task into the table
// we pass in a successFunc that will be called after the insert has happened. In our case, we are passing in the function to refresh the categories from the database. This way we know that our state will reflect what is in the database.

const insertChoresToKid = (kidChores, successFunc) => {
    db.transaction(
        (tx) => {
            console.log(`The kid chores are: `, kidChores);
            tx.executeSql(
                "insert into kidchores (category_id, category_name, task_id, task_name, task_points, kid_id, kid_name, reward_id, reward_name, reward_points) values (?,?,?,?,?,?,?,?,?,?)",
                [
                    kidChores.category_id,
                    kidChores.category_name,
                    kidChores.task_id,
                    kidChores.task_name,
                    kidChores.task_points,
                    kidChores.kid_id,
                    kidChores.kid_name,
                    kidChores.reward_id,
                    kidChores.reward_name,
                    kidChores.reward_points,
                ]
            );
        },
        (t, error) => {
            console.log("db error INSERT CHORES FOR KID");
            console.log(error);
        },
        (t, success) => {
            console.log("CHORE insertion for kid was successful");
            successFunc();
        }
    );
};

export const databaseAssignChoresToKid = {
    insertChoresToKid,
    getChores,
};
