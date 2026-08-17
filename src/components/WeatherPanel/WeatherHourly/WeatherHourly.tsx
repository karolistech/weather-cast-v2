import type { WeatherHourly } from "@/api/weather";
import { formatTime } from "@/utils/dateTime";

import "./WeatherHourly.css";
import sprite from "@/assets/icons/sprite.svg";

type WeatherHourlyProps = {
  hours: WeatherHourly[];
};

type HourProps = {
  hour: WeatherHourly;
};

export default function WeatherHourly({ hours }: WeatherHourlyProps) {
  return (
    <div className="weather-hourly">
      <h2 className="weather-hourly__title">Hourly Forecast</h2>

      <div className="weather-hourly__hours">
        {hours.map((hour, i) => (
          <Hour key={i} hour={hour} />
        ))}
      </div>
    </div>
  );
}

function Hour({ hour }: HourProps) {
  return (
    <div className="weather-hourly__hour">
      <span className="weather-hourly__time">
        {formatTime(hour.dateTime)}
      </span>

      <div className="weather-hourly__metric">
        <svg className="weather-hourly__metric-icon">
          <use href={`${sprite}#temperature`} />
        </svg>

        <span className="weather-hourly__metric-value">
          {hour.temp}°
        </span>
      </div>

      <div className="weather-hourly__metric">
        <svg className="weather-hourly__metric-icon">
          <use href={`${sprite}#rain-chance`} />
        </svg>

        <span className="weather-hourly__metric-value">
          {hour.rainChance}%
        </span>
      </div>
    </div>
  );
}
