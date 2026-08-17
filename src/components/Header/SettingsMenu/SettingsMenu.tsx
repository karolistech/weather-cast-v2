import { useState } from "react";

import { useSettings } from "@/contexts/SettingsContext";

import LocationsMenu from "./LocationsMenu/LocationsMenu";

import "./SettingsMenu.css";
import sprite from "@/assets/icons/sprite.svg";

export default function SettingsMenu() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { theme, tempUnit, toggleTheme, toggleTempUnit } = useSettings();
  const [locationsOpen, setLocationsOpen] = useState(false);

  function toggleSettings() {
    setSettingsOpen(open => !open);
  }

  function openLocations() {
    setLocationsOpen(true);
  }

  function closeLocations() {
    setLocationsOpen(false);
  }

  return (
    <div className="settings-menu">
      <button className="settings-menu__btn" onClick={toggleSettings}>
        <svg className="settings-menu__btn-icon">
          <use href={`${sprite}#settings`} />
        </svg>
      </button>

      {settingsOpen && (
        <div className="settings-menu__settings">
          <button className="settings-menu__setting" onClick={toggleTempUnit}>
            <svg className="settings-menu__setting-icon">
              <use href={`${sprite}#thermometer`} />
            </svg>

            <span className="settings-menu__setting-label">
              {tempUnit === "celsius" ? "Celsius" : "Fahrenheit"}
            </span>
          </button>

          <button className="settings-menu__setting" onClick={toggleTheme}>
            <svg className="settings-menu__setting-icon">
              <use href={`${sprite}#${theme === "light" ? "light-theme" : "dark-theme"}`} />
            </svg>

            <span className="settings-menu__setting-label">
              {theme === "light" ? "Light theme" : "Dark theme"}
            </span>
          </button>

          <button className="settings-menu__setting" onClick={openLocations}>
            <svg className="settings-menu__setting-icon">
              <use href={`${sprite}#location`} />
            </svg>

            <span className="settings-menu__setting-label">
              Locations
            </span>
          </button>

          {locationsOpen && <LocationsMenu closeLocations={closeLocations} />}
        </div>
      )}
    </div>
  );
}
