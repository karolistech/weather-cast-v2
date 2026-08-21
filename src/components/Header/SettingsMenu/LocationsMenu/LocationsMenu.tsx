import { useLocations } from "@/contexts/LocationsContext";

import "./LocationsMenu.css";
import sprite from "@/assets/icons/sprite.svg";

type LocationsMenuProps = {
  closeLocations: () => void;
};

export default function LocationsMenu({ closeLocations }: LocationsMenuProps) {
  const { locations, selectLocation, pinLocation, saveLocation, removeLocation } = useLocations();

  return (
    <>
      <div className="locations-menu__backdrop" />

      <div className="locations-menu">
        <header className="locations-menu__header">
          <h2 className="locations-menu__title">Locations Menu</h2>

          <button className="locations-menu__button locations-menu__button--close" onClick={closeLocations}>
            <svg className="locations-menu__icon">
              <use href={`${sprite}#close`} />
            </svg>
          </button>
        </header>

        <div className="locations-menu__section">
          <h3 className="locations-menu__section-title">Current Location</h3>

          <div className="locations-menu__current">
            <span className="locations-menu__current-name">
              {locations.current.name}
            </span>

            <div className="locations-menu__current-actions">
              <button className="locations-menu__button" onClick={saveLocation}>
                <svg className="locations-menu__icon locations-menu__icon--save">
                  <use href={`${sprite}#save`} />
                </svg>
              </button>

              <button className="locations-menu__button" onClick={pinLocation}>
                <svg className="locations-menu__icon locations-menu__icon--pin">
                  <use href={`${sprite}#pin`} />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="locations-menu__section">
          <h3 className="locations-menu__section-title">Pinned Location</h3>

          <span className="locations-menu__pinned-name" onClick={() => selectLocation(locations.pinned)}>
            {locations.pinned.name}
          </span>
        </div>

        <div className="locations-menu__section">
          <h3 className="locations-menu__section-title">Saved Locations</h3>

          <ul className="locations-menu__saved">
            {locations.saved.map(location => (
              <li key={location.id} className="locations-menu__saved-location" onClick={() => selectLocation(location)}>
                <span className="locations-menu__saved-name">
                  {location.name}
                </span>

                <button
                  className="locations-menu__button"
                  onClick={e => {e.stopPropagation(); removeLocation(location.id)}}
                >
                  <svg className="locations-menu__icon locations-menu__icon--remove">
                    <use href={`${sprite}#clear`} />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
