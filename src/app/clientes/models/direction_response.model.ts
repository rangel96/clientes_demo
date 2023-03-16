// To parse this data:
//
//   import { Convert } from "./file";
//
//   const directions = Convert.toDirections(json);

export interface Direction {
  latitude:           number;
  longitude:          number;
  type:               string;
  name:               string;
  number:             string;
  postalCode:         null;
  street:             string;
  confidence:         number;
  region:             string;
  regionCode:         string;
  county:             string;
  locality:           string;
  administrativeArea: null;
  neighbourhood:      null;
  country:            string;
  countryCode:        string;
  continent:          string;
  label:              string;
  mapURL:             string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toDirections(json: string): Direction[] {
    return JSON.parse(json);
  }

  public static directionsToJson(value: Direction[]): string {
    return JSON.stringify(value);
  }
}
