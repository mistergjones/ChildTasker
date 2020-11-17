import { Alert } from "react-native";

export const checkForDuplicateCategoryName = (
    categoryObject,
    formik_category_name
) => {
    for (var i = 0; i < categoryObject.length; i++) {
        if (
            categoryObject[i].category_name.toLowerCase() ===
            formik_category_name.toLowerCase()
        ) {
            Alert.alert(
                "Cannot Submit Changes",
                "An existing Category name exists. Please try again.",
                [
                    {
                        text: "Close",
                        onPress: () => {
                            // console.log("Cancel Pressed")
                        },
                        style: "cancel",
                    },
                ],
                { cancelable: false }
            );
            return true;
        }
    }
};
