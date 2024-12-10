import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Linking,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../utils/colors";
import { supabase } from "../../utils/SupaBaseConfig";

export default function CourseItemList({ categoryData, setUpdateRecord }) {
  const [expandItem, setExpandItem] = useState();

  const onDeleteItem = async (id) => {
    const { error } = await supabase
      .from("categoryItems")
      .delete()
      .eq("id", id);
    ToastAndroid.show("Item Deleted!", ToastAndroid.SHORT);
    setUpdateRecord(true);
  };

  const openURL = (url) => {
    if (url) {
      Linking.openURL(url);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Item List</Text>
      <View style={{ marginTop: 15 }}>
        {categoryData?.categoryItems?.length > 0 ? (
          categoryData?.categoryItems?.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => setExpandItem(index)}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.image}
                ></Image>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.url}>{item.url}</Text>
                </View>
                <Text style={styles.cost}>$ {item.cost}</Text>
              </TouchableOpacity>
              {expandItem == index && (
                <View style={styles.actionItemContainer}>
                  <TouchableOpacity onPress={() => onDeleteItem(item.id)}>
                    <Ionicons name="trash" size={24} color="red" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => openURL(item.url)}>
                    <Ionicons
                      name="link-sharp"
                      size={24}
                      color={colors.SECONDARY}
                    />
                  </TouchableOpacity>
                </View>
              )}
              {categoryData?.categoryItems?.length - 1 != index && (
                <View
                  style={{
                    borderWidth: 0.5,
                    marginTop: 10,
                    borderColor: colors.WHITE2,
                  }}
                ></View>
              )}
            </View>
          ))
        ) : (
          <Text style={styles.noItemFound}>No Item Found</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  heading: {
    fontFamily: "Montserrat-bold",
    fontSize: 20,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 15,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  name: {
    fontSize: 20,
    fontFamily: "Montserrat-bold",
  },
  url: {
    fontFamily: "Montserrat",
    color: "#63666A",
    fontSize: 12,
  },
  cost: {
    fontSize: 17,
    fontFamily: "Montserrat-bold",
    marginLeft: 10,
  },
  noItemFound: {
    fontFamily: "Montserrat-bold",
    fontSize: 20,
    color: colors.WHITE2,
  },
  actionItemContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
    justifyContent: "flex-end",
    marginTop: -25,
  },
});
