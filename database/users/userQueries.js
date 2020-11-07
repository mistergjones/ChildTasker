// this module will establsh the SQLite database connection and provide simple queries to understand how this will be put together
import React from "react";

import * as SQLite from "expo-sqlite";
import { array } from "yup";

// open the database
const db = SQLite.openDatabase("db.db");

const getUsers = async (setUserFunc) => {
    console.log("+++++get users")
    return new Promise(async (resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "select * from users",
                    [],
                    (_, { rows: { _array } }) => {
                        _array.map(a => console.log("uri for " + a.user_name + " is " + a.uri))
                        console.log("_array" + _array.length);
                        setUserFunc(_array);
                    }
                );
            },
            (t, error) => {
                console.log("db error load users");
                console.log(error);
                reject(error);
            },
            (_t, _success) => {
                console.log("Retrieved Users");
                resolve(_success);
            }
        );
    });
};

const getKids = async (setUserFunc) => {
    return new Promise(async (resolve, reject) => {
        console.log("getKids begining")
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
                console.log("Retrieved Kids");
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
                console.log("Removed Kid");
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
                console.log("Updated Kid");
                resolve(_success);
            }
        );
    });
};

const addUserAvatar = async (userId, uri, icon) => {
    console.log("user = ", userId + " uri = " + uri + "icon = " + icon);
    return new Promise(async (resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "update users set uri = ? , icon = ? where user_id = ?",
                    [uri, icon, userId]

                );
            },
            (t, error) => {
                console.log("db error set avatar");
                console.log(error);
                reject(error);
            },
            (_t, _success) => {
                console.log("Updated user avatar");
                resolve(_success);
            }
        );
    });
};


const newUser = async (userName) => {
    console.log("username in newUser" + userName)
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
                console.log("Retrieved New User");
                resolve(results.length > 0 ? false : true);
            }
        );
    });
};

const insertUser = async (user, successFunc) => {
    console.log("insert user username = " + user.username + "parent = " + user.isParent)
    return new Promise(async (resolve, reject) => {
        try {

            db.transaction(
                (tx) => {
                    console.log("insertUser" + user.username);
                    const a = tx.executeSql(
                        `insert into users (user_name, password, is_parent) values ( ? , ? , ?)`,
                        [user.username, user.password, user.isParent ? 1 : 0]
                    );
                    console.log(a);
                },
                (t, error) => {
                    console.log("db error insert users");
                    console.log(error);
                    reject(error);
                },
                (_t, _success) => {
                    console.log("Inserted New User");
                    successFunc(user); //test
                    resolve(_success);
                }
            );
        } catch (error) {
            console.log("db insert = " + error)
        }

    });
};

export const databaseUsers = {
    insertUser,
    getUsers,
    newUser,
    getKids,
    removeKid,
    updateKid,
    addUserAvatar,
};
