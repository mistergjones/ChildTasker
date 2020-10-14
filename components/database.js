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
      tx.executeSql(
        "drop table icons",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          console.log("error dropping icons");
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
          "create table if not exists users (user_id integer primary key not null, user_name TEXT not null, password TEXT not null, is_parent integer)"
        );
        //table for storing icons for categories; created by Shailesh
        tx.executeSql(
          "create table if not exists icons (icon_id integer primary key not null, icon_name TEXT not null)"
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
  console.log("AM I BEING CALLED HERE");
  db.transaction(
    (tx) => {
      tx.executeSql("select * from items", [], (_, { rows: { _array } }) => {
        setUserFunc(_array);
      });
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
      tx.executeSql("select * from tasks", [], (_, { rows: { _array } }) => {
        setUserFunc(_array);
      });
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

/******* get specific tasks given a category id */
const getRewards = (setUserFunc) => {
  db.transaction(
    (tx) => {
      tx.executeSql("select * from rewards", [], (_, { rows: { _array } }) => {
        setUserFunc(_array);
      });
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

/******* get all icons */
const getIcons = (setUserFunc) => {
  db.transaction(
    (tx) => {
      tx.executeSql("select * from icons", [], (_, { rows: { _array } }) => {
        setUserFunc(_array);
      });
    },
    (t, error) => {
      console.log("db error load tasks");
      console.log(error);
    },
    (_t, _success) => {
      console.log("Retrieved Icons");
    }
  );
};

// inserst a ITEM into the table
// we pass in a successFunc that will be called after the insert has happened. In our case, we are passing in the function to refresh the items from the database. This way we know that our state will reflect what is in the database.
const insertItem = (item, successFunc) => {
  db.transaction(
    (tx) => {
      tx.executeSql("insert into items (done,value) values (0,?)", [item]);
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

const getUsers = async (setUserFunc) => {
  return new Promise(async (resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql("select * from users", [], (_, { rows: { _array } }) => {
          console.log("_array" + _array.length);
          setUserFunc(_array);
        });
      },
      (t, error) => {
        console.log("db error load users");
        console.log(error);
        reject(error);
      },
      (_t, _success) => {
        console.log("loaded users" + _t);
        resolve(_success);
      }
    );
  });
};

const getKids = async (setUserFunc) => {
  return new Promise(async (resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "select * from users where is_parent = 0",
          [],
          (_, { rows: { _array } }) => {
            console.log("_array" + _array.length);
            setUserFunc(_array);
          }
        );
      },
      (t, error) => {
        console.log("db error load kids");
        console.log(error);
        reject(error);
      },
      (_t, _success) => {
        console.log("loaded kids" + _t);
        resolve(_success);
      }
    );
  });
};

const removeKid = async (userId) => {
  console.log("****userId = ", userId);
  return new Promise(async (resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "delete from users where user_id = ?",
          [userId],
          (_, { rows: { _array } }) => {
            console.log("_array" + _array.length);
            // setUserFunc(_array);
          }
        );
      },
      (t, error) => {
        console.log("db error remove kids");
        console.log(error);
        reject(error);
      },
      (_t, _success) => {
        console.log("removed kid" + _t);
        resolve(_success);
      }
    );
  });
};

const updateKid = async (kid) => {
  console.log("Kid = ", kid.password, kid.userId, kid.userName);
  return new Promise(async (resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "update users set user_name = ? ,  password = ?  where user_id = ?",
          [kid.userName, kid.password, kid.userId]
        );
      },
      (t, error) => {
        console.log("db error update kids");
        console.log(error);
        reject(error);
      },
      (_t, _success) => {
        console.log("updated kid");
        resolve(_success);
      }
    );
  });
};

const newUser = async (userName) => {
  return new Promise(async (resolve, reject) => {
    let results = [];
    db.transaction(
      (tx) => {
        tx.executeSql(
          "select * from users where user_name = ?",
          [userName],
          (_, { rows: { _array } }) => {
            console.log("Hello") + _array.length;
            results = _array;
          }
        );
      },
      (t, error) => {
        console.log("db error reading users");
        console.log(error);
        reject(results);
      },
      (_t, _success) => {
        console.log("loaded users" + _t);
        resolve(results.length > 0 ? false : true);
      }
    );
  });
};

const insertUser = async (user, successFunc) => {
  return new Promise(async (resolve, reject) => {
    db.transaction(
      (tx) => {
        console.log("insertUser" + user.username);
        const a = tx.executeSql(
          "insert into users (user_name, is_parent, password) values (?,?,?)",
          [user.username, user.isParent ? 1 : 0, user.password]
        );
        console.log(a);
      },
      (t, error) => {
        console.log("db error insertUser");
        console.log(error);
        reject(error);
      },
      (t, success) => {
        console.log("t =" + t);
        successFunc(user);
        resolve(success);
      }
    );
  });
};

