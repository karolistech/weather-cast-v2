import type { WeatherLocation } from "@/api/weather";

import "./WeatherLocation.css";
import sprite from "@/assets/icons/sprite.svg";

type WeatherLocationProps = {
  location: WeatherLocation;
  updateWeather: () => void;
};

export default function WeatherLocation({ location, updateWeather }: WeatherLocationProps) {
  const date = new Date().toLocaleDateString(undefined, {
    weekday: "short", month: "long", day: "numeric", timeZone: location.timezone
  });

  const time = new Date().toLocaleTimeString(undefined, {
    hour: "numeric", minute: "2-digit", timeZone: location.timezone
  });

  return (
    <div className="weather-location">
      <div className="weather-location__location">
        <svg className="weather-location__icon">
          <use href={`${sprite}#location`} />
        </svg>

        <span className="weather-location__location-name">
          {location.name}
        </span>
      </div>

      <div className="weather-location__datetime">
        <span className="weather-location__datetime-value">
          {`${date} ${time}`}
        </span>

        <button className="weather-location__btn" onClick={updateWeather}>
          <svg className="weather-location__icon weather-location__icon--update">
            <use href={`${sprite}#update`} />
          </svg>
        </button>
      </div>
    </div>
  );
}
