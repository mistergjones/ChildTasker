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
                    // console.log("Drop table items");
                    resolve(result);
                },
                (_, error) => {
                    // console.log("error dropping items table");
                    reject(error);
                }
            );
            tx.executeSql(
                "drop table categories",
                [],
                (_, result) => {
                    // console.log("Drop table categories");
                    resolve(result);
                },
                (_, error) => {
                    // console.log("error dropping categories table");
                    reject(error);
                }
            );
            tx.executeSql(
                "drop table tasks",
                [],
                (_, result) => {
                    // console.log("Drop table tasks");
                    resolve(result);
                },
                (_, error) => {
                    // console.log("error dropping tasks table");
                    reject(error);
                }
            );
            tx.executeSql(
                "drop table rewards",
                [],
                (_, result) => {
                    // console.log("Drop table rewards");
                    resolve(result);
                },
                (_, error) => {
                    // console.log("error dropping rewards table");
                    reject(error);
                }
            );

            tx.executeSql(
                "drop table users",
                [],
                (_, result) => {
                    // console.log("Drop table users");
                    resolve(result);
                },
                (_, error) => {
                    // console.log("error dropping users");
                    reject(error);
                }
            );
            tx.executeSql(
                "drop table icons",
                [],
                (_, result) => {
                    // console.log("Drop table icons");
                    resolve(result);
                },
                (_, error) => {
                    // console.log("error dropping icons");
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
                    // console.log("error dropping KIDCHORES table");
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
                    "create table if not exists items (id integer primary key autoincrement not null, done int, value text)"
                );
                tx.executeSql(
                    "create table if not exists categories (category_id integer primary key autoincrement not null, category_name TEXT not null, category_icon TEXT not null, category_colour TEXT)"
                );
                tx.executeSql(
                    "create table if not exists tasks (task_id integer primary key autoincrement not null, task_name TEXT not null, task_colour TEXT not null, task_icon TEXT not null, task_points INTEGER not null, category_id INTEGER, FOREIGN KEY (category_id) REFERENCES categories (category_id))"
                );
                tx.executeSql(
                    "create table if not exists rewards (reward_id integer primary key autoincrement not null, reward_name TEXT not null, reward_points INTEGER,icon_id INTEGER, reward_icon_name TEXT not null, FOREIGN KEY (icon_id) REFERENCES icons (icon_id))"
                );
                tx.executeSql(
                    `create table if not exists users (user_id integer primary key autoincrement not null, user_name TEXT not null, password TEXT not null, is_parent integer, uri Text Default null, icon Text Default "account" null)`
                );
                //table for storing icons for categories; created by Shailesh
                tx.executeSql(
                    "create table if not exists icons (icon_id integer primary key autoincrement not null, icon_name TEXT not null,background_color TEXT not null,label TEXT not null)"
                );
                // gj: original kidshores
                // tx.executeSql(
                //     "create table if not exists kidchores (chore_id integer primary key not null, category_id integer NOT null, category_name TEXT not null, task_id integer not null, task_name TEXT not null, task_points INTEGER not null, kid_id integer NOT null, kid_name TEXT not null, reward_id integer NOT null, reward_name TEXT not null, reward_points integer not null)"
                // );
                tx.executeSql(
                    "create table if not exists kidchores (chore_id integer primary key autoincrement not null, category_id integer NOT null, category_name TEXT not null, task_id integer not null, task_name TEXT not null, task_points INTEGER not null, kid_id integer NOT null, kid_name TEXT not null, reward_id integer NOT null, reward_name TEXT not null, reward_points integer not null, is_completed integer not null, icon_name TEXT not null, reward_icon_name TEXT not null, reward_unique_id)"
                );
            },
            // the error and success functions are called when the transaction is complete. We use the promise resolve and reject functions here.
            (_, error) => {
                // console.log("db error creating tables");
                // console.log(error);
                reject(error);
            },
            (_, success) => {
                // console.log("db success creating tables");
                resolve(success);
            }
        );
    });
};

