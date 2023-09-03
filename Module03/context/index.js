import { createContext, useEffect, useState } from "react";
import { getMyLocation } from "../api";
import axios from "axios";
import zones from "./zones.json";
const WeatherContext = createContext();
import * as Location from "expo-location";

const WeatherProvider = ({ children }) => {
  const [searchLocation, setLocation] = useState({});
  const [result, setResultSearch] = useState({});
  const [error, setError] = useState("");
  const [myLocation, setMyLocation] = useState({
    lg: "",
    lt: "",
  });
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setError(
        "Geolocation is not available please enable it in your App seetings"
      );
      return;
    }
    let location = await Location.getCurrentPositionAsync({});

    setMyLocation({
      lt: location.coords.latitude,
      lg: location.coords.longitude,
    });
  };
  const getAllData = async () => {
    try {
      console.log(searchLocation);
      if (searchLocation.timezone !== undefined) {
        const result = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${searchLocation.lt}&longitude=${searchLocation.lg}&hourly=temperature_2m,weathercode,windspeed_10m&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=${searchLocation.timezone}`
        );

        const { hourly } = result.data;
        let time = hourly?.time?.slice(0, 24);
        time = time.map((el) => el.split("T")[1]);
        const temperature_2m = hourly?.temperature_2m?.slice(0, 24);
        const windspeed_10m = hourly?.windspeed_10m?.slice(0, 24);
        const weathercode = hourly?.weathercode?.slice(0, 24);
        const dataToday = {
          time,
          temperature_2m,
          windspeed_10m,
          weathercode,
        };
        setResultSearch({ ...result.data, hourly: dataToday });
      }
    } catch (e) {
      console.log("Error: ", e.message);
      setError(
        "The service connection is lost. Please check your internet connection or try again later."
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log(myLocation);
      if (myLocation.lt && myLocation.lg) {
        const result = await getMyLocation(myLocation.lt, myLocation.lg);
        const { address } = result;
        const { country_code } = address;
        const currentZone = zones[country_code?.toUpperCase()]?.zones[0];
        console.log(result);
        setLocation({
          city: address?.city,
          country: address?.country,
          state: address?.state,
          timezone: currentZone,
          lt: myLocation.lt,
          lg: myLocation.lg,
        });
      }
    };

    fetchData();
  }, [myLocation]);
  useEffect(() => {
    setError("");
    getAllData();
  }, [searchLocation]);
  useEffect(() => {
    getLocation();
  }, []);
  return (
    <WeatherContext.Provider
      value={{
        myLocation,
        setMyLocation,
        error,
        setError,
        searchLocation,
        setLocation,
        result,
        getLocation,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export { WeatherContext, WeatherProvider };
