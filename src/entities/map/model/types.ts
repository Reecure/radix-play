import type { LngLatLike, LngLatBoundsLike } from 'maplibre-gl';

export interface MapViewState {
    center: LngLatLike;
    zoom: number;
    bearing?: number;
    pitch?: number;
}

export interface MapBounds {
    bounds: LngLatBoundsLike;
    padding?: number | { top: number; bottom: number; left: number; right: number };
}

export interface PointGeometry {
    type: 'Point';
    coordinates: [number, number];
}

export interface PolygonGeometry {
    type: 'Polygon';
    coordinates: [number, number][][];
}

export interface LineStringGeometry {
    type: 'LineString';
    coordinates: [number, number][];
}

export type Geometry = PointGeometry | PolygonGeometry | LineStringGeometry;

export interface Feature<G extends Geometry = Geometry, P = Record<string, unknown>> {
    type: 'Feature';
    geometry: G;
    properties: P;
    id?: string | number;
}

export interface FeatureCollection<G extends Geometry = Geometry, P = Record<string, unknown>> {
    type: 'FeatureCollection';
    features: Feature<G, P>[];
}