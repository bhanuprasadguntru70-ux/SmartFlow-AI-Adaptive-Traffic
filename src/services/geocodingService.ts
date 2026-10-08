import { INDIA_CITIES, CityLocation } from '../data/indiaCities';

export interface GeocodeResult {
  name: string;
  lat: number;
  lng: number;
  type: string;
  city?: string;
}

export class GeocodingService {
  /**
   * Fast client-side search across all supported Indian cities,
   * key intersections, and landmark hospitals.
   */
  public searchLocationsLocally(query: string): GeocodeResult[] {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const results: GeocodeResult[] = [];

    for (const city of INDIA_CITIES) {
      if (city.name.toLowerCase().includes(q) || city.state.toLowerCase().includes(q)) {
        results.push({
          name: `${city.name}, ${city.state}`,
          lat: city.lat,
          lng: city.lng,
          type: 'City Center',
          city: city.name,
        });
      }

      for (const jn of city.keyIntersections) {
        if (jn.name.toLowerCase().includes(q) || jn.roadName.toLowerCase().includes(q)) {
          results.push({
            name: `${jn.name} (${jn.roadName})`,
            lat: jn.lat,
            lng: jn.lng,
            type: 'Intersection',
            city: city.name,
          });
        }
      }

      for (const hosp of city.hospitals) {
        if (hosp.name.toLowerCase().includes(q)) {
          results.push({
            name: `${hosp.name}`,
            lat: hosp.lat,
            lng: hosp.lng,
            type: 'Hospital / Emergency',
            city: city.name,
          });
        }
      }
    }

    return results.slice(0, 8);
  }
}

export const geocodingService = new GeocodingService();