const loadUsers = async () => {
    return new Promise((resolve, _reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "insert into users (user_name, password, is_parent) values (?,?,?)",
                    ["Zz", "1111", 1]
                );
                tx.executeSql(
                    "insert into users (user_name, password, is_parent) values (?,?,?)",
                    ["A", "1111", 0]
                );
                tx.executeSql(
                    "insert into users (user_name, password, is_parent) values (?,?,?)",
                    ["B", "1111", 0]
                );
            },
            (t, error) => {
                // console.log("db error on INSERT USERS");
                // console.log(error);
                resolve();
            },
            (t, success) => {
                // console.log("db - Successfully pre-loaded the USERS table with data");
                resolve(success);
            }
        );
    });
};

const loadKidChores = async () => {
    return new Promise((resolve, _reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "insert into kidChores (category_id, category_name, icon_name, is_completed,kid_id, kid_name,reward_icon_name, reward_id, reward_name,reward_points,task_id, task_name,task_points) values (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                    [
                        1,
                        "Kitchen",
                        "silverware-clean",
                        0,
                        2,
                        "A",

                        "trophy",
                        1,
                        "Play Console (20)",
                        20,
                        1,
                        "Wash Dishes (10)",
                        10,
                    ]
                );
                tx.executeSql(
                    "insert into kidChores (category_id, category_name, icon_name, is_completed,kid_id, kid_name,reward_icon_name, reward_id, reward_name,reward_points,task_id, task_name,task_points) values (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                    [
                        1,
                        "Kitchen",
                        "silverware-fork-knife",
                        0,
                        2,
                        "A",

                        "trophy",
                        1,
                        "Play Console (20)",
                        20,
                        2,
                        "Dry Dishes (11)",
                        11,
                    ]
                );
                tx.executeSql(
                    "insert into kidChores (category_id, category_name, icon_name, is_completed,kid_id, kid_name,reward_icon_name, reward_id, reward_name,reward_points,task_id, task_name,task_points) values (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                    [
                        1,
                        "Kitchen",
                        "dishwasher",
                        0,
                        2,
                        "A",
                        "trophy",
                        1,
                        "Play Console (20)",
                        20,
                        3,
                        "Load Dishwasher (11)",
                        11,
                    ]
                );
                tx.executeSql(
                    "insert into kidChores (category_id, category_name, icon_name, is_completed,kid_id, kid_name,reward_icon_name, reward_id, reward_name,reward_points,task_id, task_name,task_points) values (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                    [
                        1,
                        "Kitchen",
                        "dishwasher",
                        0,
                        2,
                        "A",
                        "trophy",
                        1,
                        "Play Console (20)",
                        20,
                        4,
                        "Empty Dishwasher (11)",
                        11,
                    ]
                );
                tx.executeSql(
                    "insert into kidChores (category_id, category_name, icon_name, is_completed,kid_id, kid_name,reward_icon_name, reward_id, reward_name,reward_points,task_id, task_name,task_points) values (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                    [
                        1,
                        "Kitchen",
                        "dishwasher",
                        0,
                        2,
                        "A",
                        "trophy",
                        1,
                        "Play Console (20)",
                        20,
                        5,
                        "Set Table (11)",
                        11,
                    ]
                );
                tx.executeSql(
                    "insert into kidChores (category_id, category_name, icon_name, is_completed,kid_id, kid_name,reward_icon_name, reward_id, reward_name,reward_points,task_id, task_name,task_points) values (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                    [
                        1,
                        "Kitchen",
                        "dishwasher",
                        0,
                        2,
                        "A",
                        "trophy",
                        1,
                        "Play Console (20)",
                        20,
                        6,
                        "Clear Table (11)",
                        11,
                    ]
                );

                tx.executeSql(
                    "insert into kidChores (category_id, category_name, icon_name, is_completed,kid_id, kid_name,reward_icon_name, reward_id, reward_name,reward_points,task_id, task_name,task_points) values (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                    [
                        1,
                        "Kitchen",
                        "silverware-clean",
                        0,
                        "B",
                        2,
                        "trophy",
                        1,
                        "Play Console (20)",
                        20,
                        1,
                        "Wash Dishes (10)",
                        10,
                    ]
                );
                tx.executeSql(
                    "insert into kidChores (category_id, category_name, icon_name, is_completed,kid_id, kid_name,reward_icon_name, reward_id, reward_name,reward_points,task_id, task_name,task_points) values (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                    [
                        1,
                        "Kitchen",
                        "silverware-fork-knife",
                        0,
                        "B",
                        2,
                        "trophy",
                        1,
                        "Play Console (20)",
                        20,
                        2,
                        "Dry Dishes (11)",
                        11,
                    ]
                );
                tx.executeSql(
                    "insert into kidChores (category_id, category_name, icon_name, is_completed,kid_id, kid_name,reward_icon_name, reward_id, reward_name,reward_points,task_id, task_name,task_points) values (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                    [
                        1,
                        "Kitchen",
                        "dishwasher",
                        0,
                        2,
                        "B",
                        "trophy",
                        1,
                        "Play Console (20)",
                        20,
                        3,
                        "Load Dishwasher (11)",
                        11,
                    ]
                );
                tx.executeSql(
                    "insert into kidChores (category_id, category_name, icon_name, is_completed,kid_id, kid_name,reward_icon_name, reward_id, reward_name,reward_points,task_id, task_name,task_points) values (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                    [
                        1,
                        "Kitchen",
                        "dishwasher",
                        0,
                        2,
                        "B",
                        "trophy",
                        1,
                        "Play Console (20)",
                        20,
                        4,
                        "Empty Dishwasher (11)",
                        11,
                    ]
                );
                tx.executeSql(
                    "insert into kidChores (category_id, category_name, icon_name, is_completed,kid_id, kid_name,reward_icon_name, reward_id, reward_name,reward_points,task_id, task_name,task_points) values (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                    [
                        1,
                        "Kitchen",
                        "dishwasher",
                        0,
                        2,
                        "B",
                        "trophy",
                        1,
                        "Play Console (20)",
                        20,
                        5,
                        "Set Table (11)",
                        11,
                    ]
                );
                tx.executeSql(
                    "insert into kidChores (category_id, category_name, icon_name, is_completed,kid_id, kid_name,reward_icon_name, reward_id, reward_name,reward_points,task_id, task_name,task_points) values (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                    [
                        1,
                        "Kitchen",
                        "dishwasher",
                        0,
                        2,
                        "B",
                        "trophy",
                        1,
                        "Play Console (20)",
                        20,
                        6,
                        "Clear Table (11)",
                        11,
                    ]
                );
            },
            (t, error) => {
                // console.log("db error on INSERT KID CHORES");
                // console.log(error);
                resolve();
            },
            (t, success) => {
                // console.log(
                //     "db - Successfully pre-loaded the KID CHORES table with data"
                // );
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
                // console.log("db error insert Item");
                // console.log(error);
                resolve();
            },
            (t, success) => {
                // console.log("db - Successfully pre-loaded the ITEMS table with data");
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
                    ["Pets", "black", "dog"]
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
                // console.log("db error on INSERT CATEGORIES");
                // console.log(error);
                resolve();
            },
            (t, success) => {
                // console.log(
                //     "db - Successfully pre-loaded the CATEGORIES table with data"
                // );
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
                        10,
                        1,
                    ]
                );
                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    ["Load Dishwasher", "rebeccapurple", "dishwasher", 10, 1]
                );
                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    ["Empty Dishwasher", "rebeccapurple", "dishwasher", 10, 1]
                );
                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    ["Set Table", "rebeccapurple", "food-fork-drink", 10, 1]
                );
                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    ["Clear Table", "rebeccapurple", "food-fork-drink", 10, 1]
                );
                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    ["Eat Fruit/Veggies", "rebeccapurple", "food-apple", 10, 1]
                );

                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    ["Not late for School", "teal", "walk", 10, 2]
                );
                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    ["Arrive home on time", "teal", "walk", 10, 2]
                );
                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    ["No lost items", "teal", "cancel", 10, 2]
                );

                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    ["Make Bed", "orange", "bed-empty", 10, 3]
                );
                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    ["Tidy Room", "orange", "desk-lamp", 10, 3]
                );
                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    ["Tidy Floor", "orange", "crop-square", 10, 3]
                );

                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    [
                        "Put rubbish out",
                        "saddlebrown",
                        "trash-can-outline",
                        10,
                        4,
                    ]
                );
                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    ["Wash car", "saddlebrown", "car-wash", 10, 4]
                );
                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    ["Vacuum Floors", "saddlebrown", "robot-vacuum", 10, 4]
                );

                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    ["Clean teeth", "blue", "shower", 10, 5]
                );
                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    ["Wash hair", "blue", "face", 10, 5]
                );

                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    [
                        "Do Homework",
                        "darkgreen",
                        "book-open-page-variant",
                        10,
                        6,
                    ]
                );
                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    ["Read Book", "darkgreen", "book-open", 10, 6]
                );

                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    ["Walk Dog", "black", "dog-service", 10, 7]
                );
                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    ["Wash Dog", "black", "dog", 10, 7]
                );
                tx.executeSql(
                    "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
                    ["Dry Dog", "black", "dog", 10, 7]
                );
            },
            (t, error) => {
                // console.log("db error on INSERT TASKS");
                // console.log(error);
                resolve();
            },
            (t, success) => {
                // console.log("db - Successfully pre-loaded the TASKS table with data");
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
                    "insert into rewards (reward_name, reward_points, icon_id, reward_icon_name) values (?,?,?,?)",
                    ["Play Console", 50, 1, "gamepad-variant"]
                );
                tx.executeSql(
                    "insert into rewards (reward_name, reward_points, icon_id, reward_icon_name) values (?,?,?,?)",
                    ["Go to Park", 50, 2, "tree-outline"]
                );
            },
            (t, error) => {
                // console.log("db error on INSERT REWARDS");
                // console.log(error);
                resolve();
            },
            (t, success) => {
                // console.log("db - Successfully pre-loaded the REWARDS table with data");
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
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["laptop", "#2bcbba", "Laptop"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["desktop-mac", "#2bcbba", "Computer"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["gamepad-variant", "#2bcbba", "Game Console"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["anchor", "#2bcbba", "Boat"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["christianity", "#2bcbba", "Religion"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["axe", "#2bcbba", "Outdoors"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["tent", "#2bcbba", "Camping"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["fire", "#2bcbba", "Fire"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["fire-truck", "#2bcbba", "Fire-Truck"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["firework", "#2bcbba", "Fire Works"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["airplane", "#2bcbba", "Airplane"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["airplane-takeoff", "#2bcbba", "Holidays"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["beach", "#2bcbba", "Beach"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["tower-beach", "#2bcbba", "Beach Tower"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["waves", "#2bcbba", "Ocean"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["android", "#2bcbba", "Android"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["apple", "#2bcbba", "Fruit"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["apple-icloud", "#2bcbba", "iCloud"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["apple-ios", "#2bcbba", "ios"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["apple-safari", "#2bcbba", "Safari"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["baby-face-outline", "#2bcbba", "Baby"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["baby-bottle", "#2bcbba", "Baby Bottle"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["baby-carriage", "#2bcbba", "Baby Pram"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["badminton", "#2bcbba", "Badminton"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["balloon", "#2bcbba", "Ballon"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["baseball", "#2bcbba", "Baseball"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["basketball", "#2bcbba", "Basketball"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["bike", "#2bcbba", "Bike"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["billiards", "#2bcbba", "Billiards"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["blender", "#2bcbba", "Smoothie"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["bomb", "#2bcbba", "Bomb"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["boombox", "#2bcbba", "Boombox"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["bowling", "#2bcbba", "Bowling"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["bread-slice-outline", "#2bcbba", "Toast"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["broom", "#2bcbba", "Broom"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["brush", "#2bcbba", "Paintbrush"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["bug", "#2bcbba", "Bug"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["bugle", "#2bcbba", "Musical Instrument"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["bullseye", "#2bcbba", "Bullseye"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["bus", "#2bcbba", "Bus"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["cake", "#2bcbba", "Cake"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["cake-variant", "#2bcbba", "Birthday Cake"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["calculator", "#2bcbba", "Calculator"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["calendar-month", "#2bcbba", "Calendar"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["cards-heart", "#2bcbba", "Love"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["carrot", "#2bcbba", "Vegetables"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["cart", "#2bcbba", "Shopping Trolley"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["cash", "#2bcbba", "Money"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["cellphone-android", "#2bcbba", "Mobile Phone"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["charity", "#2bcbba", "Helping Others"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["chef-hat", "#2bcbba", "Chef"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["chess-king", "#2bcbba", "King"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["chess-queen", "#2bcbba", "Queen"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["city-variant-outline", "#2bcbba", "City"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["alarm", "#2bcbba", "Alarm"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["coffee-outline", "#2bcbba", "Coffee"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["coin", "#2bcbba", "Coins"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["bitcoin", "#2bcbba", "Bitcoin"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["cookie", "#2bcbba", "Biscuit"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["cow", "#2bcbba", "Cow"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["cricket", "#2bcbba", "Cricket"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["crown", "#2bcbba", "Crown"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["cup-water", "#2bcbba", "Drink"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["crosshairs-gps", "#2bcbba", "GPS"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["cupcake", "#2bcbba", "Cupcake"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["death-star", "#2bcbba", "Death Star"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["dice-6", "#2bcbba", "Boardgames"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["division", "#2bcbba", "Mathematics"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["doctor", "#2bcbba", "Doctor"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["drama-masks", "#2bcbba", "Theatre"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["draw", "#2bcbba", "Drawing"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["drone", "#2bcbba", "Drone"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["duck", "#2bcbba", "Duck"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["egg-easter", "#2bcbba", "Easter Egg"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["elephant", "#2bcbba", "Elephant"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["email", "#2bcbba", "Email"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["facebook-box", "#2bcbba", "Facebook"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["facebook-messenger", "#2bcbba", "Facebook Messenger"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["instagram", "#2bcbba", "Instagram"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["emoticon-angry-outline", "#2bcbba", "Feeling Angry"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["emoticon-cool-outline", "#2bcbba", "Feeling Cool"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["emoticon-excited-outline", "#2bcbba", "Feeling Excited"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["emoticon-happy-outline", "#2bcbba", "Feeling Happy"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["emoticon-poop", "#2bcbba", "Poop"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["glasses", "#2bcbba", "Glasses"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["sunglasses", "#2bcbba", "Sunglasses"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["ferris-wheel", "#2bcbba", "Playground"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["ferry", "#2bcbba", "Ferry"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["fishbowl-outline", "#2bcbba", "Fishbowl"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["fish", "#2bcbba", "Fish"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["flickr", "#2bcbba", "Flickr"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["flower-outline", "#2bcbba", "Flower"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["football-australian", "#2bcbba", "Football"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["fridge-outline", "#2bcbba", "Fridge"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["garage", "#2bcbba", "Garage"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["gift-outline", "#2bcbba", "Gift"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["golf", "#2bcbba", "Golf"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["guitar-acoustic", "#2bcbba", "Guitar (acoustic)"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["guitar-electric", "#2bcbba", "Guitar (electric)"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["halloween", "#2bcbba", "Halloween"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["hamburger", "#2bcbba", "Hamburger"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["hand-saw", "#2bcbba", "Tools"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["helicopter", "#2bcbba", "Helicopter"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["hockey-sticks", "#2bcbba", "Hockey"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["hook", "#2bcbba", "Fishing"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["hospital-box", "#2bcbba", "Hospital"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["hotel", "#2bcbba", "Hotel"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["human-greeting", "#2bcbba", "Hello"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["jellyfish-outline", "#2bcbba", "Jellyfish"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["kettle-outline", "#2bcbba", "Kettle"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["keyboard", "#2bcbba", "Keyboard"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["knife", "#2bcbba", "Knife"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["ladybug", "#2bcbba", "Ladybug"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["lock-outline", "#2bcbba", "Secret"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["medal", "#2bcbba", "Medal"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["microphone-variant", "#2bcbba", "Sing"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["microscope", "#2bcbba", "Microscope"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["moon-waning-crescent", "#2bcbba", "Moon"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["muffin", "#2bcbba", "Muffin"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["theater", "#2bcbba", "Movies"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["music", "#2bcbba", "Music"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["necklace", "#2bcbba", "Jewellery"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["netflix", "#2bcbba", "Netflix"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["nintendo-switch", "#2bcbba", "Nintendo Switch"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["owl", "#2bcbba", "Owl"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["panda", "#2bcbba", "Panda"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["paw", "#2bcbba", "Paw"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["peace", "#2bcbba", "Peace"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["penguin", "#2bcbba", "Penguin"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["piano", "#2bcbba", "Piano"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["pig", "#2bcbba", "Pig"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["pinterest", "#2bcbba", "Pinterest"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["pirate", "#2bcbba", "Pirate"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["pizza", "#2bcbba", "Pizza"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["pool", "#2bcbba", "Swimming Pool"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["popcorn", "#2bcbba", "Popcorn"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["pot", "#2bcbba", "Cooking"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["puzzle-outline", "#2bcbba", "Puzzles"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["rabbit", "#2bcbba", "Rabbit"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["recycle", "#2bcbba", "Recycle"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["rice", "#2bcbba", "Rice"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["rollerblade", "#2bcbba", "Rollerblade"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["ruby", "#2bcbba", "Ruby"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["rugby", "#2bcbba", "Rugby"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["run", "#2bcbba", "Run"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["security", "#2bcbba", "Security"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["settings", "#2bcbba", "Settings"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["shopping", "#2bcbba", "Shopping"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["shopify", "#2bcbba", "Shopify"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["silverware-fork", "#2bcbba", "Fork"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["silverware-spoon", "#2bcbba", "Spoon"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["skull-crossbones", "#2bcbba", "Skull Crossbones"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["snowflake", "#2bcbba", "Snowflake"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["soccer", "#2bcbba", "Soccer"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["spotify", "#2bcbba", "Spotify"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["star-outline", "#2bcbba", "Star"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["steam", "#2bcbba", "Steam"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["stocking", "#2bcbba", "Christmas Stocking"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["train", "#2bcbba", "train"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["summit", "#2bcbba", "Mountain"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["swim", "#2bcbba", "Swimming"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["sword", "#2bcbba", "Sword"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["table-tennis", "#2bcbba", "Table-tennis"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["tablet-android", "#2bcbba", "Tablet"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["tank", "#2bcbba", "Tank"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["taxi", "#2bcbba", "Taxi"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["tea-outline", "#2bcbba", "Tea"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["tennis-ball", "#2bcbba", "Tennis"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["thumb-down-outline", "#2bcbba", "Thumb Down"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["thumb-up-outline", "#2bcbba", "Thumb Up"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["ticket", "#2bcbba", "Tickets"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["tooth-outline", "#2bcbba", "Tooth"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["trash-can-outline", "#2bcbba", "rubbish"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["tree-outline", "#2bcbba", "Tree"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["trophy-outline", "#2bcbba", "Trophy"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["truck-delivery", "#2bcbba", "Truck"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["tshirt-crew-outline", "#2bcbba", "T-shirt"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["tumblr", "#2bcbba", "Tumblr"]
                );

                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["twitch", "#2bcbba", "Twitch"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["twitter", "#2bcbba", "Twitter"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["uber", "#2bcbba", "Uber"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["walk", "#2bcbba", "Walk"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["water-outline", "#2bcbba", "Water"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["weather-cloudy", "#2bcbba", "Weather Cloudy"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["weather-fog", "#2bcbba", "WeatherFog"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["weather-hail", "#2bcbba", "Weather Hail"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["weather-partly-cloudy", "#2bcbba", "Weathy Partly Cloudy"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["weather-rainy", "#2bcbba", "Weather Rainy"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["weather-snowy", "#2bcbba", "Weather Snowy"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["weather-sunny", "#2bcbba", "Weather Sunny"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["wechat", "#2bcbba", "Wechat"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["whatsapp", "#2bcbba", "Whatsapp"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["xbox", "#2bcbba", "xbox"]
                );
                tx.executeSql(
                    "insert into icons (icon_name,background_color,label) values (?,?,?)",
                    ["youtube", "#2bcbba", "Youtube"]
                );
            },
            (t, error) => {
                // console.log("db error on INSERT icon");
                // console.log(error);
                resolve();
            },
            (t, success) => {
                // console.log("db - Successfully pre-loaded the ICONS table with data");
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
        // GJ: the below are commentd out as i used them for test purposes
        // await loadKidChores();
        // await loadUsers();
        resolve();
    });
};

export const database = {
    createTablesDatabaseAsync,
    loadDataIntoTablesAsync,
    dropDatabaseTablesAsync,
};