// insert an ITEM AND CATEGORIES to populate at least with one item
const setupUsersAsync = async () => {
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
        tx.executeSql("insert into categories (category_name) values (?)", [
          "Kitchen",
        ]);
        tx.executeSql("insert into categories (category_name) values (?)", [
          "School",
        ]);
        tx.executeSql("insert into categories (category_name) values (?)", [
          "Bedroom",
        ]);
        tx.executeSql("insert into categories (category_name) values (?)", [
          "Home",
        ]);
        tx.executeSql("insert into categories (category_name) values (?)", [
          "Bathroom",
        ]);
        tx.executeSql("insert into categories (category_name) values (?)", [
          "Homework",
        ]);
        tx.executeSql("insert into categories (category_name) values (?)", [
          "Pets",
        ]);
        tx.executeSql("insert into categories (category_name) values (?)", [
          "Good Behaviour",
        ]);
        tx.executeSql("insert into categories (category_name) values (?)", [
          "General",
        ]);
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
          ["Wash Dishes", "Red", "scale", 1]
        );
        tx.executeSql(
          "insert into tasks (task_name, task_colour, task_icon, category_id) values (?,?,?,?)",
          ["Dry Dishes", "Red", "scale", 1]
        );
        tx.executeSql(
          "insert into tasks (task_name, task_colour, task_icon, category_id) values (?,?,?,?)",
          ["Not late for School", "Green", "school", 2]
        );
        tx.executeSql(
          "insert into tasks (task_name, task_colour, task_icon, category_id) values (?,?,?,?)",
          ["Arrive home on time", "Green", "school", 2]
        );

        tx.executeSql(
          "insert into tasks (task_name, task_colour, task_icon, category_id) values (?,?,?,?)",
          ["Make Bed", "Blue", "bed-empty", 3]
        );
        tx.executeSql(
          "insert into tasks (task_name, task_colour, task_icon, category_id) values (?,?,?,?)",
          ["Tidy Room", "Blue", "bed-empty", 3]
        );
        tx.executeSql(
          "insert into tasks (task_name, task_colour, task_icon, category_id) values (?,?,?,?)",
          ["Floor tidy", "Blue", "bed-empty", 3]
        );

        tx.executeSql(
          "insert into tasks (task_name, task_colour, task_icon, category_id) values (?,?,?,?)",
          ["Put rubbish out", "Orange", "home", 4]
        );
        tx.executeSql(
          "insert into tasks (task_name, task_colour, task_icon, category_id) values (?,?,?,?)",
          ["Wash car", "Orange", "home", 4]
        );
        tx.executeSql(
          "insert into tasks (task_name, task_colour, task_icon, category_id) values (?,?,?,?)",
          ["Vacuum Floors", "Orange", "home", 4]
        );

        tx.executeSql(
          "insert into tasks (task_name, task_colour, task_icon, category_id) values (?,?,?,?)",
          ["Clean teeth", "Purple", "shower", 5]
        );
        tx.executeSql(
          "insert into tasks (task_name, task_colour, task_icon, category_id) values (?,?,?,?)",
          ["Wash hair", "Purple", "shower", 5]
        );

        tx.executeSql(
          "insert into tasks (task_name, task_colour, task_icon, category_id) values (?,?,?,?)",
          ["Do Homework", "Teal", "book-open-page-variant", 6]
        );
        tx.executeSql(
          "insert into tasks (task_name, task_colour, task_icon, category_id) values (?,?,?,?)",
          ["Read Book", "Teal", "book-open-page-variant", 6]
        );

        tx.executeSql(
          "insert into tasks (task_name, task_colour, task_icon, category_id) values (?,?,?,?)",
          ["Walk Dog", "Black", "dog", 7]
        );
        tx.executeSql(
          "insert into tasks (task_name, task_colour, task_icon, category_id) values (?,?,?,?)",
          ["Dry Dog", "Black", "dog", 7]
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

    //added by shailesh
    db.transaction(
      (tx) => {
        tx.executeSql("insert into icons (icon_name) values (?)", ["car"]);
        tx.executeSql("insert into icons (icon_name) values (?)", [
          "floor-lamp",
        ]);
      },
      (t, error) => {
        console.log("db error on INSERT icon");
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

  insertUser,
  getUsers,
  newUser,
  getKids,
  removeKid,
  updateKid,
  getIcons,
};
