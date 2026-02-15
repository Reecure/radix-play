import { useEffect, useRef } from 'react';
import type {MapEventType, MapLayerEventType} from 'maplibre-gl';
import { useMapContext } from './useMap';

export function useMapEvent<T extends keyof MapEventType>(
    event: T,
    handler: (e: MapEventType[T]) => void
) {
    const { map, isLoaded } = useMapContext();
    const handlerRef = useRef(handler);

    useEffect(() => {
        handlerRef.current = handler;
    }, [handler]);

    useEffect(() => {
        if (!map || !isLoaded) return;

        const wrappedHandler = (e: MapEventType[T]) => {
            handlerRef.current(e);
        };

        map.on(event, wrappedHandler);

        return () => {
            map.off(event, wrappedHandler);
        };
    }, [map, isLoaded, event]);
}

export function useLayerEvent<T extends keyof MapLayerEventType>(
    layerId: string,
    event: T,
    handler: (e: MapLayerEventType[T]) => void
) {
    const { map, isLoaded } = useMapContext();
    const handlerRef = useRef(handler);

    useEffect(() => {
        handlerRef.current = handler;
    }, [handler]);

    useEffect(() => {
        if (!map || !isLoaded) return;

        const checkAndSubscribe = () => {
            if (!map.getLayer(layerId)) {
                return false;
            }

            const wrappedHandler = (e: MapLayerEventType[T]) => {
                handlerRef.current(e);
            };

            map.on(event, layerId, wrappedHandler);

            return () => {
                map.off(event, layerId, wrappedHandler);
            };
        };

        const cleanup = checkAndSubscribe();
        if (cleanup) return cleanup;

        let unsubscribe: (() => void) | null = null;

        const onSourceData = () => {
            if (map.getLayer(layerId) && !unsubscribe) {
                unsubscribe = checkAndSubscribe() || null;
            }
        };

        map.on('sourcedata', onSourceData);

        return () => {
            map.off('sourcedata', onSourceData);
            if (unsubscribe) unsubscribe();
        };
    }, [map, isLoaded, layerId, event]);
}