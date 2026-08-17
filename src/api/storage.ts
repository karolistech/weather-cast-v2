import type { Location } from "@/types/locations";
import type { Theme } from "@/types/theme";
import type { TempUnit } from "@/types/tempUnit";

type Locations = {
  pinned: Location;
  saved: Location[];
};

const keys = {
  locations: "locations",
  tempUnit: "tempUnit",
  theme: "theme"
};

export const storage = {
  saveLocations(locations: Locations) {
    localStorage.setItem(keys.locations, JSON.stringify(locations));
  },

  loadLocations(): Locations | null {
    const value = localStorage.getItem(keys.locations);

    return value === null ? null : JSON.parse(value);
  },

  saveTempUnit(tempUnit: TempUnit) {
    localStorage.setItem(keys.tempUnit, tempUnit);
  },

  loadTempUnit(): TempUnit | null {
    const value = localStorage.getItem(keys.tempUnit);

    return value === "celsius" || value === "fahrenheit" ? value : null;
  },

  saveTheme(theme: Theme) {
    localStorage.setItem(keys.theme, theme);
  },

  loadTheme(): Theme | null {
    const value = localStorage.getItem(keys.theme);

    return value === "light" || value === "dark" ? value : null;
  }
};
