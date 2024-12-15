import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { auth } from "../configs/FirebaseConfig";
import { supabase } from "../utils/SupaBaseConfig";
import colors from "../utils/colors";

export default function ExpenseList() {
  const [expenseList, setExpenseList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getExpenseList = async () => {
    try {
      setLoading(true);
      const user = auth.currentUser;
      if (!user || !user.email) {
        console.error("User not authenticated or email missing");
        return;
      }

      const { data, error } = await supabase
        .from("expense")
        .select("*")
        .eq("created_by", user.email);

      if (error) {
        console.error("Supabase error:", error.message);
        return;
      }

      console.log("Fetched Data:", data); // Log fetched data for verification
      setExpenseList(data || []);
    } catch (error) {
      console.error("Error fetching expense list:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getExpenseList();
  }, []);

  // Render each item in the expense list
  return (
    <View
      style={{
        marginTop: 15,
      }}
    >
      <View>
        {expenseList.length > 0 ? (
          expenseList?.map((expense, index) => (
            <TouchableOpacity key={index} style={styles.container}>
              <View style={styles.topDetailsPart}>
                <Text style={{ color: "#A9A9A9" }}>{expense.category}</Text>
                <Text style={{ color: "#A9A9A9" }}>
                  {expense.date.substring(0, 10)}
                </Text>
              </View>
              <View style={styles.wrapper}>
                <View style={styles.subContainer}>
                  <Text style={styles.expenseText}>{expense.name}</Text>
                </View>
                <Text style={styles.totalAmountText}>$ {expense.amount}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.placeholder}>No Items found</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 7,
    display: "flex",
    alignItems: "center",
    backgroundColor: colors.LIGHT_RED,
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  wrapper: {
    gap: 7,
    display: "flex",
    flexDirection: "row",
    width: "95%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  expenseText: {
    fontFamily: "Montserrat-medium",
    fontSize: 16,
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
  topDetailsPart: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
  },
  placeholder: {
    fontFamily: "Montserrat-bold",
    fontSize: 20,
    color: colors.WHITE2,
  },
});
