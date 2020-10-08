// force the state to clear with fast refresh in Expo
// @refresh reset

import React, { useEffect, createContext, useState } from "react";
import { database } from "../components/database";

export const UsersContext = createContext({});

export const UsersContextProvider = (props) => {
    // Initial values are obtained from the props
    const { users: initialUsers, children } = props;

    // Use State to store the values
    const [users, setUsers] = useState(initialUsers);

    useEffect(() => {
        refreshUsers();
    }, []);

    // make a database callto insert a user and then call refreshUsers to update the state
    const addNewUser = (userName) => {
        return database.insertUser(userName, refreshUsers);
    };

    // make a database call to get the users
    const refreshUsers = () => {
        return database.getUsers(setUsers);
    };

    // Make the context object:
    const usersContext = {
        users,
        addNewUser,
    };

    // pass the value in provider and return
    return (
        <UsersContext.Provider value={usersContext}>
            {children}
        </UsersContext.Provider>
    );
};
