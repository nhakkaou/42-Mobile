import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const My_first_proj = () => {
  const [hide, setHidden] = useState(true);
  const handelClick = () => {
    console.log("Button pressed");
    setHidden(!hide);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{hide ? "A simple text" : "Hello World!"}</Text>
      <TouchableOpacity style={styles.button} onPress={handelClick}>
        <Text style={{ fontSize: 15 }}>Click me</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    backgroundColor: "green",
    fontSize: 25,
    color: "#fff",
  },
  button: {
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default My_first_proj;
