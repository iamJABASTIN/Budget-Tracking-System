import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../../utils/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Header from "../../components/Header";
import Expense from "../../components/Expense";
import ExpenseBlock from "../../components/ExpenseBlock";

export default function index() {
  const router = useRouter();
  return (
    <View>
      <SafeAreaView style={styles.safeArea}>
        <Header />
      </SafeAreaView>
      <View style={styles.conatiner}>
        <Text style={{ fontFamily: "Montserrat", fontSize: 18 }}>
          My <Text style={{ fontFamily: "Montserrat-bold" }}>Expense</Text>
        </Text>
        <Expense />
        <ExpenseBlock />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: colors.PRIMARY,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  conatiner: {
    padding: 20,
    display: "flex",
    backgroundColor: colors.WHITE1,
  },
});
