import { useMemo, useCallback } from 'react';
import { useLayer } from '@/shared/lib/maplibre/hooks/useLayer';
import { useMapPopup } from '@/shared/lib/maplibre/hooks/useMapPopup';
import type { SymbolLayerSpecification } from "maplibre-gl";

const LAYER_ID = 'intersection-circles';
const GLOW_LAYER_ID = `${LAYER_ID}-glow`;

interface IntersectionMarkersProps {
    sourceId: string;
    isVisible?: boolean;
    color?: string;
    radius?: number;
    renderPopup?: (properties: Record<string, any>) => React.ReactNode;
}

export const IntersectionMarkers = ({
                                        sourceId,
                                        isVisible = true,
                                        color = '#D83D40',
                                        radius = 18,
                                        renderPopup,
                                    }: IntersectionMarkersProps) => {

    const glowLayer = useMemo(() => ({
        id: GLOW_LAYER_ID,
        type: 'circle' as const,
        source: sourceId,
        paint: {
            'circle-radius': radius * 2,
            'circle-color': color,
            'circle-opacity': 0.4,
            'circle-blur': 1,
        },
    }), [sourceId, color, radius]);

    const circleLayer = useMemo(() => ({
        id: LAYER_ID,
        type: 'circle' as const,
        source: sourceId,
        paint: {
            'circle-radius': radius,
            'circle-color': color,
            'circle-stroke-width': 0,
        },
    }), [sourceId, color, radius]);

    const textLayer: SymbolLayerSpecification = useMemo(() => ({
        id: `${LAYER_ID}-labels`,
        type: 'symbol' as const,
        source: sourceId,
        layout: {
            'text-field': ['to-string', ['get', 'id']],
            'text-size': 11,
            'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
            'text-allow-overlap': true,
            'text-ignore-placement': true,
        },
        paint: {
            'text-color': '#ffffff',
        },
    }), [sourceId]);

    useLayer(glowLayer, undefined, isVisible);
    useLayer(circleLayer, undefined, isVisible);
    useLayer(textLayer, undefined, isVisible);

    const defaultRenderPopup = useCallback((props: Record<string, any>) => (
        <div style={{ padding: '8px 12px', fontSize: 14 }}>
            <strong>Intersection #{props.id}</strong>
        </div>
    ), []);

    useMapPopup({
        layerId: LAYER_ID,
        render: renderPopup || defaultRenderPopup,
        closeButton: false
    });

    return null;
};