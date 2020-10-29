// this module will establsh the SQLite database connection and provide simple queries to understand how this will be put together
import React from "react";

import * as SQLite from "expo-sqlite";
import { array } from "yup";

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
                    console.log("Drop table items");
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
                    console.log("Drop table categories");
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
                    console.log("Drop table tasks");
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
                    console.log("Drop table rewards");
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
                    console.log("Drop table users");
                    resolve(result);
                },
                (_, error) => {
                    console.log("error dropping users");
                    reject(error);
                }
            );
            tx.executeSql(
                "drop table icons",
                [],
                (_, result) => {
                    console.log("Drop table icons");
                    resolve(result);
                },
                (_, error) => {
                    console.log("error dropping icons");
                    reject(error);
                }
            );
            tx.executeSql(
                "drop table kidchores",
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    console.log("error dropping KIDCHORES table");
                    reject(error);
                }
            );
        });
    });
};

// create the user table if it does not exist
const createTablesDatabaseAsync = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "create table if not exists items (id integer primary key not null, done int, value text)"
                );
                tx.executeSql(
                    "create table if not exists categories (category_id integer primary key not null, category_name TEXT not null, category_icon TEXT not null, category_colour TEXT)"
                );
                tx.executeSql(
                    "create table if not exists tasks (task_id integer primary key not null, task_name TEXT not null, task_colour TEXT not null, task_icon TEXT not null, task_points INTEGER not null, category_id INTEGER, FOREIGN KEY (category_id) REFERENCES categories (category_id))"
                );
                tx.executeSql(
                    "create table if not exists rewards (reward_id integer primary key not null, reward_name TEXT not null, reward_points INTEGER,icon_id INTEGER,FOREIGN KEY (icon_id) REFERENCES icons (icon_id))"
                );
                tx.executeSql(
                    "create table if not exists users (user_id integer primary key not null, user_name TEXT not null, password TEXT not null, is_parent integer)"
                );
                //table for storing icons for categories; created by Shailesh
                tx.executeSql(
                    "create table if not exists icons (icon_id integer primary key not null, icon_name TEXT not null,background_color TEXT not null,label TEXT not null)"
                );
                // gj: original kidshores
                // tx.executeSql(
                //     "create table if not exists kidchores (chore_id integer primary key not null, category_id integer NOT null, category_name TEXT not null, task_id integer not null, task_name TEXT not null, task_points INTEGER not null, kid_id integer NOT null, kid_name TEXT not null, reward_id integer NOT null, reward_name TEXT not null, reward_points integer not null)"
                // );
                tx.executeSql(
                    "create table if not exists kidchores (chore_id integer primary key not null, category_id integer NOT null, category_name TEXT not null, task_id integer not null, task_name TEXT not null, task_points INTEGER not null, kid_id integer NOT null, kid_name TEXT not null, reward_id integer NOT null, reward_name TEXT not null, reward_points integer not null, is_completed integer not null, icon_name TEXT not null)"
                );
            },
            // the error and success functions are called when the transaction is complete. We use the promise resolve and reject functions here.
            (_, error) => {
                console.log("db error creating tables");
                console.log(error);
                reject(error);
            },
            (_, success) => {
                console.log("db success creating tables");
                resolve(success);
            }
        );
    });
};

const loadItems = async () => {
    return new Promise((resolve, _reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql("insert into items (done, value) values (0, ?)", [
                    "Kitchen",
                ]);
                tx.executeSql("insert into items (done, value) values (0, ?)", [
                    "School",
                ]);
                tx.executeSql("insert into items (done, value) values (0, ?)", [
                    "Bedroom",
                ]);
                tx.executeSql("insert into items (done, value) values (0, ?)", [
                    "Home",
                ]);
                tx.executeSql("insert into items (done, value) values (0, ?)", [
                    "Bathroom",
                ]);
                tx.executeSql("insert into items (done, value) values (0, ?)", [
                    "Homework",
                ]);
                tx.executeSql("insert into items (done, value) values (0, ?)", [
                    "Pets",
                ]);
                tx.executeSql("insert into items (done, value) values (0, ?)", [
                    "Good Behaviour",
                ]);
                tx.executeSql("insert into items (done, value) values (0, ?)", [
                    "General",
                ]);
            },
            (t, error) => {
                console.log("db error insert Item");
                console.log(error);
                resolve();
            },
            (t, success) => {
                console.log(
                    "db - Successfully pre-loaded the ITEMS table with data"
                );
                resolve(success);
            }
        );
    });
};

