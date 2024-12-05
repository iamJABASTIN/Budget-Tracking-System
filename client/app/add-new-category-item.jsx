import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import colors from "../utils/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";

export default function AddNewCategoryItem() {
  const placeholder =
    "https://th.bing.com/th/id/OIP.kEKWG9WO-kIzLXqm6_khxgHaFS?rs=1&pid=ImgDetMain";
  const [image, setImage] = useState(placeholder);
  const [previewImage, setPreviewImage] = useState(placeholder);
  const [name, setName] = useState();
  const [cost, setCost] = useState();
  const [URL, setURL] = useState();
  const [note, setNote] = useState();
  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    console.log(result);

    if (!result.canceled) {
      setPreviewImage(result.assets[0].uri);
      setImage(result.assets[0].base64);
    }
  };
  return (
    <KeyboardAvoidingView>
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => onImagePick()}>
          <Image source={{ uri: previewImage }} style={styles.image} />
        </TouchableOpacity>
        <View style={styles.textInputContainer}>
          <Ionicons name="pricetag" size={24} color={colors.WHITE2} />
          <TextInput
            placeholder="Item name"
            style={styles.input}
            onChange={(value) => setName(value)}
          />
        </View>
        <View style={styles.textInputContainer}>
          <FontAwesome name="rupee" size={24} color={colors.WHITE2} />
          <TextInput
            placeholder="Cost"
            style={styles.input}
            keyboardType="number-pad"
            onChange={(value) => setCost(value)}
          />
        </View>
        <View style={styles.textInputContainer}>
          <Ionicons name="link" size={24} color={colors.WHITE2} />
          <TextInput
            placeholder="URL"
            style={styles.input}
            onChange={(value) => setURL(value)}
          />
        </View>
        <View style={styles.textInputContainer}>
          <Ionicons name="pencil-sharp" size={24} color={colors.WHITE2} />
          <TextInput
            placeholder="Note"
            style={styles.input}
            numberOfLines={30}
            onChange={(value) => setNote(value)}
          />
        </View>
        <TouchableOpacity style={styles.btn} disabled={!name || !cost}>
          <Text style={styles.btnTxt}>Add</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: 150,
    backgroundColor: colors.WHITE2,
    borderRadius: 15,
  },
  container: {
    padding: 20,
  },
  textInputContainer: {
    padding: 10,
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 10,
    borderColor: colors.WHITE2,
    marginTop: 10,
  },
  input: {
    fontSize: 17,
    fontFamily: "Montserrat-medium",
    width: "85%",
  },
  btn: {
    backgroundColor: colors.PRIMARY,
    padding: 15,
    borderRadius: 99,
    textAlign: "center",
    marginTop: 40,
  },
  btnTxt: {
    textAlign: "center",
    fontFamily: "Montserrat-bold",
    fontSize: 20,
    color: colors.WHITE1,
  },
});
