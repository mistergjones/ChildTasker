import React from "react";
import { SafeAreaView, View } from "react-native";
import ParentDashBoardScreen from "./screens/ParentDashBoardScreen";
import ParentChildDashBoardScreen from "./screens/parent/manageChild/ParentChildDashBoardScreen";
import ManageRewardsScreen from "./screens/parent/manageReward/ManageRewardsScreen.js";
import TrackPocketMoneyScreen from "./screens/parent/managePocketMoney/TrackPocketMoneyScreen";
import CreateTaskListForChildScreen from "./screens/parent/createTasks/CreateTaskListForChildScreen";
import SelectATaskForChildScreen from "./screens/parent/createTasks/SelectATaskForChildScreen";
import AddTaskToCategoryScreen from "./screens/parent/manageCategories/AddTaskToCategoryScreen";
import AddCategoryScreen from "./screens/parent/manageCategories/AddCategoryScreen";
import AddNewChildScreen from "./screens/parent/manageChild/AddNewChildScreen";
import EditChildScreen from "./screens/parent/manageChild/EditChildScreen";
import RemoveChildScreen from "./screens/parent/manageChild/RemoveChildScreen.js";
import LoginScreen from "./screens/login/LoginScreen";
import AddReward from "./screens/parent/manageReward/AddReward";

const App = () => {
  // return (
  //     <SafeAreaView>
  //         {/* <ParentDashBoardScreen /> */}
  //         {/* <ParentChildDashBoardScreen /> */}
  //         {/* <ManageRewardsScreen /> */}
  //         {/* {<TrackPocketMoneyScreen />} */}
  //         {/* <CreateTaskListForChildScreen /> */}
  //         {/* <SelectATaskForChildScreen /> */}
  //         {/* <AddTaskToCategoryScreen /> */}
  //         {/* <AddCategoryScreen /> */}
  //         {/* <AddNewChildScreen /> */}
  //         {/* <EditChildScreen /> */}
  //         {/* <RemoveChildScreen /> */}
  //         <CreateTaskListForChildScreen />
  //         {/* <SelectATaskForChildScreen /> */}
  //     </SafeAreaView>
  // );
  // return <AddReward />;
  return <LoginScreen />;
};

export default App;
