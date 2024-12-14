import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import colors from "../utils/colors";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker"; // Importing DateTimePicker

export default function Income() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date()); // Initialize date with current date
  const [showDatePicker, setShowDatePicker] = useState(false); // To control visibility of date picker
  const router = useRouter();

  const onClickAdd = async () => {
    setLoading(true);

    setLoading(false);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.textInputContainer}>
          <FontAwesome name="rupee" size={24} color={colors.WHITE2} />
          <TextInput
            placeholder="Amount"
            placeholderTextColor={colors.WHITE2}
            style={styles.input}
            keyboardType="number-pad"
            onChangeText={(value) => setAmount(value)}
          />
        </View>
        <View style={styles.textInputContainer}>
          <MaterialCommunityIcons
            name="format-letter-case"
            size={24}
            color={colors.WHITE2}
          />
          <TextInput
            placeholder="Income name"
            placeholderTextColor={colors.WHITE2}
            style={styles.input}
            onChangeText={(value) => setName(value)}
          />
        </View>
        <View style={styles.textInputContainer}>
          <MaterialIcons name="category" size={24} color={colors.WHITE2} />
          <TextInput
            placeholder="Category"
            placeholderTextColor={colors.WHITE2}
            style={styles.input}
            onChangeText={(value) => setCategory(value)}
          />
        </View>
        {/* Note Section */}
        <View style={styles.textInputContainer}>
          <Ionicons name="clipboard" size={24} color={colors.WHITE2} />
          <TextInput
            placeholder="Note"
            placeholderTextColor={colors.WHITE2}
            style={styles.input}
            onChangeText={(value) => setNote(value)}
          />
        </View>

        {/* Date Picker Section */}
        <View style={styles.textInputContainer}>
          <Ionicons name="calendar-sharp" size={24} color={colors.WHITE2} />
          <TouchableOpacity onPress={showDatepicker} style={styles.datePicker}>
            <Text style={styles.input}>{date.toLocaleDateString()}</Text>
          </TouchableOpacity>
        </View>

        {/* DateTimePicker Component */}
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}

        {/* Add Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => onClickAdd()}
          disabled={!name || !amount || !date || !category || loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.GREEN} />
          ) : (
            <Text style={styles.addButtonText}>Add Income</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: colors.WHITE1,
    minHeight: "100%",
  },
  textInputContainer: {
    padding: 10,
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 10,
    borderColor: colors.WHITE2,
    marginTop: 10,
  },
  input: {
    fontSize: 17,
    fontFamily: "Montserrat-medium",
    color: colors.BLACK1,
    width: "100%",
  },
  addButton: {
    padding: 15,
    backgroundColor: colors.WHITE1,
    borderRadius: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.GREEN,
  },
  addButtonText: {
    textAlign: "center",
    fontFamily: "Montserrat-bold",
    fontSize: 20,
    color: colors.GREEN,
  },
  datePicker: {
    flex: 1,
    marginLeft: 10,
  },
});
