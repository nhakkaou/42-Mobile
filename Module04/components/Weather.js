import React from "react";
import { Image } from "react-native";
import { getWeatherIcon } from "../utils";

const Weather = ({ Weather_code, size }) => {
  const weather = getWeatherIcon(Weather_code);
  return (
    <>
      {weather && (
        <Image
          source={weather}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      )}
    </>
  );
};

export default Weather;
