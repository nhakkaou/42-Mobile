import axios from "axios";

export const getCities = async (text) => {
  const result = await axios.get(
    `https://geocoding-api.open-meteo.com/v1/search?name=${text}`
  );
  return result?.data?.results;
};

export const getMyLocation = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    );
    return response?.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
