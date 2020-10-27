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
        tx.executeSql(
          "create table if not exists kidchores (chore_id integer primary key not null, category_id integer NOT null, category_name TEXT not null, task_id integer not null, task_name TEXT not null, task_points INTEGER not null, kid_id integer NOT null, kid_name TEXT not null, reward_id integer NOT null, reward_name TEXT not null, reward_points integer not null)"
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
        console.log("db - Successfully pre-loaded the ITEMS table with data");
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
          ["Kitchen", "blue", "School"]
        );
        tx.executeSql(
          "insert into categories (category_name, category_colour, category_icon) values (?,?,?)",
          ["School", "blue", "School"]
        );
        tx.executeSql(
          "insert into categories (category_name, category_colour, category_icon) values (?,?,?)",
          ["Bedroom", "blue", "School"]
        );
        tx.executeSql(
          "insert into categories (category_name, category_colour, category_icon) values (?,?,?)",
          ["Home", "blue", "School"]
        );
        tx.executeSql(
          "insert into categories (category_name, category_colour, category_icon) values (?,?,?)",
          ["Bathroom", "blue", "School"]
        );
        tx.executeSql(
          "insert into categories (category_name, category_colour, category_icon) values (?,?,?)",
          ["Homework", "blue", "School"]
        );
        tx.executeSql(
          "insert into categories (category_name, category_colour, category_icon) values (?,?,?)",
          ["Pets", "blue", "School"]
        );
        tx.executeSql(
          "insert into categories (category_name, category_colour, category_icon) values (?,?,?)",
          ["Good Behaviour", "blue", "School"]
        );
        tx.executeSql(
          "insert into categories (category_name, category_colour, category_icon) values (?,?,?)",
          ["General", "blue", "School"]
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
          ["Wash Dishes", "Red", "scale", 10, 1]
        );
        tx.executeSql(
          "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
          ["Dry Dishes", "Red", "scale", 11, 1]
        );
        tx.executeSql(
          "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
          ["Not late for School", "Green", "school", 12, 2]
        );
        tx.executeSql(
          "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
          ["Arrive home on time", "Green", "school", 13, 2]
        );

        tx.executeSql(
          "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
          ["Make Bed", "Blue", "bed-empty", 14, 3]
        );
        tx.executeSql(
          "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
          ["Tidy Room", "Blue", "bed-empty", 15, 3]
        );
        tx.executeSql(
          "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
          ["Floor tidy", "Blue", "bed-empty", 16, 3]
        );

        tx.executeSql(
          "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
          ["Put rubbish out", "Orange", "home", 17, 4]
        );
        tx.executeSql(
          "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
          ["Wash car", "Orange", "home", 18, 4]
        );
        tx.executeSql(
          "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
          ["Vacuum Floors", "Orange", "home", 19, 4]
        );

        tx.executeSql(
          "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
          ["Clean teeth", "Purple", "shower", 20, 5]
        );
        tx.executeSql(
          "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
          ["Wash hair", "Purple", "shower", 21, 5]
        );

        tx.executeSql(
          "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
          ["Do Homework", "Teal", "book-open-page-variant", 22, 6]
        );
        tx.executeSql(
          "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
          ["Read Book", "Teal", "book-open-page-variant", 23, 6]
        );

        tx.executeSql(
          "insert into tasks (task_name, task_colour, task_icon, task_points, category_id) values (?,?,?,?,?)",
          ["Walk Dog", "Black", "dog", 24, 7]
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
        console.log("db - Successfully pre-loaded the TASKS table with data");
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
          "insert into rewards (reward_name, reward_points,icon_id) values (?,?,?)",
          ["Play Console", 20, 1]
        );
        tx.executeSql(
          "insert into rewards (reward_name, reward_points,icon_id) values (?,?,?)",
          ["Go Karting", 220, 2]
        );
      },
      (t, error) => {
        console.log("db error on INSERT REWARDFS");
        console.log(error);
        resolve();
      },
      (t, success) => {
        console.log("db - Successfully pre-loaded the REWARDS table with data");
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
        console.log("db - Successfully pre-loaded the ICONS table with data");
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
    // db.transaction(
    //     (tx) => {
    //         tx.executeSql("insert into items (done, value) values (0, ?)", [
    //             "Kitchen",
    //         ]);
    //         tx.executeSql("insert into items (done, value) values (0, ?)", [
    //             "School",
    //         ]);
    //         tx.executeSql("insert into items (done, value) values (0, ?)", [
    //             "Bedroom",
    //         ]);
    //         tx.executeSql("insert into items (done, value) values (0, ?)", [
    //             "Home",
    //         ]);
    //         tx.executeSql("insert into items (done, value) values (0, ?)", [
    //             "Bathroom",
    //         ]);
    //         tx.executeSql("insert into items (done, value) values (0, ?)", [
    //             "Homework",
    //         ]);
    //         tx.executeSql("insert into items (done, value) values (0, ?)", [
    //             "Pets",
    //         ]);
    //         tx.executeSql("insert into items (done, value) values (0, ?)", [
    //             "Good Behaviour",
    //         ]);
    //         tx.executeSql("insert into items (done, value) values (0, ?)", [
    //             "General",
    //         ]);
    //     },
    //     (t, error) => {
    //         console.log("db error insert Item");
    //         console.log(error);
    //         resolve();
    //     },
    //     (t, success) => {
    //         console.log(
    //             "db - Successfully pre-loaded the ITEMS table with data"
    //         );
    //         resolve(success);
    //     }
    // );

    // db.transaction(
    //     (tx) => {
    //         tx.executeSql(
    //             "insert into categories (category_name) values (?)",
    //             ["Kitchen"]
    //         );
    //         tx.executeSql(
    //             "insert into categories (category_name) values (?)",
    //             ["School"]
    //         );
    //         tx.executeSql(
    //             "insert into categories (category_name) values (?)",
    //             ["Bedroom"]
    //         );
    //         tx.executeSql(
    //             "insert into categories (category_name) values (?)",
    //             ["Home"]
    //         );
    //         tx.executeSql(
    //             "insert into categories (category_name) values (?)",
    //             ["Bathroom"]
    //         );
    //         tx.executeSql(
    //             "insert into categories (category_name) values (?)",
    //             ["Homework"]
    //         );
    //         tx.executeSql(
    //             "insert into categories (category_name) values (?)",
    //             ["Pets"]
    //         );
    //         tx.executeSql(
    //             "insert into categories (category_name) values (?)",
    //             ["Good Behaviour"]
    //         );
    //         tx.executeSql(
    //             "insert into categories (category_name) values (?)",
    //             ["General"]
    //         );
    //     },
    //     (t, error) => {
    //         console.log("db error on INSERT CATEGORIES");
    //         console.log(error);
    //         resolve();
    //     },
    //     (t, success) => {
    //         console.log(
    //             "db - Successfully pre-loaded the CATEGORIES table with data"
    //         );
    //         resolve(success);
    //     }
    // );
    // db.transaction(
    //     (tx) => {
    //         tx.executeSql(
    //             "insert into tasks (task_name, task_colour, task_icon, category_id) values (?,?,?,?)",
    //             ["Wash Dishes", "Red", "scale", 1]
    //         );
    //         tx.executeSql(
    //             "insert into tasks (task_name, task_colour, task_icon, category_id) values (?,?,?,?)",
    //             ["Dry Dishes", "Red", "scale", 1]
    //         );
    //         tx.executeSql(
    //             "insert into tasks (task_name, task_colour, task_icon, category_id) values (?,?,?,?)",
    //             ["Not late for School", "Green", "school", 2]
    //         );
    //         tx.executeSql(
    //             "insert into tasks (task_name, task_colour, task_icon, category_id) values (?,?,?,?)",
    //             ["Arrive home on time", "Green", "school", 2]
    //         );

    //         tx.executeSql(
    //             "insert into tasks (task_name, task_colour, task_icon, category_id) values (?,?,?,?)",
    //             ["Make Bed", "Blue", "bed-empty", 3]
    //         );
    //         tx.executeSql(
    //             "insert into tasks (task_name, task_colour, task_icon, category_id) values (?,?,?,?)",
    //             ["Tidy Room", "Blue", "bed-empty", 3]
    //         );
    //         tx.executeSql(
    //             "insert into tasks (task_name, task_colour, task_icon, category_id) values (?,?,?,?)",
    //             ["Floor tidy", "Blue", "bed-empty", 3]
    //         );

    //         tx.executeSql(
    //             "insert into tasks (task_name, task_colour, task_icon, category_id) values (?,?,?,?)",
    //             ["Put rubbish out", "Orange", "home", 4]
    //         );
    //         tx.executeSql(
    //             "insert into tasks (task_name, task_colour, task_icon, category_id) values (?,?,?,?)",
    //             ["Wash car", "Orange", "home", 4]
    //         );
    //         tx.executeSql(
    //             "insert into tasks (task_name, task_colour, task_icon, category_id) values (?,?,?,?)",
    //             ["Vacuum Floors", "Orange", "home", 4]
    //         );

    //         tx.executeSql(
    //             "insert into tasks (task_name, task_colour, task_icon, category_id) values (?,?,?,?)",
    //             ["Clean teeth", "Purple", "shower", 5]
    //         );
    //         tx.executeSql(
    //             "insert into tasks (task_name, task_colour, task_icon, category_id) values (?,?,?,?)",
    //             ["Wash hair", "Purple", "shower", 5]
    //         );

    //         tx.executeSql(
    //             "insert into tasks (task_name, task_colour, task_icon, category_id) values (?,?,?,?)",
    //             ["Do Homework", "Teal", "book-open-page-variant", 6]
    //         );
    //         tx.executeSql(
    //             "insert into tasks (task_name, task_colour, task_icon, category_id) values (?,?,?,?)",
    //             ["Read Book", "Teal", "book-open-page-variant", 6]
    //         );

    //         tx.executeSql(
    //             "insert into tasks (task_name, task_colour, task_icon, category_id) values (?,?,?,?)",
    //             ["Walk Dog", "Black", "dog", 7]
    //         );
    //         tx.executeSql(
    //             "insert into tasks (task_name, task_colour, task_icon, category_id) values (?,?,?,?)",
    //             ["Dry Dog", "Black", "dog", 7]
    //         );
    //     },
    //     (t, error) => {
    //         console.log("db error on INSERT TASKS");
    //         console.log(error);
    //         resolve();
    //     },
    //     (t, success) => {
    //         console.log(
    //             "db - Successfully pre-loaded the TASKS table with data"
    //         );
    //         resolve(success);
    //     }
    // );
    // db.transaction(
    //     (tx) => {
    //         tx.executeSql(
    //             "insert into rewards (reward_name, reward_points) values (?,?)",
    //             ["Play Console", 20]
    //         );
    //         tx.executeSql(
    //             "insert into rewards (reward_name, reward_points) values (?,?)",
    //             ["Go Karting", 220]
    //         );
    //     },
    //     (t, error) => {
    //         console.log("db error on INSERT REWARDFS");
    //         console.log(error);
    //         resolve();
    //     },
    //     (t, success) => {
    //         console.log(
    //             "db - Successfully pre-loaded the REWARDS table with data"
    //         );
    //         resolve(success);
    //     }
    // );
    //inserting two icons by default
    // db.transaction(
    //     (tx) => {
    //         tx.executeSql(
    //             "insert into icons (icon_name,background_color,label) values (?,?,?)",
    //             ["floor-lamp", "#fc5c65", "Furniture"]
    //         );
    //         tx.executeSql(
    //             "insert into icons (icon_name,background_color,label) values (?,?,?)",
    //             ["car", "#fd9644", "Cars"]
    //         );
    //         tx.executeSql(
    //             "insert into icons (icon_name,background_color,label) values (?,?,?)",
    //             ["camera", "#fed330", "Cameras"]
    //         );
    //         tx.executeSql(
    //             "insert into icons (icon_name,background_color,label) values (?,?,?)",
    //             ["cards", "#26de81", "Games"]
    //         );
    //         tx.executeSql(
    //             "insert into icons (icon_name,background_color,label) values (?,?,?)",
    //             ["shoe-heel", "#2bcbba", "Clothing"]
    //         );
    //         tx.executeSql(
    //             "insert into icons (icon_name,background_color,label) values (?,?,?)",
    //             ["basketball", "#45aaf2", "Sports"]
    //         );
    //         tx.executeSql(
    //             "insert into icons (icon_name,background_color,label) values (?,?,?)",
    //             ["headphones", "#4b7bec", "Movies & Music"]
    //         );
    //         tx.executeSql(
    //             "insert into icons (icon_name,background_color,label) values (?,?,?)",
    //             ["book-open-variant", "#a55eea", "Books"]
    //         );
    //         tx.executeSql(
    //             "insert into icons (icon_name,background_color,label) values (?,?,?)",
    //             ["application", "#2bcbba", "Other"]
    //         );
    //     },
    //     (t, error) => {
    //         console.log("db error on INSERT icon");
    //         console.log(error);
    //         resolve();
    //     },
    //     (t, success) => {
    //         console.log(
    //             "db - Successfully pre-loaded the ICONS table with data"
    //         );
    //         resolve(success);
    //     }
    // );
  });
};

export const database = {
  createTablesDatabaseAsync,
  loadDataIntoTablesAsync,
  dropDatabaseTablesAsync,
};
