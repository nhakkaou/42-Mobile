import WeatherApp_proj from "./weatherAppV 2proj";
import { WeatherProvider } from "./context";
export default function App() {
  return (
    <WeatherProvider>
      <WeatherApp_proj />
    </WeatherProvider>
  );
}
