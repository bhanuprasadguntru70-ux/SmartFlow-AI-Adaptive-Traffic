import L from 'leaflet';

export interface MapTileConfig {
  url: string;
  attribution: string;
  maxZoom: number;
  tileSize?: number;
}

export class MapService {
  private mapboxToken: string;

  constructor() {
    this.mapboxToken = (import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string) || '';
  }

  public hasMapboxToken(): boolean {
    return Boolean(this.mapboxToken && this.mapboxToken.trim().length > 10);
  }

  public getBaseTileConfig(): MapTileConfig {
    if (this.hasMapboxToken()) {
      return {
        url: `https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/256/{z}/{x}/{y}@2x?access_token=${this.mapboxToken}`,
        attribution:
          '&copy; <a href="https://www.mapbox.com/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
        tileSize: 256,
      };
    }

    // Default: OpenStreetMap (Zero API key required, reliable worldwide)
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    };
  }

  public getTrafficTileConfig(): MapTileConfig | null {
    if (this.hasMapboxToken()) {
      return {
        url: `https://api.mapbox.com/styles/v1/mapbox/traffic-day-v2/tiles/256/{z}/{x}/{y}@2x?access_token=${this.mapboxToken}`,
        attribution:
          '&copy; <a href="https://www.mapbox.com/">Mapbox Traffic</a>',
        maxZoom: 19,
        tileSize: 256,
      };
    }
    return null;
  }

  /**
   * Generates custom SVG div icons for Leaflet markers
   */
  public createCustomMarkerIcon(
    type: 'intersection' | 'hospital' | 'emergency' | 'incident',
    label?: string,
    color?: string
  ): L.DivIcon {
    let bg = color || '#3b82f6';
    let iconSvg = '';

    if (type === 'intersection') {
      bg = color || '#10b981';
      iconSvg = `<svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 2v20m10-10H2"/></svg>`;
    } else if (type === 'hospital') {
      bg = '#ef4444';
      iconSvg = `<svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 6v12m6-6H6"/></svg>`;
    } else if (type === 'emergency') {
      bg = '#e11d48';
      iconSvg = `<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`;
    } else if (type === 'incident') {
      bg = '#f59e0b';
      iconSvg = `<svg class="w-3.5 h-3.5 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`;
    }

    const html = `
      <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
        <div style="background-color: ${bg}; width: 26px; height: 26px; border-radius: 9999px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.3); border: 2px solid #ffffff;">
          ${iconSvg}
        </div>
        ${
          label
            ? `<div style="background: rgba(15,23,42,0.85); color: #ffffff; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px; margin-top: 3px; white-space: nowrap; border: 1px solid rgba(255,255,255,0.2); pointer-events: none;">${label}</div>`
            : ''
        }
      </div>
    `;

    return L.divIcon({
      html,
      className: 'smartflow-custom-marker',
      iconSize: [30, 44],
      iconAnchor: [15, 15],
      popupAnchor: [0, -18],
    });
  }
}

export const mapService = new MapService();
