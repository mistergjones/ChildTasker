// this module will establsh the SQLite database connection and provide simple queries to understand how this will be put together
import React from "react";

import * as SQLite from "expo-sqlite";
import { array } from "yup";

// open the database
const db = SQLite.openDatabase("db.db");

// get all tasks
// We will pass in a function that can take the users from the query and set the state.
const getTasks = async (setUserFunc) => {
    return new Promise(async (resolve, reject) => {
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
                reject(error);
            },
            (_t, _success) => {
                console.log("Retrieved tasks");
                resolve(_success);
            }
        );
    });
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

// inserst a task into the table
// we pass in a successFunc that will be called after the insert has happened. In our case, we are passing in the function to refresh the categories from the database. This way we know that our state will reflect what is in the database.
const insertTask = async (userTask, successFunc) => {
    return new Promise(async (resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    [
                        userTask.task_name,
                        userTask.task_colour,
                        userTask.task_icon,
                        userTask.task_points,
                        userTask.category_id,
                    ]
                );
            },
            (t, error) => {
                console.log("db error INSERT TASK");
                console.log(error);
            },
            (t, _success) => {
                console.log("TASK insertion was successful");
                //successFunc();
                resolve(_success);
            }
        );
    });
};

// update task
const updateTask = async (task) => {
    // console.log(
    //     "Task = ",
    //     task.task_id,
    //     task.task_name,
    //     task.task_points,
    //     task.task_colour,
    //     task.task_icon,
    //     task.category_id
    // );
    return new Promise(async (resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "update tasks set task_name = ? , task_points = ?, task_colour =?, task_icon =?, category_id =?  where task_id =?",
                    [
                        task.task_name,
                        task.task_points,
                        task.task_colour,

                        task.task_icon,
                        task.category_id,
                        task.task_id,
                    ]
                );
            },
            (t, error) => {
                console.log("db error update tasks");
                console.log(`The error in updateTask is:`, error);
                reject(error);
            },
            (_t, _success) => {
                console.log("updated task");
                resolve(_success);
            }
        );
    });
};

const removeTask = async (task_id) => {
    console.log("Task ID is:  = ", task_id);
    return new Promise(async (resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "delete from tasks where task_id = ?",
                    [task_id],
                    (_, { rows: { _array } }) => {
                        console.log("_array" + _array.length);
                        // setUserFunc(_array);
                    }
                );
            },
            (t, error) => {
                console.log("db error in remove Tasks");
                console.log(error);
                reject(error);
            },
            (_t, _success) => {
                console.log("removed Task");
                resolve(_success);
            }
        );
    });
};

export const databaseTasks = {
    getTasks,
    updateTask,
    removeTask,
    getSpecficTasks,
    insertTask,
};
