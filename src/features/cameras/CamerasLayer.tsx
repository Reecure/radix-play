import {ClusterMarkers, type ClusterSegment} from "@/shared/lib/maplibre/ui/PieChartCluster.tsx";
import {useGeoJSONSource} from "@/shared/lib/maplibre/hooks/useGeoJSONSource.ts";
import {useEffect, useState} from "react";
import {toGeoJSON} from "@/shared/lib/maplibre/helpers/geoJsonConverter.ts";
import axios from "axios";

const CAMERAS_SOURCE_ID = 'cameras-source';

export const CamerasLayer = () => {
    const [cameras, setCameras] = useState<any>({ type: "FeatureCollection", features: [] });
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/cameras`).then((res) => {
            const geoJson = toGeoJSON(res.data, {
                getLat: (i: any) => i.lat,
                getLng: (i: any) => i.lng,
                excludeKeys: ['lat', 'lng']
            });
            setCameras(geoJson);
        });
    }, []);

    useGeoJSONSource(CAMERAS_SOURCE_ID, cameras, {
        cluster: true,
        clusterRadius: 50,
        clusterProperties: {
            'active_count': ['+', ['case', ['==', ['get', 'status'], true], 1, 0]],
            'broken_count': ['+', ['case', ['==', ['get', 'status'], false], 1, 0]],
        }
    });

    const chartSegments: ClusterSegment[] = [
        { key: 'active_count', color: '#5dbe85' },
        { key: 'broken_count', color: '#d56868' },
        { key: 'off_count',    color: '#c1c8ce' }
    ];

    const fontConfig = {
        family: 'sans-serif',
        weight: 400,
        color: '#8051ce',
        sizeRatio: 0.4
    };

    return (
        <>
            <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 1000, background: '#000', padding: '10px', borderRadius: '4px' }}>
                <label style={{ display: 'flex', gap: '8px', cursor: 'pointer', fontFamily: 'Times New Roman' }}>
                    <input
                        type="checkbox"
                        checked={isVisible}
                        onChange={(e) => setIsVisible(e.target.checked)}
                    />
                    Показать камеры
                </label>
            </div>

            <ClusterMarkers
                sourceId={CAMERAS_SOURCE_ID}
                isVisible={isVisible}
                segments={chartSegments}
                fontStyle={fontConfig}
            />
        </>
    );
}