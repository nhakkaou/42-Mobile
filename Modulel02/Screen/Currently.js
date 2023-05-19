import { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { WeatherContext } from "../context";
import { getWeatherDescription } from "../utils";
export default Currently = ({}) => {
  const { error, searchLocation, result } = useContext(WeatherContext);
  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "center" }}>
        <Text style={styles.error}>{error}</Text>
      </View>
      {error === "" && (
        <>
          {result.current_weather && (
            <>
              <Text style={styles.textTemp}>
                {result?.current_weather?.temperature}°C
              </Text>
              <Text style={styles.textWind}>
                {result?.current_weather?.windspeed}km/h
              </Text>
              <Text style={styles.textWindType}>
                {getWeatherDescription(result?.current_weather?.weathercode)}
              </Text>
            </>
          )}
          <Text style={styles.text}>{searchLocation?.city}</Text>
          <Text style={{ color: "#fff" }}>{searchLocation?.state}</Text>
          <Text style={{ color: "#fff" }}>{searchLocation?.country}</Text>
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
  textTemp: {
    fontSize: 70,
    color: "#fff",
  },
  textWind: { fontSize: 20, fontWeight: "400", color: "#fff" },
  textWindType: { fontSize: 13, fontWeight: "400", color: "grey" },
});
