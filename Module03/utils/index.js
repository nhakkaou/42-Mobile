export const getWeatherDescription = (code) => {
  switch (code) {
    case 0:
      return "Clear";
    case 1:
    case 2:
    case 3:
      return "Overcast";
    case 45:
    case 48:
      return "Fog";
    case 51:
    case 53:
    case 55:
      return "Drizzle";
    case 56:
    case 57:
      return "Freezing Drizzle";
    case 61:
    case 63:
    case 65:
      return "Rain";
    case 66:
    case 67:
      return "Freezing Rain";
    case 71:
    case 73:
    case 75:
      return "Snow fall";
    case 77:
      return "Snow grains";
    case 80:
    case 81:
    case 82:
      return "Rain showers";
    case 85:
    case 86:
      return "Snow showers";
    case 95:
      return "Thunderstorm";
    case 96:
    case 99:
      return "Thunderstorm with slight and heavy hail";
    default:
      return "Unknown weather";
  }
};

export function getWeatherIcon(code) {
  switch (code) {
    case 0:
      return require("../assets/sunny.png");
    case 1:
    case 2:
    case 3:
      return require("../assets/cloudy.png");
    case 45:
    case 48:
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
    case 85:
    case 86:
      return require("../assets/rain-light.png");
    case 71:
    case 73:
    case 75:
    case 77:
      return require("../assets/snowy.png");
    case 95:
    case 96:
    case 99:
      return require("../assets/thunder.png");
    case 100:
      return require("../assets/windy.png");
    default:
      return require("../assets/cloudy.png");
  }
}
