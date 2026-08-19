import { type ReactNode, createContext, useContext, useEffect, useReducer } from "react";

import type { Location, Locations } from "@/types/locations";

import { fetchLocation } from "@/api/location";
import { storage } from "@/api/storage";

import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";

type Action =
  | { type: "INIT"; locations: Locations }
  | { type: "SELECT"; location: Location }
  | { type: "PIN" }
  | { type: "SAVE" }
  | { type: "REMOVE"; id: number };

function locationsReducer(state: Locations | null, action: Action): Locations | null {
  if (action.type === "INIT") return action.locations;
  if (state === null) return state;

  switch (action.type) {
    case "SELECT":
      return { ...state, current: action.location };

    case "PIN":
      return { ...state, pinned: state.current };

    case "SAVE":
      const saved = state.saved.some(location => location.id === state.current.id);

      if (saved === true) return state;

      return { ...state, saved: [...state.saved, state.current] };

    case "REMOVE":
      return { ...state, saved: state.saved.filter(location => location.id !== action.id) };
  }
}

type LocationsContext = {
  locations: Locations;
  selectLocation: (location: Location) => void;
  pinLocation: () => void;
  saveLocation: () => void;
  removeLocation: (id: number) => void;
};

const LocationsContext = createContext<LocationsContext | null>(null);

export function LocationsProvider({ children }: { children: ReactNode }) {
  const [locations, dispatch] = useReducer(locationsReducer, null);

  useEffect(() => {
    async function init() {
      try {
        const stored = storage.loadLocations();

        if (stored) {
          dispatch({
            type: "INIT",
            locations: { current: stored.pinned, pinned: stored.pinned, saved: stored.saved }
           });

           return;
        }

        const location = await fetchLocation();

        dispatch({
          type: "INIT",
          locations: { current: location, pinned: location, saved: [] }
        });
      } catch (error) {
        console.error(error);
      }
    }

    init();
  }, []);

  useEffect(() => {
    if (locations === null) return;

    storage.saveLocations({ pinned: locations.pinned, saved: locations.saved });
  }, [locations]);

  if (locations === null) return <LoadingScreen />;

  const value: LocationsContext = {
    locations: locations,
    selectLocation: location => dispatch({ type: "SELECT", location: location }),
    pinLocation: () => dispatch({ type: "PIN" }),
    saveLocation: () => dispatch({ type: "SAVE" }),
    removeLocation: id => dispatch({ type: "REMOVE", id })
  };

  return (
    <LocationsContext value={value}>
      {children}
    </LocationsContext>
  );
}

export function useLocations() {
  const context = useContext(LocationsContext);

  if (context === null) {
    throw new Error("useLocations must be used within a LocationsProvider");
  }

  return context;
}
