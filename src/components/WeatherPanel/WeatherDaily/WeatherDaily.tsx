import { type WeatherDaily, getWeatherCondition, getWeatherIcon } from "@/api/weather";
import { formatWeekday } from "@/utils/dateTime";

import "./WeatherDaily.css";
import sprite from "@/assets/icons/sprite.svg";

type WeatherDailyProps = {
  days: WeatherDaily[];
};

type DayProps = {
  day: WeatherDaily;
  isToday: boolean;
};

export default function WeatherDaily({ days }: WeatherDailyProps) {
  return (
    <div className="weather-daily">
      <h2 className="weather-daily__title">7-Day Forecast</h2>

      <div className="weather-daily__days">
        {days.map((day, i) => (
          <Day key={i} day={day} isToday={i === 0} />
        ))}
      </div>
    </div>
  );
}

function Day({ day, isToday }: DayProps) {
  const condition = getWeatherCondition(day.weatherCode, true);
  const icon = getWeatherIcon(condition.icon);

  return (
    <div className="weather-daily__day">
      <span className="weather-daily__weekday">
        {isToday ? "Today" : formatWeekday(day.date)}
      </span>

      <img src={icon} alt={condition.description} className="weather-daily__icon" />

      <div className="weather-daily__temps">
        <span className="weather-daily__temp weather-daily__temp--max">
          {Math.round(day.maxTemp)}°
        </span>

        <span className="weather-daily__temp weather-daily__temp--min">
          {Math.round(day.minTemp)}°
        </span>
      </div>

      <div className="weather-daily__metric">
        <svg className="weather-daily__metric-icon">
          <use href={`${sprite}#rain-chance`} />
        </svg>

        <span className="weather-daily__metric-value">
          {day.rainChance}%
        </span>
      </div>
    </div>
  );
}
