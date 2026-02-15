import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGeoJSONSource } from '@/shared/lib/maplibre/hooks/useGeoJSONSource';
import { RoadsLines } from './ui/RoadsLines';

const ROADS_SOURCE_ID = 'roads-source';

function convertRoadsToLineGeoJson(roads: any[]): GeoJSON.FeatureCollection {
    return {
        type: 'FeatureCollection',
        features: roads.map(road => {
            const coordinates = road.path && road.path.length > 0
                ? road.path.map((p: any) => [p.lng, p.lat])
                : [
                    [road.from.lng, road.from.lat],
                    [road.to.lng, road.to.lat],
                ];

            return {
                type: 'Feature' as const,
                id: road.id,
                geometry: {
                    type: 'LineString' as const,
                    coordinates: coordinates,
                },
                properties: {
                    id: road.id,
                    highwayId: road.highwayId,
                    name: road.highwayName,
                    lengthMeters: road.lengthMeters,
                },
            };
        }),
    };
}
const IntersectionConnectionLayer = () => {
    const [roads, setRoads] = useState<GeoJSON.FeatureCollection>({
        type: 'FeatureCollection',
        features: [],
    });

    useEffect(() => {
        axios.get('http://localhost:5000/api/traffic-network').then((res) => {
            setRoads(convertRoadsToLineGeoJson(res.data.roads));
        });
    }, []);

    useGeoJSONSource(ROADS_SOURCE_ID, roads);

    return <RoadsLines sourceId={ROADS_SOURCE_ID} />;
};

export default IntersectionConnectionLayer;