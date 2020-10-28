// now loop through each item to obatin id and value and assign to an object. Push this object into the array
for (var loopIterator = 0; loopIterator < categories.length; loopIterator++) {
    var tempObject = {};
    tempObject.label = categories[loopIterator].category_name;
    tempObject.value = categories[loopIterator].category_id;
    tempObject.backgroundColor = categories[loopIterator].category_colour;
    tempObject.icon = categories[loopIterator].category_icon;
    categoryList.push(tempObject);
}

// now loop through each item to obatin id and value and assign to an object. Push this object into the array
for (var loopIterator = 0; loopIterator < tasks.length; loopIterator++) {
    var tempObject = {};
    tempObject.label = tasks[loopIterator].task_name;

    tempObject.value = tasks[loopIterator].task_id;
    tempObject.points = tasks[loopIterator].task_points;
    tempObject.backgroundColor = tasks[loopIterator].task_colour;
    tempObject.icon = tasks[loopIterator].task_icon;
    taskList.push(tempObject);
}

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
    tempObject.icon = "trophy";
    tempObject.backgroundColor = "gold";
    rewardList.push(tempObject);
}

// now loop through each item to obatin id and value and assign to an object. Push this object into the array

for (var loopIterator = 0; loopIterator < kids.length; loopIterator++) {
    var tempObject = {};
    tempObject.label = kids[loopIterator].user_name;
    tempObject.value = kids[loopIterator].user_id;

    kidList.push(tempObject);
}

// This effect is used that when a category is selected and retrieves teh specific tasks, it makes sure that the correct number of columns in show.
// useEffect(() => {
//     if (specifics != undefined || specifics != null) {
//         if (pickableTasks.length % 2 === 0) {
//             setNumberOfSpecificTaskColumns(2);
//         } else {
//             setNumberOfSpecificTaskColumns(2);
//         }
//     }
// }, [pickableTasks]);
