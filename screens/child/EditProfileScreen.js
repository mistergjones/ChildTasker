import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";
import AppButton from "../../components/appButton";
import AppHeading from "../../components/appHeading";
import screens from "../../config/screens";
import AppTextInput from "../../components/AppTextInput";
import colours from "../../config/colours";
import placeholder from "../../assets/placeholder.png";

function EditProfileScreen({ navigation }) {
  const [image, setImage] = useState(Image.resolveAssetSource(placeholder).uri);
  const [nickName, setNickName] = useState("Johhny");

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
  }, []);

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
    }
  };
  return (
    <SafeAreaView style={{ height: "100%", backgroundColor: "lightgrey" }}>
      <AppHeading title="Edit Profile" />
      <Text style={{ alignSelf: "center" }}>{nickName}</Text>
      <TouchableOpacity onPress={pickImage}>
        <View
          style={{
            height: 200,
            width: 200,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderRadius: 100,
            alignSelf: "center",
          }}
        >
          <Image
            source={{ uri: image }}
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
            }}
          />
        </View>
      </TouchableOpacity>
      <AppTextInput
        placeholder="Nickname"
        icon="human"
        labelText="Nickname"
        onChangeText={(text) => setNickName(text)}
        defaultValue={nickName}
      />
      <AppButton
        title="Return"
        onPress={() => navigation.navigate(screens.ChildDashBoard)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default EditProfileScreen;
