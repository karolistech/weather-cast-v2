import { type ChangeEvent, useState } from "react";

import { type Location, searchLocations, getLocationFlag } from "@/api/geocoding";

import { useLocations } from "@/contexts/LocationsContext";

import "./SearchBar.css";
import sprite from "@/assets/icons/sprite.svg";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [locations, setLocations] = useState<Location[]>([]);
  const { selectLocation } = useLocations();

  async function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;

    setQuery(value);

    try {
      const locations = await searchLocations(value);

      setLocations(locations);
    } catch (error) {
      console.error(error);
    }
  }

  function clearSearch() {
    setQuery("");
    setLocations([]);
  }

  function handleSelectLocation(location: Location) {
    selectLocation({ id: location.id, name: location.name, lat: location.lat, lon: location.lon });
    clearSearch();
  }

  return (
    <div className="search-bar">
      <svg className="search-bar__icon search-bar__icon--search">
        <use href={`${sprite}#search`} />
      </svg>

      <input
        type="search"
        className="search-bar__input"
        placeholder="Search for a location..."
        // autoComplete="off"
        value={query}
        onChange={handleSearch}
      />

      {query !== "" && (
        <button className="search-bar__btn" onClick={clearSearch}>
          <svg className="search-bar__icon">
            <use href={`${sprite}#clear`} />
          </svg>
        </button>
      )}

      <ul className="search-bar__locations">
        {locations.map(location => (
          <Location key={location.id} location={location} selectLocation={handleSelectLocation} />
        ))}
      </ul>
    </div>
  );
}

type LocationProps = {
  location: Location;
  selectLocation: (location: Location) => void;
};

function Location({ location, selectLocation }: LocationProps) {
  const flag = getLocationFlag(location.countryCode);

  return (
    <li className="search-bar__location" onClick={() => selectLocation(location)}>
      <img src={flag} alt={`${location.country} flag`} className="search-bar__location-flag" />

      <div className="search-bar__location-data">
        <span className="search-bar__location-name">
          {location.name}
        </span>

        <span className="search-bar__location-region">
          {[location.region, location.country].filter(Boolean).join(", ")}
        </span>
      </div>
    </li>
  );
}
