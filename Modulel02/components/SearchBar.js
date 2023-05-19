import { getCities } from "../api";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Cities from "./Cities";
import { useState, useContext } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { WeatherContext } from "../context";

export default SearchBar = () => {
  const { setError, getLocation, setLocation } = useContext(WeatherContext);
  const [text, setText] = useState("");
  const [citiesData, setCities] = useState([]);
  const [visible, setVisible] = useState(false);
  const setNewLocation = (obj) => {
    setLocation(obj);
    setVisible(false);
  };

  const fetchData = async (v) => {
    try {
      setText(v);
      if (v.length === 0) {
        setCities([]);
        return;
      }
      if (v.length > 2) {
        const cities = await getCities(v);
        if (cities) {
          setCities([...cities]);
          setError("");
        } else {
          setError(
            "Could not find any results for the supplied address or coordinates"
          );
        }
      }
    } catch (error) {
      setError(
        "The service connection is lost. Please check your internet connection or try again later."
      );
    }
  };

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <View style={styles.searchSection}>
        <FontAwesome
          style={styles.searchIcon}
          name="search"
          size={20}
          color="#fff"
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          underlineColorAndroid="transparent"
          value={text}
          onChangeText={fetchData}
          onFocus={() => setVisible(true)}
          onBlur={() => setVisible(false)}
          onSubmitEditing={() =>
            setLocation({
              city: citiesData[0]?.name,
              country: citiesData[0]?.country,
              state: citiesData[0]?.admin1,
              timezone: citiesData[0]?.timezone,
              lt: citiesData[0]?.latitude,
              lg: citiesData[0]?.longitude,
            })
          }
        />
        <TouchableOpacity onPress={getLocation}>
          <FontAwesome
            style={styles.searchIcon}
            name="map-marker"
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
        <Cities
          array={citiesData}
          visible={visible}
          setMyLocation={setNewLocation}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  searchIcon: {
    // padding: 10,
  },
  input: {
    padding: 10,
    width: "90%",
    color: "#fff",
  },
});
