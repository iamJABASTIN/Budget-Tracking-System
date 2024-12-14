import { View, Text, StyleSheet } from "react-native";
import React from "react";
import colors from "../../utils/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import Header from "../../components/Header";
import MoneyStatus from "../../components/MoneyStatus";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function index() {
  const router = useRouter();
  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.safeArea}>
        <Header />
      </SafeAreaView>
      <View style={styles.container}>
        <MoneyStatus />
        <Link href={"/add-income-expense"} style={styles.addBtnContainer}>
          <Ionicons name="add-circle-sharp" size={65} color={colors.PRIMARY} />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1, // Ensures the root container takes up full screen height
    backgroundColor: colors.WHITE1, // Full-screen white background
  },
  safeArea: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: colors.PRIMARY,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    zIndex: 1,
  },
  container: {
    flex: 1, // Ensures the container fills remaining space after SafeAreaView
    padding: 20,
    backgroundColor: colors.WHITE1, // Explicit white background
    borderTopLeftRadius: 25, // Optional: Match radius for visual consistency
    borderTopRightRadius: 25, // Optional: Match radius for visual consistency
  },
  addBtnContainer: {
    position: "absolute",
    bottom: 16,
    right: 16,
    zIndex: 10,
  },
});
