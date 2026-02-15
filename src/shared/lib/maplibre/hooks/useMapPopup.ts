import { useEffect, useRef, useCallback } from 'react';
import maplibregl from 'maplibre-gl';
import ReactDOM from 'react-dom/client';
import { useMapContext } from '@/shared/lib/maplibre';

interface UseMapPopupOptions {
    layerId: string;
    render: (properties: Record<string, any>) => React.ReactNode;
    popupOptions?: Omit<maplibregl.PopupOptions, 'closeButton'>;
    closeButton?: boolean;
    cursorPointer?: boolean;
}

export function useMapPopup({
                                layerId,
                                render,
                                popupOptions = {},
                                closeButton = false,
                                cursorPointer = true,
                            }: UseMapPopupOptions) {
    const { map, isLoaded } = useMapContext();
    const popupRef = useRef<maplibregl.Popup | null>(null);
    const rootRef = useRef<ReactDOM.Root | null>(null);

    const cleanup = useCallback(() => {
        if (popupRef.current) {
            popupRef.current.remove();
            popupRef.current = null;
        }
        if (rootRef.current) {
            const root = rootRef.current;
            rootRef.current = null;
            setTimeout(() => root.unmount(), 0);
        }
    }, []);

    useEffect(() => {
        if (!map || !isLoaded) return;

        const waitForLayer = () => {
            if (!map.getLayer(layerId)) return false;

            const handleClick = (e: maplibregl.MapLayerMouseEvent) => {
                const feature = e.features?.[0];
                if (!feature) return;

                const geometry = feature.geometry;
                const coords: [number, number] =
                    geometry.type === 'Point'
                        ? (geometry.coordinates.slice() as [number, number])
                        : [e.lngLat.lng, e.lngLat.lat];

                const properties = feature.properties || {};

                cleanup();

                const container = document.createElement('div');
                const root = ReactDOM.createRoot(container);
                rootRef.current = root;
                root.render(render(properties) as React.ReactElement);

                const popup = new maplibregl.Popup({
                    closeButton,
                    ...popupOptions,
                })
                    .setLngLat(coords)
                    .setDOMContent(container)
                    .addTo(map);

                popup.on('close', cleanup);
                popupRef.current = popup;

                map.easeTo({
                    center: coords,
                    duration: 300,
                })
            };

            const handleMouseEnter = () => {
                if (cursorPointer) map.getCanvas().style.cursor = 'pointer';
            };

            const handleMouseLeave = () => {
                if (cursorPointer) map.getCanvas().style.cursor = '';
            };

            map.on('click', layerId, handleClick);
            map.on('mouseenter', layerId, handleMouseEnter);
            map.on('mouseleave', layerId, handleMouseLeave);

            return () => {
                map.off('click', layerId, handleClick);
                map.off('mouseenter', layerId, handleMouseEnter);
                map.off('mouseleave', layerId, handleMouseLeave);
                cleanup();
            };
        };

        const unsub = waitForLayer();
        if (unsub) return unsub;

        let layerCleanup: (() => void) | null = null;
        const onSourceData = () => {
            if (map.getLayer(layerId) && !layerCleanup) {
                layerCleanup = waitForLayer() || null;
                map.off('sourcedata', onSourceData);
            }
        };
        map.on('sourcedata', onSourceData);

        return () => {
            map.off('sourcedata', onSourceData);
            if (layerCleanup) layerCleanup();
            cleanup();
        };
    }, [map, isLoaded, layerId, render, closeButton, cursorPointer, cleanup]);

    const close = useCallback(() => cleanup(), [cleanup]);

    return { close };
}