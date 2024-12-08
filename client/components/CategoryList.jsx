import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../utils/colors";
import { useRouter } from "expo-router";

export default function CategoryList({ categoryList }) {
  const router = useRouter();

  const onCategoryClick = (category) => {
    router.push({
      pathname: "/category-details",
      params: {
        categoryId: category.id,
      },
    });
  };

  const calculateTotalCost = (categoryItems) => {
    let totalCost = 0;
    categoryItems.forEach(item => {
      totalCost = totalCost + item.cost
    });
    return totalCost;
  }

  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "Montserrat-bold",
          fontSize: 25,
          marginBottom: 10,
        }}
      >
        Latest Budget
      </Text>
      <View>
        {categoryList &&
          categoryList?.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={styles.container}
              onPress={() => onCategoryClick(category)}
            >
              <View style={styles.iconContainer}>
                <Text
                  style={[
                    styles.iconText,
                    { backgroundColor: category?.color },
                  ]}
                >
                  {category.icon}
                </Text>
              </View>
              <View style={styles.subContainer}>
                <View>
                  <Text style={styles.categoryText}>{category.name}</Text>
                  <Text style={styles.itemCount}>
                    {category?.categoryItems?.length} Items
                  </Text>
                </View>
                <Text style={styles.totalAmountText}>
                  $ {calculateTotalCost(category?.categoryItems)}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    backgroundColor: colors.WHITE1,
    padding: 10,
    borderRadius: 15,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "baseline",
  },
  iconText: {
    fontSize: 35,
    padding: 15,
    borderRadius: 15,
  },
  categoryText: {
    fontFamily: "Montserrat-bold",
    fontSize: 20,
  },
  itemCount: {
    fontFamily: "Montserrat",
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    width: "70%",
  },
  totalAmountText: {
    fontFamily: "Montserrat-bold",
    fontSize: 15,
  },
});
