import React, { useState, useEffect, useContext } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Platform,
  TouchableOpacity,
  Text,
  Modal
} from "react-native";
import AppButton from "../../components/appButton";
import AppHeading from "../../components/appHeading";
import screens from "../../config/screens";
import AppTextInput from "../../components/AppTextInput";
import colours from "../../config/colours";
import placeholder from "../../assets/placeholder.png";
import AuthContext from "../../components/auth/context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { UsersContext } from '../../context/UsersContext';
import AppPicker from '../../components/appPicker';
import PickerItem from '../../components/appPickerItem';
import Screen from "../../components/appScreen"


function EditProfileScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const { addAvatar, users, icons } = useContext(UsersContext);

  const [image, setImage] = useState(user.uri);
  console.log("user " + Object.keys(icons[0]))
  const [nickName, setNickName] = useState(user.username);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [isIcon, setIsIcon] = useState(false)

  const iconData = icons.map((icon) => {
    console.log("-----" + Object.keys(icon))
    return { label: icon.label, value: icon.icon_id, icon: icon.icon_name, color: icon.background_color };
  });

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
    for (let i = 0; i < users.length; i++) {
      console.log("LOOP user = ", users[i].icon)//.icon_name)
      if (user.username === users[i].user_name) {
        console.log("match uri = " + Object.keys(users[i]))
        setImage(users[i].uri);
        for (let x = 0; x < icons.length; x++) {
          if (users[i].icon === icons[x].icon_name) {
            setSelectedItem({ icon: users[i].icon, label: icons[x].label, value: icons[x].icon_id, color: icons[x].background_color });
            break;
          }
        }
        // icons.map(icon => console.log(Object.keys(icon)))



      }
    }
  }, []);
  const handleSelectItem = (item) => {
    setImage(null)
    setSelectedItem(item);
  };
  const handleSave = async () => {
    console.log("image uri = " + image);
    if (image) {
      await addAvatar(user.userId, image, null);
    } else {
      await addAvatar(user.userId, null, selectedItem.icon);
    }

    navigation.navigate(screens.ChildDashBoard);
  }
  const handlePickerPress = () => {
    setModalVisible(false)
  }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setSelectedItem(null);
      setModalVisible(false);

    }
  };
  return (
    <Screen style={{ height: "100%" }}>
      <AppHeading title="Edit Profile" />
      <Text style={{ alignSelf: "center" }}>{nickName}</Text>
      <TouchableOpacity onPress={() => {
        setModalVisible(true)
      }}>
        <View
          style={{
            height: 200,
            width: 200,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderRadius: 100,
            alignSelf: "center",
            backgroundColor: colours.buttonBackground
          }}
        >
          {image ? <Image
            source={{ uri: image }}
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
            }}
          /> : <>
              {selectedItem ? <MaterialCommunityIcons name={selectedItem.icon} size={200} color={"white"} />
                : <MaterialCommunityIcons name={"account"} size={200} color={"white"} />
              }
            </>}

        </View>
        <Text style={{ alignSelf: "center" }}>Click to select image or icon</Text>
      </TouchableOpacity>

      <AppTextInput
        placeholder="Nickname"
        icon="human"
        labelText="Nickname"
        onChangeText={(text) => setNickName(text)}
        defaultValue={nickName}
      />
      {(image || selectedItem) && <AppButton
        title="Save"
        onPress={handleSave}
      />}
      <AppButton
        title="Return"
        onPress={() => navigation.navigate(screens.ChildDashBoard)}
      />

      <Modal visible={modalVisible} animationType="slide">
        <Screen>
          <AppButton
            title="Close"
            onPress={() => {
              setIsIcon(false)
              setModalVisible(false)
            }}

          />
          {
            <AppButton
              title="image"
              onPress={async () => {

                await pickImage()

              }}
            />}
          {



            <AppPicker
              items={iconData}
              icon={selectedItem ? selectedItem.icon : "account"}
              PickerItemComponent={PickerItem}
              placeholder="Select Icon"
              onSelectItem={handleSelectItem}
              selectedItem={selectedItem}
              numberOfColumns={2}
              width={"90%"}
              onPickerPress={handlePickerPress}
            />}
        </Screen>
      </Modal>
    </Screen>

  );
}

const styles = StyleSheet.create({
  container: {},
});

export default EditProfileScreen;
