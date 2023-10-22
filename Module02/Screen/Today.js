import { useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { WeatherContext } from "../context";
import { getWeatherDescription } from "../utils";

const Item = ({ time, temperature, wind, weather }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.itemDetails}>{time?.split("T")[1]}</Text>
      <Text style={styles.itemDetails}>{temperature}°C</Text>
      <Text style={styles.itemDetails}>{wind}km/h</Text>
      <Text style={styles.itemDetails}>{weather}</Text>
    </View>
  );
};
export default Today = ({}) => {
  const { error, result, searchLocation } = useContext(WeatherContext);
  return error === "" ? (
    <View style={styles.container}>
      <Text style={styles.text}>{searchLocation?.city}</Text>
      <Text style={{ color: "#fff" }}>{searchLocation?.state}</Text>
      <Text style={{ color: "#fff" }}>{searchLocation?.country}</Text>
      <View
        style={{
          width: "100%",
        }}
      >
        <FlatList
          data={result?.hourly?.time}
          renderItem={({ item, index }) => (
            <Item
              time={item}
              temperature={result?.hourly?.temperature_2m[index]}
              wind={result?.hourly?.windspeed_10m[index]}
              weather={getWeatherDescription(
                result?.hourly?.weathercode[index]
              )}
            />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  ) : (
    <View style={styles.containerError}>
      <Text style={styles.error}>{error}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e212a",
    alignItems: "center",
  },
  containerError: {
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
  textTemp: {
    fontSize: 70,
    color: "#fff",
  },
  item: {
    flexDirection: "row",
    flex: 1,
    gap: 30,
    marginBottom: 20,
    justifyContent: "space-around",
    alignItems: "center",
  },
  itemDetails: {
    color: "#fff",
    fontSize: 16,
  },
});
