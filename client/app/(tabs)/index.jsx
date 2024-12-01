import { StyleSheet, Text, View, Button } from "react-native";
import React, { useEffect } from "react";
import { Link, useRouter } from "expo-router";
import { supabase } from "./../../utils/SupaBaseConfig";
import services from "./../../utils/services";
import { client } from "./../../utils/KindConfig";
import colors from "./../../utils/colors";

import Header from "../../components/Header";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    checkUserAuth();
    getCategoryList();
  }, []);

  //Used to check User is already auth or not

  const checkUserAuth = async () => {
    const result = await services.getData("login");
    if (result !== "true") {
      router.replace("/login");
    }
  };

  const handleLogout = async () => {
    const loggedOut = await client.logout();
    if (loggedOut) {
      await services.storeData("login", "false");
      router.replace("/login");
      // User was logged out
    }
  };

  const getCategoryList = async () => {
    const user = await client.getUserDetails();
    const { data, error } = await supabase
      .from("category")
      .select("*")
      .eq("created_by", user.email);

    console.log(user.email);
    console.log("Data", data);
  };

  return (
    <View style={styles.container}>
      <Header />
      <Button onPress={handleLogout} title="Logout"></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20,
    backgroundColor: colors.PRIMARY,
    height: 150,
  },
});
