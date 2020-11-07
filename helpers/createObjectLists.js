import React from "react";

export const establishCategoryTasksListInObjectFormat = (itemObject) => {
    var finalisedList = [];

    // now loop through each item to obatin id and value and assign to an object. Push this object into the array
    for (
        var loopIterator = 0;
        loopIterator < itemObject.length;
        loopIterator++
    ) {
        var tempObject = {};
        tempObject.label = itemObject[loopIterator].category_name;
        tempObject.value = itemObject[loopIterator].category_id;
        tempObject.backgroundColor = itemObject[loopIterator].category_colour;
        tempObject.icon = itemObject[loopIterator].category_icon;
        finalisedList.push(tempObject);
    }

    return finalisedList;
};

export const establishTasksListInObjectFormat = (itemObject) => {
    var finalisedList = [];

    // now loop through each item to obatin id and value and assign to an object. Push this object into the array
    for (
        var loopIterator = 0;
        loopIterator < itemObject.length;
        loopIterator++
    ) {
        var tempObject = {};
        tempObject.label = tasks[loopIterator].task_name;
        tempObject.value = tasks[loopIterator].task_id;
        tempObject.backgroundColor = tasks[loopIterator].task_colour;
        tempObject.icon = tasks[loopIterator].task_icon;
        finalisedList.push(tempObject);
    }

    return finalisedList;
};

export const establishRewardListInObjectFormat = (rewards) => {
    var rewardList = [];

    // now loop through each item to obatin id and value and assign to an object. Push this object into the array
    for (var loopIterator = 0; loopIterator < rewards.length; loopIterator++) {
        var tempObject = {};
        tempObject.label =
            rewards[loopIterator].reward_name +
            " (" +
            rewards[loopIterator].reward_points +
            ")";
        tempObject.value = rewards[loopIterator].reward_id;
        tempObject.points = rewards[loopIterator].reward_points;
        tempObject.icon = rewards[loopIterator].reward_icon_name;
        tempObject.backgroundColor = "gold";
        rewardList.push(tempObject);
    }

    return rewardList;
};

export const establishKidListInObjectFormat = (kids) => {
    var kidList = [];
    // now loop through each item to obatin id and value and assign to an object. Push this object into the array

    for (var loopIterator = 0; loopIterator < kids.length; loopIterator++) {
        var tempObject = {};
        tempObject.label = kids[loopIterator].user_name;
        tempObject.value = kids[loopIterator].user_id;
        tempObject.icon = kids[loopIterator].icon;
        tempObject.uri = kids[loopIterator].uri;
        kidList.push(tempObject);
    }

    return kidList;
};

export const changeChoresToPieChartDataObject = (chores) => {
    var choreList = [];
    // now loop through each item to obatin id and value and assign to an object. Push this object into the array

    for (var loopIterator = 0; loopIterator < chores.length; loopIterator++) {
        var tempObject = {};
        tempObject.key = loopIterator;
        tempObject.id = chores[loopIterator].chore_id;
        tempObject.amount = chores[loopIterator].task_points;
        tempObject.taskName = chores[loopIterator].task_name;
        tempObject.icon = chores[loopIterator].icon_name;
        tempObject.svg =
            chores[loopIterator].is_completed === 1
                ? { fill: "#A42CD6" }
                : { fill: "#859C27" };
        choreList.push(tempObject);
    }

    return choreList;
};

export const establishIconListInObjectFormat = (itemObject) => {
    var finalisedList = [];

    // now loop through each item to obatin id and value and assign to an object. Push this object into the array
    for (
        var loopIterator = 0;
        loopIterator < itemObject.length;
        loopIterator++
    ) {
        var tempObject = {};
        tempObject.label = itemObject[loopIterator].label;
        tempObject.value = itemObject[loopIterator].icon_id;
        tempObject.background_color = itemObject[loopIterator].background_color;
        tempObject.icon = itemObject[loopIterator].icon_name;
        finalisedList.push(tempObject);
    }

    return finalisedList;
};
