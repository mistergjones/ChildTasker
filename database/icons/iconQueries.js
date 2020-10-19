// this module will establsh the SQLite database connection and provide simple queries to understand how this will be put together
import React from "react";

import * as SQLite from "expo-sqlite";
import { array } from "yup";

// open the database
const db = SQLite.openDatabase("db.db");

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

export const databaseIcons = {
  getIcons,
};
