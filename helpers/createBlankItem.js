// the purpose of this funtion is to create a "blank" icon object for the category picker to ensure that if there is an odd number of elements to be show,, it adds an item that will be "invisible" to touch.
// This will make sure that everything renders 2 columns nicely.
export const renderOddColumnsNicely = (itemList) => {
    // create a generic object that will be appended to the list to make the app Category Picker item always render 2 columns nicely.
    let tempObject = {
        backgroundColor: "_",
        icon: "usedToEnsureThatColumnsAreNeatlyAllignedIfThereisAnOddNumber",
        label: "",
        value: 999,
    };
    // console.log(tempObject);
    itemList.push(tempObject);
    // console.log(`################# RENDER ODD COLUMSN NICELY`);
    // console.log(itemList);

    return itemList;
};
