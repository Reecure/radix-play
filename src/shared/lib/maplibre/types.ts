import type { Map, MapOptions, LngLatLike } from 'maplibre-gl';

export interface MapConfig {
    center: LngLatLike;
    zoom: number;
    minZoom?: number;
    maxZoom?: number;
    maxBounds?: MapOptions['maxBounds'];
    renderWorldCopies?: boolean;
}

export interface MapContextValue {
    map: Map | null;
    isLoaded: boolean;
    isStyleLoaded: boolean;
}

export type MapReadyCallback = (map: Map) => void | (() => void);