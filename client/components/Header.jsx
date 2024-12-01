import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { client } from "../utils/KindConfig";

export default function Header() {
  const [user, setUser] = useState();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const user = await client.getUserDetails();
    setUser(user);
  };

  return (
    <View>
      <Image source={{ uri:user?.picture}} style={styles.image}/>
    </View>
  );
}

const styles = StyleSheet.create({
    image : {
        width:50,
        height: 50
    }
})
