// this module will establsh the SQLite database connection and provide simple queries to understand how this will be put together
import React from "react";

import * as SQLite from "expo-sqlite";
import { array } from "yup";

// open the database
const db = SQLite.openDatabase("db.db");

// helper function

// GET ALL CHORES: the below just simply retrieves all chores.
const getChores = (setUserFunc) => {
    return new Promise(async (resolve, reject) => {
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
                // console.log("db error load KIDCHORES");
                // console.log(error);
                reject(error);
            },
            (_t, _success) => {
                // console.log("Retrieved KIDCHORES");
                resolve(_success);
            }
        );
    });
};

// change task_id to chore_id

// GET CHORES VY CHILD NAME: the below just simply retrieves all chores for a specific child
const updateChoresByKidName = (kid_name, chore_id) => {
    // console.log("kid_name = " + kid_name + " task_id = " + chore_id);
    return new Promise(async (resolve, reject) => {
        let array = [];
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "update kidchores set is_completed = 1 where kid_name = ? and chore_id = ?",
                    [kid_name, chore_id]
                );
            },
            (t, error) => {
                // console.log("db error in updateing KIDCHORES");
                // console.log(error);
                reject(error);
            },
            (_t, _success) => {
                // console.log("updated KIDCHORES by kid name");
                resolve(array);
            }
        );
    });
};

const getChoresByKidName = (
    kid_name,
    setUserFunc,
    setScore,
    setAvailablePoints
) => {
    return new Promise(async (resolve, reject) => {
        let array = [];
        let choresForRewards = [];
        let rewardsForChild = [];

        db.transaction(
            (tx) => {
                tx.executeSql(
                    "select * from kidchores where kid_name = ?",
                    [kid_name],
                    (_, { rows: { _array } }) => {
                        array = _array;
                        // console.log("length = " + array.length);
                        //choresForRewards.push([array[0]]);

                        if (array.length > 0) {
                            rewardsForChild.push({
                                rewardName: array[0].reward_name,
                                rewardID: array[0].reward_id,
                                rewardIcon: array[0].reward_icon_name,
                                chores: [array[0]],
                            });
                        }
                        for (let i = 1; i < array.length; i++) {
                            let chore = array[i];
                            // console.log("reward name " + chore.reward_id);

                            let noMatch = true;
                            for (let x = 0; x < rewardsForChild.length; x++) {
                                // console.log("chore id = " + chore.reward_id);
                                // console.log(
                                //     "rewardsForCild id = " +
                                //     rewardsForChild[x].chores[0].reward_id
                                // );
                                if (
                                    chore.reward_id ===
                                    rewardsForChild[x].chores[0].reward_id
                                ) {
                                    //choresForRewards[x].push(chore);
                                    rewardsForChild[x].chores.push(chore);
                                    noMatch = false;
                                }
                            }

                            if (noMatch) {
                                // console.log("no match ");
                                choresForRewards.push([chore]);
                                rewardsForChild.push({
                                    rewardName: chore.reward_name,
                                    rewardID: chore.reward_id,
                                    rewardIcon: chore.reward_icon_name,
                                    chores: [chore],
                                });
                            }
                        }

                        // rewardsForChild.map((reward) =>
                        //     console.log(reward.rewardName)
                        // );
                        let score = 0;
                        let availablePoints = 0;
                        array.map((chore) => {
                            if (chore.is_completed === 1) {
                                score += chore.task_points;
                                // console.log("score = " + score);
                            } else {
                                availablePoints += chore.task_points;
                            }
                        });
                        setScore(score);
                        setAvailablePoints(availablePoints);
                        setUserFunc(rewardsForChild);
                        // console.log(
                        //     "chores for rewards lenght = ",
                        //     rewardsForChild.length
                        // );
                    }
                );
            },
            (t, error) => {
                // console.log("db error in retrieving KIDCHORES");
                // console.log(error);
                reject(error);
            },
            (_t, _success) => {
                // console.log("Retrieved KIDCHORES by kid name");

                resolve(rewardsForChild);
            }
        );
    });
};

// inserst a task into the table
// we pass in a successFunc that will be called after the insert has happened. In our case, we are passing in the function to refresh the categories from the database. This way we know that our state will reflect what is in the database.

const insertChoresToKid = (kidChores, successFunc) => {
    return new Promise(async (resolve, reject) => {
        db.transaction(
            (tx) => {
                // console.log(`The kid chores are: `, kidChores);
                tx.executeSql(
                    "insert into kidchores (category_id, category_name, task_id, task_name, task_points, kid_id, kid_name, reward_id, reward_name, reward_points, is_completed, icon_name, reward_icon_name) values (?,?,?,?,?,?,?,?,?,?,?,?,?)",
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
                        kidChores.is_completed,
                        kidChores.icon_name,
                        kidChores.reward_icon_name,
                    ]
                );
            },
            (t, error) => {
                // console.log("db error INSERT CHORES FOR KID");
                // console.log(error);
                reject(error);
            },
            (t, success) => {
                // console.log("CHORE insertion for kid was successful");
                successFunc();
                resolve(success);
            }
        );
    });
};

export const databaseAssignChoresToKid = {
    insertChoresToKid,
    getChores,
    getChoresByKidName,
    updateChoresByKidName,
};
