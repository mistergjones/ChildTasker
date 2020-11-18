import React from "react";
import AsyncStorage from "@react-native-community/async-storage";

const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        // saving error
    }
};

const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);

        if (value !== null) {
            // value previously stored
        }
        // console.log("Value = ", value);
        return value;
    } catch (e) {
        // error reading value
    }
};

const removeValue = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        // remove error
        // console.log("error remove value = ", e);
    }

    // console.log("Done.");
};

const getIsLoaded = async (key) => {
    await removeValue(key);
    const loaded = await getData(key);
    if (loaded) {
        // console.log("loaded = ", loaded);
        return false;
    } else {
        // console.log("first load = ", key);
        await storeData(key, `${key} is loaded`);
        return true;
    }
};
module.exports = {
    storeData,
    getData,
    removeValue,
    getIsLoaded,
};
