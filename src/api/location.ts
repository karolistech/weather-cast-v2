import type { Location } from "@/types/locations";

type ApiIpResponse = {
  city: string;
  cityGeoNameId: number;
  latitude: number;
  longitude: number;
};

const url = "https://apiip.net/api/check?&accessKey=d9e9de8a-6d77-4934-8db0-a7e944865788";

export async function fetchLocation(): Promise<Location> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Location request failed with the status code ${response.status}`);
  }

  const data: ApiIpResponse = await response.json();

  console.log(response);
  console.log(data);

  return {
    id: data.cityGeoNameId,
    name: data.city,
    lat: data.latitude,
    lon: data.longitude
  };
}
