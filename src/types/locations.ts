export type Location = {
  name: string;
  lat: number;
  lon: number;
};

export type Locations = {
  current: Location;
  pinned: Location;
  saved: Location[];
};
