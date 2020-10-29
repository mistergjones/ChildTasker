// this module will establsh the SQLite database connection and provide simple queries to understand how this will be put together
import React from "react";

import * as SQLite from "expo-sqlite";
import { array } from "yup";

// open the database
const db = SQLite.openDatabase("db.db");

/******* get all rewards */
const getRewards = async (setUserFunc) => {
  return new Promise(async (resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "select reward_id,reward_name,reward_points,rewards.icon_id,icons.icon_name from rewards,icons WHERE rewards.icon_id=icons.icon_id",
          [],
          (_, { rows: { _array } }) => {
            setUserFunc(_array);
          }
        );
      },
      (t, error) => {
        console.log("db error load tasks");
        console.log(error);
        reject(error);
      },
      (_t, _success) => {
        console.log("Retrieved Rewards");
        resolve(_success);
      }
    );
  });
};

/******* insert new reward */
const insertReward = async (
  reward,

  successFunc
) => {
  return new Promise(async (resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "insert into rewards (reward_name,reward_points,icon_id) values (?,?,?)",
          [reward.reward_name, reward.reward_points, Number(reward.icon_id)]
        );
      },
      (t, error) => {
        console.log("db error INSERT REWARD");
        console.log(error);
        reject(error);
      },
      (t, _success) => {
        console.log("REWARD insertion was successful");
        successFunc();
        resolve(_success);
      }
    );
  });
};

/******* delete reward */
const deleteReward = async (reward) => {
  return new Promise(async (resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql("DELETE FROM rewards WHERE reward_id=?", [reward]);
      },
      (t, error) => {
        console.log("db error DELETE REWARD");
        console.log(error);
        reject(error);
      },
      (t, _success) => {
        console.log("REWARD deletion was successful");
        resolve(_success);
      }
    );
  });
};

/******* Update reward */
const updateReward = (reward) => {
  console.log(reward);
  return new Promise(async (resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "update rewards set reward_name = ?, reward_points = ?, icon_id = ? where reward_id=?",
          [
            reward.reward_name,
            reward.reward_points,
            reward.icon_id,
            reward.reward_id,
          ]
        );
      },
      (t, error) => {
        console.log("db error Update REWARD");
        console.log(error);
        reject(error);
      },
      (t, _success) => {
        console.log("REWARD update was successful");
        resolve(_success);
      }
    );
  });
};

/******* get specific reward given a reward id */
const getRewardByID = async (reward_id, setUserFunc) => {
  // console.log("reward_id is: ", reward_id);
  return new Promise(async (resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "select reward_id,reward_name,reward_points,rewards.icon_id,icons.icon_name as icon,icons.label from rewards,icons WHERE rewards.icon_id=icons.icon_id and reward_id=?",
          [reward_id],
          (_, { rows: { _array } }) => {
            setUserFunc(_array);
            //console.log(_array);
          }
        );
      },
      (t, error) => {
        console.log("db error in try to obtain specific reward");
        console.log(error);
        reject(error);
      },
      (_t, _success) => {
        console.log("Retrieved Specific Reward");

        resolve(_success);
      }
    );
  });
};
export const databaseRewards = {
  getRewards,
  insertReward,
  deleteReward,
  updateReward,
  getRewardByID,
};
