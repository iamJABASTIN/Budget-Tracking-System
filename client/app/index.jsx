import { StyleSheet, Text, View, Button } from "react-native";
import React, { useEffect } from "react";
import { Link, useRouter } from "expo-router";
import services from "../utils/services";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    checkUserAuth();
  }, []);

  //Used to check User is already auth or not

  const checkUserAuth = async () => {
    const result = await services.getData("login");
    if (result !== 'true') {
      router.push('/login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hola world</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
