// force the state to clear with fast refresh in Expo
// @refresh reset
// GJ
import React, { useEffect, createContext, useState } from "react";

// OLD REFERENCE
// import { database } from "../components/database.js";

// NEW REFERENCE
import { database } from "../database/database/establishDatabase";
import { databaseItems } from "../database/items/itemQueries";
import { databaseCategories } from "../database/categories/categoryQueries";
import { databaseTasks } from "../database/tasks/taskQueries";
import { databaseIcons } from "../database/icons/iconQueries";
import { databaseRewards } from "../database/rewards/rewardQueries";
import { databaseUsers } from "../database/users/userQueries";

// Creates a Context object.
export const UsersContext = createContext({});
// We are set up to take an initial state through props when we create the UsersContextProvider, but those values are quickly overwritten with the useEffect call. I left the code here for reference.
export const UsersContextProvider = (props) => {
    // Initial values are obtained from the props
    // const { users: initialUsers, children } = props;
    const { children } = props;
    // Use State to store the values
    // const [users, setItems] = useState(initialUsers);
    const [items, setItems] = useState();
    // CATEGORIES
    const [categories, setCategories] = useState();
    // TASKS
    const [tasks, setTasks] = useState();
    // REWARDS
    const [rewards, setRewards] = useState();
    // USERS
    const [users, setUsers] = useState();
    // KiDS
    const [kids, setKids] = useState();
    // SPECIFICS (TASKS)
    const [specifics, setSpecificTasks] = useState();

    //Icon
    const [icons, setIcons] = useState();

    // We have a useEffect call to instantiate the users list from the database. We only call this function on the first render
    useEffect(() => {
        refreshItems();
        refreshCategories();
        refreshTasks();
        refreshRewards();
        refreshUsers();
        getkids();
        // //getSpecificTasksGlen();
        refreshIcons();
    }, []);
    // make a database call to insert an item and then call refreshItems to update the state
    const addNewItem = async (userItem) => {
        // return database.insertItem(userItem, refreshItems);
        return await databaseItems.insertItem(userItem, refreshItems);
    };
    // make a database call to get the users
    // In refreshItems we are sending the setItems function, which will allow the query to set our local state.
    const refreshItems = async () => {
        console.log("Refresh items is  being execurted");
        // return database.getItems(setItems);
        const result = await databaseItems.getItems(setItems);

        console.log("Refresh items is  being EXECUTRED");
        return result;
    };
    //*************************************************************************
    // START CATEGORIES
    // make a database call to insert an item and then call refreshItems to update the state
    const addNewCategory = (userCategory) => {
        // return database.insertCategory(userCategory, refreshCategories);
        return databaseCategories.insertCategory(
            userCategory,
            refreshCategories
        );
    };
    // make a database call to retrieve all categories
    // In refreshItems we are sending the setItems function, which will allow the query to set our local state.
    const refreshCategories = () => {
        // return database.getCategories(setCategories);
        return databaseCategories.getCategories(setCategories);
    };
    // END CATEGORIES
    //*************************************************************************
    //*************************************************************************
    // START TASKS
    // make a database call to insert a TASK and then call refreshItems to update the state
    const addNewTask = (userTask) => {
        // return database.insertTask(userTask, refreshTasks);
        return databaseTasks.insertTask(userTask, refreshTasks);
    };
    // make a database call to retrieve all tasks
    // In refreshItems we are sending the setItems function, which will allow the query to set our local state.
    const refreshTasks = () => {
        // return database.getTasks(setTasks);
        return databaseTasks.getTasks(setTasks);
    };
    // END TASKS
    //*************************************************************************
    //*************************************************************************
    // START REWARDS
    // make a database call to insert a reward and then call refreshRewardsto update the state
    const addNewReward = (userReward) => {
        // return database.insertTask(userReward, refreshRewards);
        // return databaseRewards.insertTask(userReward, refreshRewards);
    };
    // make a database call to retrieve all rewards
    // In refreshAwards we are sending the setRewards function, which will allow the query to set our local state.
    const refreshRewards = () => {
        //return database.getRewards(setRewards);
        return databaseRewards.getRewards(setRewards);
    };
    // END REWARDS
    //*************************************************************************

    //*************************************************************************
    // START GET SPECIFIC TASK

    const getSpecificTasksGlen = async (taskID) => {
        console.log("getSpecificTasksGlen IS BEING RUN");
        // return await database.getSpecficTasks(taskID, setSpecificTasks);
        return await databaseTasks.getSpecficTasks(taskID, setSpecificTasks);
    };

    // END SPECIFIC  TASKS
    //*************************************************************************
    //added by Shailesh
    //*************************************************************************
    // In refreshIcons we are sending the setIcons function, which will allow the query to set our local state.
    const refreshIcons = () => {
        //return database.getIcons(setIcons);
        return databaseIcons.getIcons(setIcons);
    };
    // END ICON
    //*************************************************************************

    const addNewUser = async (user) => {
        //await database.insertUser(user, refreshUsers);
        await databaseUsers.insertUser(user, refreshUsers);
        await getkids();
        return;
    };

    const refreshUsers = async () => {
        //return await database.getUsers(setUsers);
        return await databaseUsers.getUsers(setUsers);
    };

    const checkIfNewUser = async (userName) => {
        console.log("Check if new user");
        //const result = await database.newUser(userName);
        const result = await databaseUsers.newUser(userName);
        console.log("result = ", result);
        return result;
    };

    const getkids = async () => {
        //return await database.getKids(setKids);
        return await databaseUsers.getKids(setKids);
    };

    const removeKid = async (userId) => {
        // await database.removeKid(userId);
        await databaseUsers.removeKid(userId);
        await getkids();
        await databaseUsers.getUsers(setUsers);
        return;
    };

    const updateKid = async (kid) => {
        //await database.updateKid(kid);
        await databaseUsers.updateKid(kid);
        await getkids();
        await databaseUsers.getUsers(setUsers);
    };
    // Make the context object:
    const usersContext = {
        items,
        addNewItem,
        // categories
        addNewCategory,
        categories,
        // TASKS
        addNewTask,
        tasks,
        // Rewards
        addNewReward,
        rewards,
        addNewUser,
        users,
        setUsers,
        checkIfNewUser,
        kids,
        removeKid,
        updateKid,
        // refreshTasks to see it work again
        refreshTasks,
        // specific task
        getSpecificTasksGlen,
        specifics,
        //setSpecificTasks,
        icons,
    };
    // pass the value in provider and return
    return (
        <UsersContext.Provider value={usersContext}>
            {children}
        </UsersContext.Provider>
    );
};
