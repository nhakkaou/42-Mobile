import { StyleSheet, View } from "react-native";
import My_first_proj from "./my_first_proj";

export default function App() {
  return (
    <View style={styles.container}>
      <My_first_proj />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
