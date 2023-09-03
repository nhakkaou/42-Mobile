import WeatherApp_proj from "./weatherfinal_proj";
import { WeatherProvider } from "./context";

export default function App() {
  return (
    <WeatherProvider>
      <WeatherApp_proj />
    </WeatherProvider>
  );
}
