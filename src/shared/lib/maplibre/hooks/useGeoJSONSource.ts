import type { GeoJSONSourceSpecification } from "maplibre-gl";
import { useMapContext } from "@/shared/lib/maplibre";
import { useEffect } from "react";

export function useGeoJSONSource(
    id: string,
    data: GeoJSON.FeatureCollection | string,
    options?: Omit<GeoJSONSourceSpecification, 'type' | 'data'>
) {
    const { map, isStyleLoaded } = useMapContext();

    useEffect(() => {
        if (!map || !isStyleLoaded) return;

        if (!map.getSource(id)) {
            map.addSource(id, { type: 'geojson', data, ...options });
        }

        return () => {
            try {
                if (map.style && map.isStyleLoaded() && map.getSource(id)) {
                    map.removeSource(id);
                }
            } catch (e) {
            }
        };
    }, [map, isStyleLoaded, id]);

    useEffect(() => {
        if (!map || !isStyleLoaded) return;

        try {
            const source = map.getSource(id);
            if (source && source.type === 'geojson') {
                (source as maplibregl.GeoJSONSource).setData(data as any);
            }
        } catch (e) {
            console.warn(e);
        }
    }, [data, map, isStyleLoaded, id]);
}