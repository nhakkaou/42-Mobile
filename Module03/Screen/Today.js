import { useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { WeatherContext } from "../context";
import WeatherCard from "../components/WeatherCard";
import Chart from "../components/Chart";

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
  console.log(result.hourly);
  return error === "" ? (
    <View style={styles.container}>
      <Text style={styles.text}>{searchLocation?.city}</Text>
      <Text style={{ color: "#fff" }}>{searchLocation?.state}</Text>
      <Text style={{ color: "#fff" }}>{searchLocation?.country}</Text>
      <Chart
        labels={result?.hourly?.time}
        data={result?.hourly?.temperature_2m}
      />

      <FlatList
        data={result?.hourly?.time}
        renderItem={({ item, index }) => (
          <WeatherCard
            time={item}
            temperature={result?.hourly?.temperature_2m[index]}
            weather_code={result?.hourly?.weathercode[index]}
            windSpeed={result?.hourly?.windspeed_10m[index]}
          />
        )}
        keyExtractor={(item) => item}
        horizontal
      />
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
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  containerError: {
    flex: 1,
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