const loadCategories = async () => {
    return new Promise((resolve, _reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "insert into categories (category_name, category_colour, category_icon) values (?,?,?)",
                    ["Kitchen", "rebeccapurple", "silverware-fork-knife"]
                );
                tx.executeSql(
                    "insert into categories (category_name, category_colour, category_icon) values (?,?,?)",
                    ["School", "darkgreen", "school"]
                );
                tx.executeSql(
                    "insert into categories (category_name, category_colour, category_icon) values (?,?,?)",
                    ["Bedroom", "orange", "bed-empty"]
                );
                tx.executeSql(
                    "insert into categories (category_name, category_colour, category_icon) values (?,?,?)",
                    ["Home", "saddlebrown", "home"]
                );
                tx.executeSql(
                    "insert into categories (category_name, category_colour, category_icon) values (?,?,?)",
                    ["Bathroom", "blue", "shower-head"]
                );
                tx.executeSql(
                    "insert into categories (category_name, category_colour, category_icon) values (?,?,?)",
                    ["Homework", "darkgreen", "book-open-page-variant"]
                );
                tx.executeSql(
                    "insert into categories (category_name, category_colour, category_icon) values (?,?,?)",
                    ["Pets", "blue", "dog"]
                );
                tx.executeSql(
                    "insert into categories (category_name, category_colour, category_icon) values (?,?,?)",
                    ["Good Behaviour", "tomato", "account-check-outline"]
                );
                tx.executeSql(
                    "insert into categories (category_name, category_colour, category_icon) values (?,?,?)",
                    ["General", "darkgrey", "adjust"]
                );
            },
            (t, error) => {
                console.log("db error on INSERT CATEGORIES");
                console.log(error);
                resolve();
            },
            (t, success) => {
                console.log(
                    "db - Successfully pre-loaded the CATEGORIES table with data"
                );
                resolve(success);
            }
        );
    });
};

const loadTasks = async () => {
    return new Promise((resolve, _reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    ["Wash Dishes", "rebeccapurple", "silverware-clean", 10, 1]
                );
                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    [
                        "Dry Dishes",
                        "rebeccapurple",
                        "silverware-fork-knife",
                        11,
                        1,
                    ]
                );
                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    ["Load Dishwasher", "rebeccapurple", "dishwasher", 11, 1]
                );
                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    ["Empty Dishwasher", "rebeccapurple", "dishwasher", 11, 1]
                );
                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    ["Set Table", "rebeccapurple", "food-fork-drink", 11, 1]
                );
                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    ["Clear Table", "rebeccapurple", "food-fork-drink", 11, 1]
                );
                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    ["Eat Fruit/Veggies", "rebeccapurple", "food-apple", 11, 1]
                );

                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    ["Not late for School", "teal", "walk", 12, 2]
                );
                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    ["Arrive home on time", "teal", "walk", 13, 2]
                );
                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    ["No lost items", "teal", "cancel", 13, 2]
                );

                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    ["Make Bed", "orange", "bed-empty", 14, 3]
                );
                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    ["Tidy Room", "orange", "desk-lamp", 15, 3]
                );
                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    ["Tidy Floor", "orange", "crop-square", 16, 3]
                );

                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    [
                        "Put rubbish out",
                        "saddlebrown",
                        "trash-can-outline",
                        17,
                        4,
                    ]
                );
                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    ["Wash car", "saddlebrown", "car-wash", 18, 4]
                );
                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    ["Vacuum Floors", "saddlebrown", "robot-vacuum", 19, 4]
                );

                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    ["Clean teeth", "blue", "shower", 20, 5]
                );
                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    ["Wash hair", "blue", "face", 21, 5]
                );

                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    [
                        "Do Homework",
                        "darkgreen",
                        "book-open-page-variant",
                        22,
                        6,
                    ]
                );
                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    ["Read Book", "darkgreen", "book-open", 23, 6]
                );

                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    ["Walk Dog", "Black", "dog-service", 24, 7]
                );
                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    ["Wash Dog", "Black", "dog", 25, 7]
                );
                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    ["Dry Dog", "Black", "dog", 25, 7]
                );
            },
            (t, error) => {
                console.log("db error on INSERT TASKS");
                console.log(error);
                resolve();
            },
            (t, success) => {
                console.log(
                    "db - Successfully pre-loaded the TASKS table with data"
                );
                resolve(success);
            }
        );
    });
};

const loadRewards = async () => {
    return new Promise((resolve, _reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "insert into rewards (reward_name, reward_points, icon_id) values (?,?,?)",
                    ["Play Console", 20, 1]
                );
                tx.executeSql(
                    "insert into rewards (reward_name, reward_points, icon_id) values (?,?,?)",
                    ["Go Karting", 40, 2]
                );
            },
            (t, error) => {
                console.log("db error on INSERT REWARDFS");
                console.log(error);
                resolve();
            },
            (t, success) => {
                console.log(
                    "db - Successfully pre-loaded the REWARDS table with data"
                );
                resolve(success);
            }
        );
    });
};

const loadIcons = async () => {
    return new Promise((resolve, _reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["floor-lamp", "#fc5c65", "Furniture"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["car", "#fd9644", "Cars"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["camera", "#fed330", "Cameras"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["cards", "#26de81", "Games"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["shoe-heel", "#2bcbba", "Clothing"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["basketball", "#45aaf2", "Sports"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["headphones", "#4b7bec", "Movies & Music"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["book-open-variant", "#a55eea", "Books"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["application", "#2bcbba", "Other"]
                );
            },
            (t, error) => {
                console.log("db error on INSERT icon");
                console.log(error);
                resolve();
            },
            (t, success) => {
                console.log(
                    "db - Successfully pre-loaded the ICONS table with data"
                );
                resolve(success);
            }
        );
    });
};
// insert an ITEM AND CATEGORIES to populate at least with one item
const loadDataIntoTablesAsync = async () => {
    return new Promise(async (resolve, _reject) => {
        await loadItems();
        await loadCategories();
        await loadTasks();
        await loadRewards();
        await loadIcons();
        resolve();
    });
};

export const database = {
    createTablesDatabaseAsync,
    loadDataIntoTablesAsync,
    dropDatabaseTablesAsync,
};
