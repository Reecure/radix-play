import { useMemo, useCallback, useEffect, useRef } from 'react';
import { useLayer } from '@/shared/lib/maplibre/hooks/useLayer';
import { useMapPopup } from '@/shared/lib/maplibre/hooks/useMapPopup';
import { useMapContext } from '@/shared/lib/maplibre';
import {
    LAYER_ID,
    applyHighlight,
    getHighwayIdFromEvent,
    createLineLayer,
    createHighlightLayer,
    createArrowLayer,
    createLabelLayer,
} from '../helpers/RoadLinesHelper.ts';

interface RoadsLinesProps {
    sourceId: string;
    isVisible?: boolean;
    color?: string;
    highlightColor?: string;
    width?: number;
    renderPopup?: (properties: Record<string, any>) => React.ReactNode;
}

export const RoadsLines = ({
                               sourceId,
                               isVisible = true,
                               color = '#a61a1a',
                               highlightColor = '#ff0000',
                               width = 6,
                               renderPopup,
                           }: RoadsLinesProps) => {
    const { map, isLoaded } = useMapContext();
    const hoveredIdRef = useRef<string | null>(null);
    const listenersRegisteredRef = useRef(false);

    const lineLayer = useMemo(
        () => createLineLayer(sourceId, color, width),
        [sourceId, color, width],
    );

    const highlightLayer = useMemo(
        () => createHighlightLayer(sourceId, highlightColor, width),
        [sourceId, highlightColor, width],
    );

    const arrowLayer = useMemo(
        () => createArrowLayer(sourceId, highlightColor),
        [sourceId, highlightColor],
    );

    const labelLayer = useMemo(
        () => createLabelLayer(sourceId),
        [sourceId],
    );

    useLayer(highlightLayer, undefined, isVisible);
    useLayer(lineLayer, undefined, isVisible);
    useLayer(arrowLayer, undefined, isVisible);
    useLayer(labelLayer, undefined, isVisible);

    useEffect(() => {
        if (!map || !isLoaded) return;

        listenersRegisteredRef.current = false;

        const handleMouseEnter = (e: maplibregl.MapLayerMouseEvent) => {
            const highwayId = getHighwayIdFromEvent(e);
            if (!highwayId || highwayId === hoveredIdRef.current) return;

            hoveredIdRef.current = highwayId;
            map.getCanvas().style.cursor = 'pointer';
            applyHighlight(map, highwayId);
        };

        const handleMouseLeave = () => {
            if (!hoveredIdRef.current) return;

            hoveredIdRef.current = null;
            map.getCanvas().style.cursor = '';
            applyHighlight(map, null);
        };

        const registerListeners = (): boolean => {
            if (listenersRegisteredRef.current) return true;
            if (!map.getLayer(LAYER_ID)) return false;

            listenersRegisteredRef.current = true;
            map.on('mouseenter', LAYER_ID, handleMouseEnter);
            map.on('mouseleave', LAYER_ID, handleMouseLeave);
            return true;
        };

        const removeListeners = () => {
            if (!listenersRegisteredRef.current) return;

            map.off('mouseenter', LAYER_ID, handleMouseEnter);
            map.off('mouseleave', LAYER_ID, handleMouseLeave);
            listenersRegisteredRef.current = false;
            hoveredIdRef.current = null;
            map.getCanvas().style.cursor = '';
        };

        if (!registerListeners()) {
            const onSourceData = () => {
                if (registerListeners()) {
                    map.off('sourcedata', onSourceData);
                }
            };
            map.on('sourcedata', onSourceData);

            return () => {
                map.off('sourcedata', onSourceData);
                removeListeners();
            };
        }

        return () => {
            removeListeners();
        };
    }, [map, isLoaded]);

    const defaultRenderPopup = useCallback(
        (props: Record<string, any>) => (
            <div style={{ padding: '8px 12px', fontSize: 14 }}>
            </div>
        ),
        [],
    );

    useMapPopup({
        layerId: LAYER_ID,
        render: renderPopup || defaultRenderPopup,
    });

    return null;
};