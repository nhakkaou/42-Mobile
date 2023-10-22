import { useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { WeatherContext } from "../context";
import { getWeatherDescription } from "../utils";

const Item = ({ time, temperatureMax, temperatureMin, weather }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.itemDetails}>{time}</Text>
      <Text style={styles.itemDetails}>{temperatureMin}°C</Text>
      <Text style={styles.itemDetails}>{temperatureMax}°C</Text>
      <Text style={styles.itemDetails}>{getWeatherDescription(weather)}</Text>
    </View>
  );
};
export default Weekly = ({}) => {
  const { error, searchLocation, result } = useContext(WeatherContext);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.error}>{error}</Text>
      </View>
      {error === "" && (
        <>
          <Text style={styles.text}>{searchLocation?.city}</Text>
          <Text style={{ color: "#fff" }}>{searchLocation?.state}</Text>
          <Text style={{ color: "#fff" }}>{searchLocation?.country}</Text>
          <FlatList
            data={result?.daily?.time}
            renderItem={({ item, index }) => (
              <Item
                time={item}
                temperatureMax={result?.daily?.temperature_2m_max[index]}
                temperatureMin={result?.daily?.temperature_2m_min[index]}
                weather={result?.daily?.weathercode[index]}
              />
            )}
            keyExtractor={(item) => item}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e212a",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  error: {
    color: "red",
    fontSize: 15,
  },
  item: {
    flexDirection: "row",
    flex: 1,
    gap: 30,
    marginBottom: 20,
  },
  itemDetails: {
    color: "#fff",
    fontSize: 16,
  },
});
