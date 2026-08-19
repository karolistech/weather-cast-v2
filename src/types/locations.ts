export type Location = {
  id: number;
  name: string;
  lat: number;
  lon: number;
};

export type Locations = {
  current: Location;
  pinned: Location;
  saved: Location[];
};
