import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import Feather from "react-native-vector-icons/Feather";

const color = {
  happy: "#eb9477",
  sad: "#f7d44c",
  angry: "#98b7db",
  none: "#f6ecc9",
};
const filters = [
  {
    id: 1,
    value: "none",
  },
  {
    id: 2,
    value: "happy",
  },
  {
    id: 3,
    value: "sad",
  },
  {
    id: 4,
    value: "angry",
  },
];
const SelectType = ({ setType, type }) => {
  const [hide, setHide] = useState(true);
  return (
    <View style={styles.category}>
      <View>
        <Feather
          name="bookmark"
          color={color[type]}
          size={20}
          onPress={() => setHide(!hide)}
        />
      </View>
      {!hide && (
        <FlatList
          data={filters}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
              onPress={() => {
                setType(item.value);
                setHide(!hide);
              }}
            >
              <Feather name="bookmark" color={color[item.value]} size={20} />
              <Text style={{ color: "#fff" }}>{item.value}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  category: {
    marginLeft: 5,
  },
});
export default SelectType;
