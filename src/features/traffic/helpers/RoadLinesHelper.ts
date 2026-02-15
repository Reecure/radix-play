import type {
    Map,
    FilterSpecification,
    MapLayerMouseEvent,
    LineLayerSpecification,
    SymbolLayerSpecification,
} from 'maplibre-gl';

export const LAYER_ID = 'roads-lines';
export const HIGHLIGHT_LAYER_ID = 'roads-lines-highlight';
export const ARROW_LAYER_ID = 'roads-lines-arrows';
export const LABEL_LAYER_ID = 'roads-lines-labels';

export const EMPTY_FILTER: FilterSpecification = ['==', ['get', 'highwayId'], ''];

function getHighwayFilter(id: string): FilterSpecification {
    return ['==', ['get', 'highwayId'], id];
}

export function applyHighlight(map: Map, highwayId: string | null): void {
    const filter = highwayId ? getHighwayFilter(highwayId) : EMPTY_FILTER;

    if (map.getLayer(HIGHLIGHT_LAYER_ID)) {
        map.setFilter(HIGHLIGHT_LAYER_ID, filter);
    }
    if (map.getLayer(ARROW_LAYER_ID)) {
        map.setFilter(ARROW_LAYER_ID, filter);
    }
    if (map.getLayer(LAYER_ID)) {
        map.setPaintProperty(LAYER_ID, 'line-opacity', highwayId ? 0.3 : 0.6);
    }
}

export function getHighwayIdFromEvent(e: MapLayerMouseEvent): string | undefined {
    return e.features?.[0]?.properties?.highwayId;
}

export function createLineLayer(
    sourceId: string,
    color: string,
    width: number,
): LineLayerSpecification {
    return {
        id: LAYER_ID,
        type: 'line',
        source: sourceId,
        layout: {
            'line-cap': 'round',
            'line-join': 'round',
        },
        paint: {
            'line-color': color,
            'line-width': width,
            'line-opacity': 0.6,
        },
    };
}

export function createHighlightLayer(
    sourceId: string,
    highlightColor: string,
    width: number,
): LineLayerSpecification {
    return {
        id: HIGHLIGHT_LAYER_ID,
        type: 'line',
        source: sourceId,
        filter: EMPTY_FILTER,
        layout: {
            'line-cap': 'round',
            'line-join': 'round',
        },
        paint: {
            'line-color': highlightColor,
            'line-width': width + 3,
            'line-opacity': 0.9,
        },
    };
}

export function createArrowLayer(
    sourceId: string,
    highlightColor: string,
): SymbolLayerSpecification {
    return {
        id: ARROW_LAYER_ID,
        type: 'symbol',
        source: sourceId,
        filter: EMPTY_FILTER,
        layout: {
            'symbol-placement': 'line',
            'symbol-spacing': 80,
            'text-field': '▶',
            'text-size': 24,
            'text-keep-upright': false,
            'text-rotation-alignment': 'map',
            'text-allow-overlap': true,
        },
        paint: {
            'text-color': highlightColor,
            'text-opacity': 0.9,
        },
    };
}

export function createLabelLayer(sourceId: string): SymbolLayerSpecification {
    return {
        id: LABEL_LAYER_ID,
        type: 'symbol',
        source: sourceId,
        layout: {
            'symbol-placement': 'line',
            'text-field': ['get', 'name'],
            'text-size': 12,
            'text-font': ['Open Sans Regular'],
            'text-offset': [0, -1],
            'text-allow-overlap': false,
        },
        paint: {
            'text-color': '#1e3a5f',
            'text-halo-color': '#ffffff',
            'text-halo-width': 2,
        },
    };
}