import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import colors from "../utils/colors";
import ExpenseList from "./ExpenseList";
import IncomeList from "./IncomeList";

export default function IncomeExpenseList() {
  const [selectedForm, setSelectedForm] = useState("expense");
  return (
    <View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.expenseBtn}
          onPress={() => setSelectedForm("expense")}
        >
          <Text style={styles.btnTxt}>Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.incomeBtn}
          onPress={() => setSelectedForm("income")}
        >
          <Text style={styles.btnTxt}>Income</Text>
        </TouchableOpacity>
      </View>
        {selectedForm==='expense'?<ExpenseList/>:<IncomeList/>}
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
  incomeBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.GREEN,
    borderRadius: 5,
    flex: 1,
  },
  expenseBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.RED,
    borderRadius: 5,
    flex: 1,
  },
  btnTxt: {
    textAlign: "center",
    fontFamily: "Montserrat-bold",
    fontSize: 16,
    color: colors.WHITE1,
  },
});
