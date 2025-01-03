import React from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function RootLayout() {
  useFonts({
    Montserrat: require("./../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-medium": require("./../assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-bold": require("./../assets/fonts/Montserrat-Bold.ttf"),
  });

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="add-new-category"
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Add New Category",
        }}
      />
      <Stack.Screen
        name="add-new-category-item"
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Add New Item",
        }}
      />
      <Stack.Screen
        name="add-income-expense"
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Add Income/Expense",
        }}
      />
    </Stack>
  );
}
