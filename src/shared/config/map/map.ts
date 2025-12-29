import type { MapConfig } from '../../lib/maplibre/types';

export const DEFAULT_MAP_CONFIG: MapConfig = {
    center: [30.525, 50.455],
    zoom: 9,
    maxBounds: [
        [-10, 35],
        [50, 60]
    ],
    renderWorldCopies: false,
};