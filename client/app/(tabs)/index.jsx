import { StyleSheet, Text, View, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./../../configs/FirebaseConfig.jsx";
import { Link, useRouter } from "expo-router";
import { supabase } from "../../utils/SupaBaseConfig";
import colors from "../../utils/colors";
import services from "../../utils/services";

import Ionicons from "@expo/vector-icons/Ionicons";

import CircularChart from "../../components/CircularChart.jsx";
import Header from "../../components/Header";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    checkUserAuth();
    getCategoryList();
  }, []);

  const checkUserAuth = async () => {
    const result = await services.getData("login");
    if (result !== "true") {
      router.replace("/login");
    }
  };

  const handleLogout = async () => {
    try {
      // Call Firebase's signOut function
      await signOut(auth);

      // Perform additional cleanup or actions
      await services.storeData("login", "false"); // Storing the logged-out state
      const router = useRouter(); // Initialize the router
      router.replace("/login"); // Redirect to the login page
      console.log("User logged out successfully.");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const getCategoryList = async () => {
    try {
      const user = auth.currentUser;
      if (!user || !user.email) {
        console.error("User not authenticated or email missing");
        return;
      }
      const { data, error } = await supabase
        .from("category")
        .select("*")
        .eq("created_by", user.email);

      if (error) {
        console.error("Supabase error:", error.message);
        return;
      }
      console.log("Category Data:", data);
    } catch (error) {
      console.error("Error fetching category list:", error.message);
    }
  };

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <View style={styles.container}>
        <Header />
        <CircularChart />
      </View>
      <Link href={"/add-new-category"} style={styles.addBtnContainer}>
        <Ionicons name="add-circle-sharp" size={65} color={colors.PRIMARY} />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 20,
    padding: 25,
    backgroundColor: colors.PRIMARY,
    height: 150,
  },
  addBtnContainer: {
    position: "absolute",
    bottom: 16,
    right: 16,
    zIndex: 10,
  },
});
