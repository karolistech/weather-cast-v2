import { type ReactNode, createContext, useContext, useEffect, useState } from "react";

import type { Theme } from "@/types/theme";
import type { TempUnit } from "@/types/tempUnit";

import { storage } from "@/api/storage";

type SettingsContext = {
  theme: Theme;
  tempUnit: TempUnit;
  toggleTheme: () => void;
  toggleTempUnit: () => void;
};

const SettingsContext = createContext<SettingsContext | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => storage.loadTheme() ?? "light");
  const [tempUnit, setTempUnit] = useState<TempUnit>(() => storage.loadTempUnit() ?? "celsius");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    storage.saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    storage.saveTempUnit(tempUnit);
  }, [tempUnit]);

  function toggleTheme() {
    setTheme(theme => theme === "light" ? "dark" : "light");
  }

  function toggleTempUnit() {
    setTempUnit(unit => unit === "celsius" ? "fahrenheit" : "celsius");
  }

  return (
    <SettingsContext value={{ theme, tempUnit, toggleTheme, toggleTempUnit }}>
      {children}
    </SettingsContext>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);

  if (context === null) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }

  return context;
}
