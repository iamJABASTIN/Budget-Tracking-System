import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import colors from "../../utils/colors";

export default function CourseItemList({ categoryData }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Item List</Text>
      <View style={{ marginTop: 15 }}>
        {categoryData?.categoryItems?.length > 0 ? (
          categoryData?.categoryItems?.map((item, index) => (
            <>
              <View key={index} style={styles.itemContainer}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.image}
                ></Image>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.url}>{item.url}</Text>
                </View>
                <Text style={styles.cost}>{item.cost}</Text>
              </View>
              {categoryData?.categoryItems?.length - 1 != index && (
                <View
                  style={{
                    borderWidth: 0.5,
                    marginTop: 10,
                    borderColor: colors.WHITE2,
                  }}
                ></View>
              )}
            </>
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
});
