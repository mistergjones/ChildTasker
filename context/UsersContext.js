// force the state to clear with fast refresh in Expo
// @refresh reset
// GJ

import React, { useEffect, createContext, useState } from "react";
import { database } from "../components/database.js";

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

    // TASKS
    const [rewards, setRewards] = useState();

    const [users, setUsers] = useState();

    const [kids, setKids] = useState();
    // We have a useEffect call to instantiate the users list from the database. We only call this function on the first render
    useEffect(() => {
        refreshItems();
        refreshCategories();
        refreshTasks();
        refreshRewards();
        refreshUsers();
        getkids();
    }, []);

    // make a database call to insert an item and then call refreshItems to update the state
    const addNewItem = (userItem) => {
        return database.insertItem(userItem, refreshItems);
    };

    // make a database call to get the users
    // In refreshItems we are sending the setItems function, which will allow the query to set our local state.
    const refreshItems = () => {
        return database.getItems(setItems);
    };

    //*************************************************************************
    // START CATEGORIES
    // make a database call to insert an item and then call refreshItems to update the state
    const addNewCategory = (userCategory) => {
        return database.insertCategory(userCategory, refreshCategories);
    };

    // make a database call to retrieve all categories
    // In refreshItems we are sending the setItems function, which will allow the query to set our local state.
    const refreshCategories = () => {
        return database.getCategories(setCategories);
    };

    // END CATEGORIES
    //*************************************************************************

    //*************************************************************************
    // START TASKS
    // make a database call to insert a TASK and then call refreshItems to update the state
    const addNewTask = (userTask) => {
        return database.insertTask(userTask, refreshTasks);
    };

    // make a database call to retrieve all tasks
    // In refreshItems we are sending the setItems function, which will allow the query to set our local state.
    const refreshTasks = () => {
        return database.getTasks(setTasks);
    };

    // END TASKS
    //*************************************************************************

    //*************************************************************************
    // START REWARDS
    // make a database call to insert a TASK and then call refreshItems to update the state
    const addNewReward = (userReward) => {
        return database.insertTask(userReward, refreshRewards);
    };

    // make a database call to retrieve all tasks
    // In refreshItems we are sending the setItems function, which will allow the query to set our local state.
    const refreshRewards = () => {
        return database.getRewards(setRewards);
    };

    // END REWARDS
    //*************************************************************************

    const addNewUser = async (user) => {
        await database.insertUser(user, refreshUsers);
        await getkids();
        return;
    };

    const refreshUsers = async () => {
        return await database.getUsers(setUsers);
    };

    const checkIfNewUser = async (userName) => {
        console.log("Check if new user");
        const result = await database.newUser(userName);
        console.log("result = ", result);
        return result;
    };

    const getkids = async () => {
        return await database.getKids(setKids);
    };

    const removeKid = async (userId) => {
        await database.removeKid(userId);
        await getkids();
        return;
    };

    const updateKid = async (kid) => {
        await database.updateKid(kid);
        await getkids();
    };
    // Make the context object:
    const usersContext = {
        items,
        addNewItem,

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
    };

    // pass the value in provider and return
    return (
        <UsersContext.Provider value={usersContext}>
            {children}
        </UsersContext.Provider>
    );
};
