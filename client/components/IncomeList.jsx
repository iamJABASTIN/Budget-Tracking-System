import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { auth } from "../configs/FirebaseConfig";
import { supabase } from "../utils/SupaBaseConfig";
import colors from "../utils/colors";

export default function IncomeList() {
  const [incomeList, setIncomeList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getIncomeList = async () => {
    try {
      setLoading(true);
      const user = auth.currentUser;
      if (!user || !user.email) {
        console.error("User not authenticated or email missing");
        return;
      }

      const { data, error } = await supabase
        .from("income")
        .select("*")
        .eq("created_by", user.email);

      if (error) {
        console.error("Supabase error:", error.message);
        return;
      }

      console.log("Fetched Data:", data); // Log fetched data for verification
      setIncomeList(data || []);
    } catch (error) {
      console.error("Error fetching income list:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getIncomeList();
  }, []);

  // Render each item in the income list
  return (
    <View
      style={{
        marginTop: 15,
      }}
    >
      <View>
        {incomeList.length > 0 ? (
          incomeList?.map((income, index) => (
            <TouchableOpacity key={index} style={styles.container}>
              <View style={styles.topDetailsPart}>
                <Text style={{ color: "#A9A9A9" }}>{income.category}</Text>
                <Text style={{ color: "#A9A9A9" }}>
                  {income.date.substring(0, 10)}
                </Text>
              </View>
              <View style={styles.wrapper}>
                <View style={styles.subContainer}>
                  <Text style={styles.incomeText}>{income.name}</Text>
                </View>
                <Text style={styles.totalAmountText}>$ {income.amount}</Text>
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
    backgroundColor: colors.LIGHT_GREEN,
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
  incomeText: {
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
    fontSize:20,
    color:colors.WHITE2
  },
});
