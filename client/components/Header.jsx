import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { auth } from "./../configs/FirebaseConfig";
import React, { useEffect, useState } from "react";
import colors from "../utils/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

export default function Header() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      setUser(currentUser);
    };
    fetchUserData();
  }, []);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
      }}
    >
      {user ? (
        <TouchableOpacity onPress={() => router.replace("/(tabs)/profile")}>
          <Image
            source={{
              uri:
                user?.photoURL ||
                "https://cdn.vectorstock.com/i/preview-1x/15/32/colorful-profile-picture-placeholder-icon-vector-42411532.jpg",
            }}
            style={styles.image}
          />
        </TouchableOpacity>
      ) : (
        <Text>Loading...</Text>
      )}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "85%",
        }}
      >
        <View>
          <Text
            style={{
              color: colors.WHITE1,
              fontSize: 16,
              fontFamily: "Montserrat",
            }}
          >
            Welcome,
          </Text>
          <Text
            style={{
              color: colors.WHITE1,
              fontSize: 20,
              fontFamily: "Montserrat-bold",
            }}
          >
            {user?.displayName || "Jhon"}
          </Text>
        </View>
        {/* <Ionicons name="notifications" size={24} color={colors.WHITE1} /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 99,
  },
});
