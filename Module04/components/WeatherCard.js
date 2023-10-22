import React from "react";
import Weather from "./Weather";
import { StyleSheet, View, Text } from "react-native";
const WeatherCard = ({ weather_code, temperature, time, windSpeed }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.wind}>{time}</Text>
      <View style={{ width: 70, height: 70 }}>
        <Weather Weather_code={weather_code} size="s" />
      </View>
      <Text style={styles.temperature}>{temperature}°C</Text>
      <Text style={styles.wind}>{windSpeed}km/h</Text>
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
  wind: {
    fontSize: 15,
    color: "#fff",
  },
});
export default WeatherCard;
