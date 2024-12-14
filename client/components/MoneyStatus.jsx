import { View, Text, StyleSheet } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { PieChart } from "react-native-gifted-charts";
import colors from "../utils/colors";

export default function MoneyStatus() {
  return (
    <View style={styles.container}>
      <View style={styles.expenseStatus}>
        <Text style={{ fontFamily: "Montserrat", fontSize: 16 }}>
          My<Text style={{ fontFamily: "Montserrat-bold" }}> Expense</Text>
        </Text>
        <View style={styles.expenseAmt}>
          <FontAwesome name="rupee" size={24} color={colors.RED} />
          <Text style={{ fontSize: 24, color: colors.RED }}>0.00</Text>
        </View>
      </View>
      <View style={styles.incomeStatus}>
        <Text style={{ fontFamily: "Montserrat", fontSize: 16 }}>
          My<Text style={{ fontFamily: "Montserrat-bold" }}> Income</Text>
        </Text>
        <View style={styles.incomeAmt}>
          <FontAwesome name="rupee" size={24} color={colors.GREEN} />
          <Text style={{ fontSize: 24, color: colors.GREEN }}>0.00</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // marginTop:20
  },
  moneyStatus: {
    width: "30%",
    display: "flex",
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  expenseAmt: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  incomeAmt: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 10,
  },
});
