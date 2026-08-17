import type { Weather } from "@/api/weather";

import WeatherLocation from "./WeatherLocation/WeatherLocation";
import WeatherCurrent from "./WeatherCurrent/WeatherCurrent";
import WeatherHourly from "./WeatherHourly/WeatherHourly";
import WeatherDaily from "./WeatherDaily/WeatherDaily";

type WeatherPanelProps = {
  weather: Weather;
  updateWeather: () => void;
};

export default function WeatherPanel({ weather, updateWeather }: WeatherPanelProps) {
  return (
    <div className="weather-panel">
      <WeatherLocation location={weather.location} updateWeather={updateWeather} />
      <WeatherCurrent current={weather.current} />
      <WeatherHourly hours={weather.hourly} />
      <WeatherDaily days={weather.daily} />
    </div>
  );
}
