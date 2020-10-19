// When the app starts up, we want to set up the database tables if they haven’t already been setup, and insert some initial data.
// We are using hooks because of functional compoents

// force the state to clear with fast refresh in Expo
// @refresh reset
import React, { useEffect } from "react";

// REFRENCE TO OLD WAY TO CONNECT TO DATABASE
// import { database } from "../components/database";

// NEW WAY TO CONNECT TO DATABASE
import { database } from "../database/database/establishDatabase";

export default function useDatabase() {
  // set a state to indicate if the datbase load is complete
  const [isDBLoadingComplete, setDBLoadingComplete] = React.useState(false);

  // On first render (hence ,[]) below, we use 'useEffect' to kickstart it when the component is loaded
  useEffect(() => {
    async function loadDataAsync() {
      try {
        // move through each database call sequentially
        // await database.dropDatabaseTablesAsync();
        // await database.setupDatabaseAsync();
        // await database.setupUsersAsync();

        // the below is to test the better way in working with a database
        //  await database.dropDatabaseTablesAsync();
        await database.createTablesDatabaseAsync();
        await database.loadDataIntoTablesAsync();

        // if the above is all good, update the STATE
        setDBLoadingComplete(true);
      } catch (e) {
        console.warn("Error in establishing the database", e);
      }
    }
    // call the function to establish the database
    loadDataAsync();
  }, []);

  // return a boolean to indicate the database is ready
  return isDBLoadingComplete;
}
