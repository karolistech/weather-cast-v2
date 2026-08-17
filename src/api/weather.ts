import type { Location } from "@/types/locations";
import type { TempUnit } from "@/types/tempUnit";

const icons = import.meta.glob<string>("/src/assets/icons/*.svg", {
  eager: true,
  import: "default"
});

export type WeatherLocation = {
  name: string;
  timezone: string;
};

export type WeatherCurrent = {
  weatherCode: number;
  isDay: boolean;
  temp: number;
  tempUnit: string;
  apparentTemp: number;
  maxTemp: number;
  minTemp: number;
  sunrise: string;
  sunset: string;
  rainChance: number;
  humidity: number;
  cloudCover: number;
  uvIndex: number;
  windSpeed: number;
  surfacePressure: number;
};

export type WeatherHourly = {
  dateTime: string;
  temp: number;
  rainChance: number;
};

export type WeatherDaily = {
  date: string;
  weatherCode: number;
  minTemp: number;
  maxTemp: number;
  rainChance: number;
};

export type Weather = {
  location: WeatherLocation;
  current: WeatherCurrent;
  hourly: WeatherHourly[];
  daily: WeatherDaily[];
};

type OpenMeteoResponse = {
  timezone: string;

  current_units: {
    temperature_2m: string;
  };

  current: {
    time: string;
    weather_code: number;
    is_day: number;
    temperature_2m: number;
    apparent_temperature: number;
    precipitation_probability: number;
    relative_humidity_2m: number;
    cloud_cover: number;
    uv_index: number;
    wind_speed_10m: number;
    surface_pressure: number;
  };

  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation_probability: number[];
  };

  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_min: number[];
    temperature_2m_max: number[];
    sunrise: string[];
    sunset: string[];
    precipitation_probability_max: number[];
  };
};

const baseUrl = "https://api.open-meteo.com/v1/forecast";

export async function fetchWeather(location: Location, tempUnit: TempUnit): Promise<Weather> {
  const params = new URLSearchParams();

  params.set("latitude", String(location.lat));
  params.set("longitude", String(location.lon));

  params.set("timezone", "auto");
  params.set("temperature_unit", tempUnit);
  params.set("wind_speed_unit", "ms");

  params.set("current", [
    "weather_code", "is_day", "temperature_2m", "apparent_temperature",
    "precipitation_probability", "relative_humidity_2m", "cloud_cover",
    "uv_index", "wind_speed_10m", "surface_pressure"
  ].join(","));

  params.set("hourly", ["temperature_2m", "precipitation_probability"].join(","));

  params.set("daily", [
    "weather_code", "temperature_2m_min", "temperature_2m_max", "sunrise",
    "sunset", "precipitation_probability_max"
  ].join(","));

  const response = await fetch(`${baseUrl}?${params}`);

  if (!response.ok) {
    throw new Error(`Weather request failed with the status code ${response.status}`);
  }

  const data: OpenMeteoResponse = await response.json();

  const { timezone, current_units, current, hourly, daily } = data;

  const localTime = new Date(current.time);
  const startIndex = hourly.time.findIndex(time => new Date(time) > localTime);

  return {
    location: {
      name: location.name,
      timezone: timezone
    },

    current: {
      weatherCode: current.weather_code,
      isDay: current.is_day === 1,
      temp: current.temperature_2m,
      tempUnit: current_units.temperature_2m,
      apparentTemp: current.apparent_temperature,
      maxTemp: daily.temperature_2m_max[0],
      minTemp: daily.temperature_2m_min[0],
      sunrise: daily.sunrise[0],
      sunset: daily.sunset[0],
      rainChance: current.precipitation_probability,
      humidity: current.relative_humidity_2m,
      cloudCover: current.cloud_cover,
      uvIndex: current.uv_index,
      windSpeed: current.wind_speed_10m,
      surfacePressure: current.surface_pressure
    },

    hourly: Array.from({ length: 7 }, (_, i) => ({
      dateTime: hourly.time[startIndex + i * 2],
      temp: hourly.temperature_2m[startIndex + i * 2],
      rainChance: hourly.precipitation_probability[startIndex + i * 2]
    })),

    daily: Array.from({ length: 7 }, (_, i) => ({
      date: daily.time[i],
      weatherCode: daily.weather_code[i],
      minTemp: daily.temperature_2m_min[i],
      maxTemp: daily.temperature_2m_max[i],
      rainChance: daily.precipitation_probability_max[i]
    }))
  };
}

export function getWeatherCondition(code: number, isDay: boolean): { description: string, icon: string } {
  const conditions = [
    { codes: [0], description: "Clear sky", icon: "clear" },
    { codes: [1, 2], description: "Partly cloudy", icon: "partly-cloudy" },
    { codes: [3], description: "Overcast", icon: "overcast" },
    { codes: [45], description: "Fog", icon: "fog" },
    { codes: [48], description: "Depositing rime fog", icon: "rime-fog" },
    { codes: [51, 56], description: "Light drizzle", icon: "rain" },
    { codes: [53], description: "Moderate drizzle", icon: "rain" },
    { codes: [55, 57], description: "Dense drizzle", icon: "rain-heavy" },
    { codes: [61, 66, 80], description: "Light rain", icon: "rain" },
    { codes: [63, 81], description: "Moderate rain", icon: "rain" },
    { codes: [65, 67, 82], description: "Heavy rain", icon: "rain-heavy" },
    { codes: [71], description: "Slight snowfall", icon: "snow" },
    { codes: [73], description: "Moderate snowfall", icon: "snow" },
    { codes: [75], description: "Heavy snowfall", icon: "snow" },
    { codes: [77], description: "Snow grains", icon: "snow-grains" },
    { codes: [85], description: "Slight snow showers", icon: "snow-showers" },
    { codes: [86], description: "Heavy snow showers", icon: "snow-showers-heavy" },
    { codes: [95, 96], description: "Thunderstorm", icon: "thunderstorm" },
    { codes: [99], description: "Thunderstorm with hail", icon: "thunderstorm-hail" }
  ];

  const condition = conditions.find(condition => condition.codes.includes(code));

  if (condition === undefined) {
    throw new Error(`Weather code "${code}" was not found`);
  }

  const prefix = isDay ? "day-" : "night-";

  return {
    description: condition.description,
    icon: `${prefix}${condition.icon}`
  };
}

export function getWeatherIcon(name: string): string {
  const path = icons[`/src/assets/icons/${name}.svg`];

  if (path === undefined) {
    throw new Error(`Weather icon "${name}" was not found`);
  }

  return path;
}
