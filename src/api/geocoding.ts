export type Location = {
  id: number;
  name: string;
  lat: number;
  lon: number;
  country: string;
  countryCode: string;
  region?: string;
};

type OpenMeteoResponse = {
  results?: {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country?: string;
    country_code?: string;
    admin1?: string;
    population?: number;
  }[];
};

const baseUrl = "https://geocoding-api.open-meteo.com/v1/search";

export async function searchLocations(query: string): Promise<Location[]> {
  const params = new URLSearchParams();

  params.set("name", query);
  params.set("count", "8");

  const response = await fetch(`${baseUrl}?${params}`);

  if (!response.ok) {
    throw new Error(`Search request failed with the status code ${response.status}`);
  }

  const data: OpenMeteoResponse = await response.json();

  const locations: Location[] = [];

  for (const location of data.results ?? []) {
    if (location.population === undefined) continue;
    if (location.country === undefined) continue;
    if (location.country_code === undefined) continue;

    locations.push({
      id: location.id,
      name: location.name,
      lat: location.latitude,
      lon: location.longitude,
      country: location.country,
      countryCode: location.country_code.toLowerCase(),
      region: location.admin1
    });
  }

  return locations;
}

export function getLocationFlag(countryCode: string): string {
  return `https://open-meteo.com/images/country-flags/${countryCode}.svg`;
}
