import React, { useState } from "react";
import { View } from "react-native";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import RenderHtml from "react-native-render-html";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const Card = ({
  title,
  content,
  type = "none",
  id,
  removeNote,
  visibleDelete,
}) => {
  const color = {
    happy: "#eb9477",
    sad: "#f7d44c",
    angry: "#98b7db",
    none: "#f6ecc9",
  };
  const html =
    content.trim().length > 50
      ? content.trim().slice(0, 50) + "..."
      : content.trim();
  return (
    <View style={[styles.card, { backgroundColor: color[type] || "#f6ecc9" }]}>
      {visibleDelete && (
        <TouchableOpacity style={styles.remove} onPress={() => removeNote(id)}>
          <FontAwesome name="trash" color={"#000"} size={22} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      <RenderHtml contentWidth={300} source={{ html }} />
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 20,
    borderRadius: 10,
    position: "relative",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
  },
  desc: {
    fontSize: 14,
    // color: "#fff",
    lineHeight: 25,
  },
  remove: {
    position: "absolute",
    top: 5,
    right: 9,
    zIndex: 1,
  },
});
export default Card;
