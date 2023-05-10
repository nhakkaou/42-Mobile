import { StyleSheet, View } from "react-native";
import Calculator_proj from "./calculator_proj";

export default function App() {
  return (
    <View style={styles.container}>
      <Calculator_proj />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
