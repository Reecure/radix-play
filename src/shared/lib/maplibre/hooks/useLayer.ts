import { useEffect } from 'react';
import type { LayerSpecification } from 'maplibre-gl';
import { useMapContext } from './useMap';

export function useLayer(
    layer: LayerSpecification,
    beforeId?: string,
    visible: boolean = true
) {
    const { map, isStyleLoaded } = useMapContext();

    useEffect(() => {
        if (!map || !isStyleLoaded) return;

        const addLayer = () => {
            if ('source' in layer && typeof layer.source === 'string') {
                if (!map.getSource(layer.source)) return false;
            }

            if (!map.getLayer(layer.id)) {
                try {
                    map.addLayer(layer, beforeId);
                } catch (e) {
                    console.warn(`Layer ${layer.id} could not be added:`, e);
                    return false;
                }
            }

            const visibility = visible ? 'visible' : 'none';
            if (map.getLayoutProperty(layer.id, 'visibility') !== visibility) {
                map.setLayoutProperty(layer.id, 'visibility', visibility);
            }
            return true;
        };

        if (!addLayer()) {
            const onSourceData = () => {
                if (addLayer()) {
                    map.off('sourcedata', onSourceData);
                }
            };
            map.on('sourcedata', onSourceData);

            return () => {
                map.off('sourcedata', onSourceData);
                try {
                    if (map.style && map.isStyleLoaded() && map.getLayer(layer.id)) {
                        map.removeLayer(layer.id);
                    }
                } catch (e) {}
            };
        }

        return () => {
            try {
                if (map.style && map.isStyleLoaded() && map.getLayer(layer.id)) {
                    map.removeLayer(layer.id);
                }
            } catch (e) {}
        };
    }, [map, isStyleLoaded, layer, visible, beforeId]);
}