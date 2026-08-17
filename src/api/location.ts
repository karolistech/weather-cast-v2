import type { Location } from "@/types/locations";

type IpApiResponse = {
  city: string;
  latitude: number;
  longitude: number;
};

const url = "https://ipapi.co/json";

export async function fetchLocation(): Promise<Location> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Location request failed with the status code ${response.status}`);
  }

  const data: IpApiResponse = await response.json();

  return {
    name: data.city,
    lat: data.latitude,
    lon: data.longitude
  };
}

// type IpWhoResponse = {
//   success: boolean;
//   message: string;
//   city: string;
//   latitude: number;
//   longitude: number;
// };

// // const url = "https://ipwho.is/";
// const url = "https://ipapi.co/json";
// // const url = "ifconfig.co/json";

// export async function fetchLocation(): Promise<Location> {
//   const response = await fetch(url);

//   if (!response.ok) {
//     throw new Error(`Location request failed with the status code ${response.status}`);
//   }

//   // console.log(response);
//   const data: IpWhoResponse = await response.json();

//   console.log(data);

//   // console.log(data);
//   // if (!data.success) {
//   //   throw new Error(data.message);
//   // }

//   return {
//     name: data.city,
//     lat: data.latitude,
//     lon: data.longitude
//   };
// }
