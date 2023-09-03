import { useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { WeatherContext } from "../context";
import { getWeatherDescription } from "../utils";
import Chart from "../components/ChartWeekly";
import WeatherWeeklyCard from "../components/WeatherWeeklyCard";

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
          <Chart
            labels={result?.daily?.time}
            firstData={result?.daily?.temperature_2m_max}
            secondData={result?.daily?.temperature_2m_min}
          />
          <FlatList
            data={result?.daily?.time}
            renderItem={({ item, index }) => (
              <WeatherWeeklyCard
                time={item}
                temperatureMax={result?.daily?.temperature_2m_max[index]}
                temperatureMin={result?.daily?.temperature_2m_min[index]}
                weather_code={result?.daily?.weathercode[index]}
              />
            )}
            keyExtractor={(item) => item}
            horizontal
            contentContainerStyle={{
              gap: 20,
            }}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
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
