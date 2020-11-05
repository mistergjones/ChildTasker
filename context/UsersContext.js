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
import { databaseAssignChoresToKid } from "../database/assignChoresToKid/assignChoresToKid";

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
    const [selectedReward, setSelectedReward] = useState();
    const [selectedRewardDetails, setSelectedRewardDetails] = useState();
    // USERS
    const [users, setUsers] = useState();
    // KiDS
    const [kids, setKids] = useState();
    // SPECIFICS (TASKS)
    const [specifics, setSpecificTasks] = useState();
    // Chores To Kid
    const [chores, setChores] = useState();

    const [choresForKid, setChoresForKid] = useState([]);

    const [choresForKidScore, setChoresForKidScore] = useState(0);

    const [choresTotalPoints, setChoresTotalPoints] = useState(0);

    //Icon
    const [icons, setIcons] = useState();
    const loadDataFromDB = async () => {};
    // We have a useEffect call to instantiate the users list from the database. We only call this function on the first render
    useEffect(() => {
        console.log("***** User Context ****");
        refreshItems();
        refreshCategories();
        refreshTasks();
        refreshRewards();
        refreshUsers();
        getKids();
        // //getSpecificTasksGlen();
        refreshIcons();
        refreshChores();
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
    const addNewCategory = async (userCategory) => {
        // return database.insertCategory(userCategory, refreshCategories);
        return databaseCategories.insertCategory(
            userCategory,
            refreshCategories
        );
    };
    // make a database call to retrieve all categories
    // In refreshItems we are sending the setItems function, which will allow the query to set our local state.
    const refreshCategories = async () => {
        // return database.getCategories(setCategories);
        return databaseCategories.getCategories(setCategories);
    };

    const removeCategory = async (category_id) => {
        await databaseCategories.removeCategory(category_id);
        await refreshCategories();
        return;
    };

    const updateCategory = async (category) => {
        await databaseCategories.updateCategory(category);
        await refreshCategories();
    };

    // END CATEGORIES
    //*************************************************************************
    //*************************************************************************
    // START TASKS
    // make a database call to insert a TASK and then call refreshItems to update the state
    const addNewTask = async (userTask) => {
        // return database.insertTask(userTask, refreshTasks);
        try {
            await databaseTasks.insertTask(userTask, refreshTasks);
            await getTasks();
            return;
        } catch (error) {
            console.log("error inserting task = " + error);
        }
    };

    const getTasks = async () => {
        return await databaseTasks.getTasks(setTasks);
    };

    // make a database call to retrieve all tasks
    // In refreshItems we are sending the setItems function, which will allow the query to set our local state.
    const refreshTasks = async () => {
        // return database.getTasks(setTasks);
        console.log("DOES THIS EVER WORK - refresh TASKS");
        return await databaseTasks.getTasks(setTasks);
    };

    const removeTask = async (task_id) => {
        await databaseTasks.removeTask(task_id);
        await refreshTasks();

        return;
    };

    const updateTask = async (task) => {
        await databaseTasks.updateTask(task);

        await refreshTasks();

        return;
    };

    // GJ - 20/10 - Added teh below.
    //*************************************************************************
    // START CHORES TO KID
    // make a database call to insert a chore  and then call refreshChores to update the state
    const addChoresToKid = async (kidChores) => {
        return databaseAssignChoresToKid.insertChoresToKid(
            kidChores,
            refreshChores
        );
    };
    // make a database call to retrieve all Chores
    // In refreshChores we are sending the setChores function, which will allow the query to set our local state.
    const refreshChores = async () => {
        return databaseAssignChoresToKid.getChores(setChores);
    };
    // END CHORES TO KID
    const getChoresForKid = async (kid_name) => {
        console.log("getChoresForKid ", kid_name);
        return await databaseAssignChoresToKid.getChoresByKidName(
            kid_name,
            setChoresForKid,
            setChoresForKidScore,
            setChoresTotalPoints
        );
    };

    const updateChoresForKid = async (kid_name, task_id) => {
        await databaseAssignChoresToKid.updateChoresByKidName(
            kid_name,
            task_id
        );
        await getChoresForKid(kid_name);
        return;
    };
    //*************************************************************************

    //*************************************************************************
    // START REWARDS
    // make a database call to insert a reward and then call refreshRewardsto update the state
    const addNewReward = async (userReward) => {
        return await databaseRewards.insertReward(userReward, refreshRewards);
    };
    // make a database call to retrieve all rewards
    // In refreshAwards we are sending the setRewards function, which will allow the query to set our local state.
    const refreshRewards = async () => {
        //return database.getRewards(setRewards);
        console.log("reached refresh reward");
        return await databaseRewards.getRewards(setRewards);
    };
    const updateReward = async (reward) => {
        await databaseRewards.updateReward(reward);
        await refreshRewards();
        await databaseRewards.getRewards(setRewards);
        return;
    };
    const deleteReward = async (userReward) => {
        await databaseRewards.deleteReward(userReward);
        // await refreshRewards();
        await databaseRewards.getRewards(setRewards);
        return;
    };
    const getRewardByID = async (id) => {
        return await databaseRewards.getRewardByID(
            id,
            setSelectedRewardDetails
        );
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
    const refreshIcons = async () => {
        //return database.getIcons(setIcons);
        return databaseIcons.getIcons(setIcons);
    };
    // END ICON
    //*************************************************************************

    const addNewUser = async (user) => {
        //await database.insertUser(user, refreshUsers);
        try {
            await databaseUsers.insertUser(user, refreshUsers);
            await getKids();
            return;
        } catch (error) {
            console.log("error add new user = " + error);
        }
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

    const getKids = async () => {
        //return await database.getKids(setKids);
        return await databaseUsers.getKids(setKids);
    };

    const removeKid = async (userId) => {
        // await database.removeKid(userId);
        await databaseUsers.removeKid(userId);
        await getKids();
        await databaseUsers.getUsers(setUsers);
        return;
    };

    const updateKid = async (kid) => {
        //await database.updateKid(kid);
        await databaseUsers.updateKid(kid);
        await getKids();
        await databaseUsers.getUsers(setUsers);
    };
    // Make the context object:
    const usersContext = {
        items,
        addNewItem,
        // categories
        addNewCategory,
        categories,
        removeCategory,
        updateCategory,
        // TASKS
        addNewTask,
        tasks,
        removeTask,
        updateTask,
        // Rewards
        addNewReward,
        deleteReward,
        rewards,
        selectedReward,
        setSelectedReward,
        updateReward,
        getRewardByID,
        selectedRewardDetails,
        setSelectedRewardDetails,
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
        //Chores for the kids
        addChoresToKid,
        chores,
        choresForKid,
        getChoresForKid,
        setChoresForKid,
        updateChoresForKid,
        choresForKidScore,
        choresTotalPoints,
    };
    // pass the value in provider and return
    return (
        <UsersContext.Provider value={usersContext}>
            {children}
        </UsersContext.Provider>
    );
};
