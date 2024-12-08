import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../utils/colors";
import PieChart from "react-native-pie-chart";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function CircularChart({ categoryList = [] }) {
  const widthAndHeight = 150;
  const [values, setValues] = useState([1]);
  const [sliceColor, setSliceColor] = useState([colors.WHITE2]);
  const [totalCalculatedEstimate, setTotalCalculatedEstimate] = useState(0);

  useEffect(() => {
    updateCircularChart();
  }, [categoryList]); // Trigger when categoryList changes

  const updateCircularChart = () => {
    let totalEstimates = 0;
    let chartValues = [];
    let chartColors = [];
    let otherCost = 0;

    categoryList.forEach((item, index) => {
      if (index < 4) {
        let itemTotalCost = item.categoryItems?.reduce(
          (sum, subItem) => sum + (subItem.cost || 0),
          0
        );
        totalEstimates += itemTotalCost;
        chartValues.push(itemTotalCost);
        chartColors.push(colors.COLOR_LIST[index]);
      } else {
        let itemOtherCost = item.categoryItems?.reduce(
          (sum, subItem) => sum + (subItem.cost || 0),
          0
        );
        otherCost += itemOtherCost;
        totalEstimates += itemOtherCost;
      }
    });

    // Add "Others" category if it exists
    if (otherCost > 0) {
      chartValues.push(otherCost);
      chartColors.push(colors.COLOR_LIST[4]);
    }

    // Handle empty or zeroed data
    if (chartValues.length === 0 || chartValues.every((val) => val === 0)) {
      chartValues = [1]; // Fallback value
      chartColors = [colors.WHITE2];
    }

    // Update state
    setValues(chartValues);
    setSliceColor(chartColors);
    setTotalCalculatedEstimate(totalEstimates);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.totalEstimate}>
        Total Estimate:{" "}
        <Text style={styles.boldText}>${totalCalculatedEstimate.toFixed(2)}</Text>
      </Text>
      <View style={styles.subContainer}>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={values}
          sliceColor={sliceColor}
          coverRadius={0.65}
          coverFill={colors.WHITE1}
        />
        {categoryList.length === 0 ? (
          <View style={styles.pieStatus}>
            <MaterialCommunityIcons
              name="checkbox-blank-circle"
              size={24}
              color={colors.WHITE2}
            />
            <Text>NA</Text>
          </View>
        ) : (
          <View>
            {categoryList.map((category, index) =>
              index < 4 ? (
                <View key={index} style={styles.pieStatus}>
                  <MaterialCommunityIcons
                    name="checkbox-blank-circle"
                    size={24}
                    color={colors.COLOR_LIST[index]}
                  />
                  <Text>{category.name}</Text>
                </View>
              ) : null
            )}
            {values.length > 4 && (
              <View style={styles.pieStatus}>
                <MaterialCommunityIcons
                  name="checkbox-blank-circle"
                  size={24}
                  color={colors.COLOR_LIST[4]}
                />
                <Text>Others</Text>
              </View>
            )}
          </View>
        )}
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
  subContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  pieStatus: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  totalEstimate: {
    fontSize: 20,
    fontFamily: "Montserrat",
  },
  boldText: {
    fontFamily: "Montserrat-bold",
  },
});

// import { View, Text, StyleSheet } from "react-native";
// import React, { useEffect, useState } from "react";
// import colors from "../utils/colors";
// import PieChart from "react-native-pie-chart";
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// export default function CircularChart({ categoryList }) {
//   const widthAndHeight = 150;
//   const [values, setValues] = useState([1]);
//   const [sliceColor, setSliceColor] = useState([colors.WHITE2]);
//   const [totalCalculatedEstimate, setTotalCalculatedestimate] = useState(0);

//   useEffect(() => {
//     categoryList && updateCircularChart();
//   }, []);

//   const updateCircularChart = () => {
//     let totalEsimates = 0
//     setSliceColor([]);
//     setValues([]);
//     let otherCost = 0;
//     categoryList?.forEach((item, index) => {
//       if (index < 4) {
//         let itemTotalCost = 0;
//         item.categoryItems?.forEach((item_) => {
//           itemTotalCost = itemTotalCost + item_.cost;
//           totalEsimates = totalEsimates + item_.cost;
//         });
//         setSliceColor((sliceColor) => [
//           ...sliceColor,
//           colors.COLOR_LIST[index],
//         ]);
//         setValues((values) => [...values, itemTotalCost]);
//       } else {
//         item.categoryItems?.forEach((item_) => {
//           otherCost = otherCost + item_.cost;
//           totalEsimates = totalEsimates + item_.cost;
//         }) 
//       }
//     });
//     setTotalCalculatedestimate(totalEsimates)
//     setSliceColor((sliceColor) => [
//       ...sliceColor,
//       colors.COLOR_LIST[4],
//     ]);
//     setValues((values) => [...values, otherCost]);
//   };

//   return (
//     <View style={styles.container}>
//       <Text
//         style={{
//           fontSize: 20,
//           fontFamily: "Montserrat",
//         }}
//       >
//         Total Estimate:
//         <Text style={{ fontFamily: "Montserrat-bold" }}> ${totalCalculatedEstimate}</Text>
//       </Text>
//       <View style={styles.subContainer}>
//         <PieChart
//           widthAndHeight={widthAndHeight}
//           series={values}
//           sliceColor={sliceColor}
//           coverRadius={0.65}
//           coverFill={colors.WHITE1}
//         />
//         {categoryList?.length == 0 ? (
//           <View style={styles.pieStatus}>
//             <MaterialCommunityIcons
//               name="checkbox-blank-circle"
//               size={24}
//               color={colors.WHITE2}
//             />
//             <Text>NA</Text>
//           </View>
//         ) : (
//           <View>
//             {categoryList?.map((category, index) => index <= 4 &&(
//               <View key={index} style={styles.pieStatus}>
//                 <MaterialCommunityIcons
//                   name="checkbox-blank-circle"
//                   size={24}
//                   color={colors.COLOR_LIST[index]}
//                 />
//                 <Text>{index<4?category.name:'Others'}</Text>
//               </View>
//             ))}
//           </View>
//         )}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 20,
//     backgroundColor: colors.WHITE1,
//     padding: 20,
//     borderRadius: 15,
//     elevation: 1,
//   },
//   subContainer: {
//     marginTop: 10,
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//   },
//   pieStatus: {
//     display: "flex",
//     flexDirection: "row",
//     gap: 5,
//     alignItems: "center",
//   },
// });
