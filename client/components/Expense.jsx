import { View, Text, StyleSheet } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { PieChart } from "react-native-gifted-charts";
import colors from "../utils/colors";

export default function Expense() {
  const pieData = [
    {
      value: 47,
      color: colors.COLOR_LIST[0],
      focused: true,
      text: "47%",
    },
    {
      value: 40,
      color: colors.COLOR_LIST[1],
      focused: true,
      text: "47%",
    },
    {
      value: 16,
      color: colors.COLOR_LIST[2],
      focused: true,
      text: "47%",
    },
    {
      value: 3,
      color: colors.COLOR_LIST[3],
      focused: true,
      text: "47%",
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.expenseContainer}>
        <View style={styles.expense}>
          <FontAwesome name="rupee" size={28} color="black" />
          <Text style={styles.expenseTxt}>0.00</Text>
        </View>
        <View>
          <PieChart
            data={pieData}
            donut
            showGradient
            sectionAutoFocus
            // focusOnPress
            semiCircle
            radius={90}
            innerRadius={60}
            innerCircleColor={colors.WHITE1}
            centerLabelComponent={() => {
              return (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text
                    style={{
                      fontSize: 22,
                      color: colors.BLACK1,
                      fontWeight: "bold",
                    }}
                  >
                    47%
                  </Text>
                </View>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 5,
    marginBottom: 15,
  },
  expense: {
    width: "30%",
    display: "flex",
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  expenseTxt: {
    fontSize: 28,
    fontFamily: "Montserrat-bold",
  },

  expenseContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
