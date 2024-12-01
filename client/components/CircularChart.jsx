import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import colors from "../utils/colors";
import PieChart from "react-native-pie-chart";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function CircularChart() {
  const widthAndHeight = 150;
  const [values, setValues] = useState([1]);
  const [sliceColor, setSliceColor] = useState([colors.WHITE2]);

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          fontFamily: "Montserrat",
        }}
      >
        Total Estimate :
        <Text style={{ fontFamily: "Montserrat-bold" }}> 0 $</Text>
      </Text>
      <View
        style={styles.subContainer}
      >
        <PieChart
          widthAndHeight={widthAndHeight}
          series={values}
          sliceColor={sliceColor}
          coverRadius={0.65}
          coverFill={colors.WHITE1}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            name="checkbox-blank-circle"
            size={24}
            color={colors.WHITE2}
          />
          <Text>NA</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: colors.WHITE1,
    padding: 20,
    borderRadius: 15,
    elevation: 1,
  },
  subContainer:{
    marginTop: 10,
    display: "flex",
    flexDirection:'row',
    gap:40
  }
});
