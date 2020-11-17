import { Alert } from "react-native";

export const checkForDuplicatesTasknamesAndTaskPoints = (
    taskObject,
    formik_task_name,
    formik_task_points
) => {
    for (var i = 0; i < taskObject.length; i++) {
        if (
            taskObject[i].task_name.toLowerCase() ===
                formik_task_name.toLowerCase() &&
            taskObject[i].task_points == formik_task_points
        ) {
            Alert.alert(
                "Cannot Submit Changes",
                "An existing task with the same points already exist. Please try again.",
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
