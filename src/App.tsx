import { LocationsProvider, useLocations } from "./contexts/LocationsContext";
import { SettingsProvider, useSettings } from "./contexts/SettingsContext";

import { useWeather } from "./hooks/useWeather";

import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import Header from "./components/Header/Header";
import WeatherPanel from "./components/WeatherPanel/WeatherPanel";

import "./App.css";

export default function App() {
  return (
    <LocationsProvider>
      <SettingsProvider>
        <AppContent />
      </SettingsProvider>
    </LocationsProvider>
  );
}

function AppContent() {
  const { locations } = useLocations();
  const { tempUnit } = useSettings();
  const { weather, updateWeather } = useWeather(locations.current, tempUnit);

  if (weather === null) return <LoadingScreen />;

  return (
    <div className="app">
        <Header />
        <WeatherPanel weather={weather} updateWeather={updateWeather} />
    </div>
  );
}
