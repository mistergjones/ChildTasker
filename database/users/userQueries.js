// this module will establsh the SQLite database connection and provide simple queries to understand how this will be put together
import React from "react";

import * as SQLite from "expo-sqlite";
import { array } from "yup";

// open the database
const db = SQLite.openDatabase("db.db");

const getUsers = async (setUserFunc) => {
    return new Promise(async (resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "select * from users",
                    [],
                    (_, { rows: { _array } }) => {
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
                console.log("db error insert users");
                console.log(error);
                reject(error);
            },
            (_t, _success) => {
                console.log("insert users success" + _t);
                successFunc(user); //test
                resolve(_success);
            }
        );
    });
};

export const databaseUsers = {
    insertUser,
    getUsers,
    newUser,
    getKids,
    removeKid,
    updateKid,
};
