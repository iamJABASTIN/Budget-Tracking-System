import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "../utils/SupaBaseConfig";
import Ionicons from "@expo/vector-icons/Ionicons";
import CourseInfo from "../components/category details/CourseInfo";
import CourseItemList from "../components/category details/CourseItemList";

export default function CategoryDetails() {
  const { categoryId } = useLocalSearchParams();
  const [categoryData, setcategoryData] = useState([]);
  const router = useRouter();
  useEffect(() => {
    console.log("ID :", categoryId);
    categoryId && getCategoryDetail();
  }, [categoryId]);

  const getCategoryDetail = async () => {
    const { data, error } = await supabase
      .from("category")
      .select("*,categoryItems(*)")
      .eq("id", categoryId);
    setcategoryData(data[0]);
    console.log("category : ", data);
  };
  return (
    <View
      style={{
        padding: 20,
        marginTop: 5,
      }}
    >
      <TouchableOpacity
        style={{ marginBottom: 10 }}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back-circle-sharp" size={44} color="black" />
      </TouchableOpacity>
      <CourseInfo categoryData={categoryData}></CourseInfo>
      <CourseItemList categoryData={categoryData} />
    </View>
  );
}

const styles = StyleSheet.create({
  textIcon: {
    fontSize: 20,
  },
});
