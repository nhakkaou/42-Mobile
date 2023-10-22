import React from "react";
import Weather from "./Weather";
import { StyleSheet, View, Text } from "react-native";
const WeatherWeeklyCard = ({
  weather_code,
  temperatureMax,
  temperatureMin,
  time,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.time}>{time}</Text>
      <View style={{ width: 70, height: 70 }}>
        <Weather Weather_code={weather_code} size="s" />
      </View>
      <Text style={styles.temperature}>{temperatureMax}°C</Text>
      <Text style={styles.lowTemp}>{temperatureMin}°C</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  temperature: {
    fontSize: 18,
    color: "#fff",
  },
  lowTemp: {
    fontSize: 18,
    color: "#C0C0C0",
  },
  time: {
    fontSize: 15,
    color: "#fff",
  },
});
export default WeatherWeeklyCard;
