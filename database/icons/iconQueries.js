// this module will establsh the SQLite database connection and provide simple queries to understand how this will be put together
import React from "react";

import * as SQLite from "expo-sqlite";
import { array } from "yup";

// open the database
const db = SQLite.openDatabase("db.db");

//get all icons
const getIcons = (setUserFunc) => {
  console.log("reached getIcons");
  db.transaction(
    (tx) => {
      tx.executeSql("select * from icons", [], (_, { rows: { _array } }) => {
        setUserFunc(_array);
      });
    },
    (t, error) => {
      console.log("db error load Icons");
      console.log(error);
    },
    (_t, _success) => {
      console.log("Retrieved Icons");
    }
  );
};

/******* get specific icon given icon id */
const getSpecficIcon = async (icon_id, setUserFunc) => {
  console.log("TASK ID IS: ", icon_id);
  return new Promise(async (resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "select * from icons where icon_id = ?",
          [icon_id],
          (_, { rows: { _array } }) => {
            setUserFunc(_array);
            //console.log(_array);
          }
        );
      },
      (t, error) => {
        console.log("db error in try to obtain getSpecific icon");
        console.log(error);
        reject(error);
      },
      (_t, _success) => {
        console.log("Retrieved Specific icon");

        resolve(_success);
      }
    );
  });
};

export const databaseIcons = {
  getIcons,
  getSpecficIcon,
};
