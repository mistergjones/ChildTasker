// this module will establsh the SQLite database connection and provide simple queries to understand how this will be put together
import React from "react";

import * as SQLite from "expo-sqlite";

// open the database
const db = SQLite.openDatabase("db.db");

// drop the table items
const dropDatabaseTablesAsync = async () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "drop table items",
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    console.log("error dropping items table");
                    reject(error);
                }
            );
            tx.executeSql(
                "drop table categories",
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    console.log("error dropping categories table");
                    reject(error);
                }
            );
            tx.executeSql(
                "drop table tasks",
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    console.log("error dropping tasks table");
                    reject(error);
                }
            );
            tx.executeSql(
                "drop table rewards",
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    console.log("error dropping rewards table");
                    reject(error);
                }
            );
            tx.executeSql(
                "drop table users",
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    console.log("error dropping users");
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
                    "create table if not exists items (id integer primary key not null, done int, value text)"
                );
                tx.executeSql(
                    "create table if not exists categories (category_id integer primary key not null, category_name TEXT not null, category_colour TEXT)"
                );
                tx.executeSql(
                    "create table if not exists tasks (task_id integer primary key not null, task_name TEXT not null, task_colour TEXT not null, task_icon TEXT not null, category_id INTEGER, FOREIGN KEY (category_id) REFERENCES categories (category_id))"
                );
                tx.executeSql(
                    "create table if not exists rewards (reward_id integer primary key not null, reward_name TEXT not null, reward_points INTEGER)"
                );
                tx.executeSql(
                    "create table if not exists users (user_id integer primary key not null, user_name TEXT not null, user_email TEXT, user_pin INTEGER not null)"
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

// get all items
// We will pass in a function that can take the users from the query and set the state.
const getItems = (setUserFunc) => {
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
};

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

// get all categories
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
const getSpecficTasks = (category_id, setUserFunc) => {
    db.transaction(
        (tx) => {
            tx.executeSql(
                "select * from tasks where category_id = ?",
                [parseInt(category_id)],
                (_, { rows: { _array } }) => {
                    setUserFunc(_array);
                }
            );
        },
        (t, error) => {
            console.log("db error in try to obtain getSpecific Tasks");
            console.log(error);
        },
        (_t, _success) => {
            console.log("Retrieved Specific tasks");
        }
    );
};

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

// inserst a ITEM into the table
// we pass in a successFunc that will be called after the insert has happened. In our case, we are passing in the function to refresh the items from the database. This way we know that our state will reflect what is in the database.
const insertItem = (userName, successFunc) => {
    db.transaction(
        (tx) => {
            tx.executeSql("insert into items (done,value) values (0,?)", [
                userName,
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

// insert an ITEM AND CATEGORIES to populate at least with one item
const setupUsersAsync = async () => {
    return new Promise((resolve, _reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql("insert into items (done, value) values (0, ?)", [
                    "Pet",
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
        db.transaction(
            (tx) => {
                tx.executeSql("insert into items (done, value) values (0, ?)", [
                    "School",
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
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "insert into categories (category_name) values (?)",
                    ["Kitchen"]
                );
                tx.executeSql(
                    "insert into categories (category_name) values (?)",
                    ["School"]
                );
            },
            (t, error) => {
                console.log("db error on INSERT CATEGORIES");
                console.log(error);
                resolve();
            },
            (t, success) => {
                resolve(success);
            }
        );
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, category_id) values (?,?,?,?)",
                    ["Do Homework", "Green", "book", 1]
                );
                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, category_id) values (?,?,?,?)",
                    ["Read Book", "Orange", "book", 1]
                );
                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, category_id) values (?,?,?,?)",
                    ["Walk Dog", "Red", "pets", 2]
                );
                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, category_id) values (?,?,?,?)",
                    ["Wash Dog", "Blue", "pets", 2]
                );
            },
            (t, error) => {
                console.log("db error on INSERT TASKS");
                console.log(error);
                resolve();
            },
            (t, success) => {
                resolve(success);
            }
        );
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "insert into rewards (reward_name, reward_points) values (?,?)",
                    ["Play Console", 20]
                );
                tx.executeSql(
                    "insert into rewards (reward_name, reward_points) values (?,?)",
                    ["Go Karting", 220]
                );
            },
            (t, error) => {
                console.log("db error on INSERT REWARDFS");
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
    getItems,
    insertItem,
    setupDatabaseAsync,
    setupUsersAsync,
    dropDatabaseTablesAsync,

    getCategories,
    insertCategory,

    getTasks,

    getSpecficTasks,

    getRewards,
};
