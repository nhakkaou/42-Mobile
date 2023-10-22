import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Filter = ({ label, select, setFilter }) => {
  return (
    <TouchableOpacity
      style={[styles.card, select && { borderColor: "#fff" }]}
      onPress={() => setFilter(label)}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: {
    borderColor: "#232423",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  text: { color: "#fff", textAlign: "center", fontSize: 15 },
});
export default Filter;
