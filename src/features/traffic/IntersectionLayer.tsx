//@ts-nocheck
import {useEffect, useState} from "react";
import axios from "axios";
import {useGeoJSONSource} from "@/shared/lib/maplibre/hooks/useGeoJSONSource.ts";
import {IntersectionMarkers} from "@/features/traffic/ui/IntersectionMarker.tsx";

const TRAFFIC_SOURCE_ID = 'traffic-source';

export const convertToGeoJson = (data) => {
    return {
        type: "FeatureCollection",
        features: data.map(item => {
            return {
                type: "Feature",
                id: item.id,
                geometry: {
                    type: "Point",
                    coordinates: [item.lng, item.lat]
                },
                properties: item
            };
        })
    };
}

const IntersectionLayer = () => {
    const [trafficNetwork, setTrafficNetwork] = useState({ type: "FeatureCollection", features: [] });

    useEffect(() => {
        axios.get(`http://localhost:5000/api/traffic-network`).then((res) => {
            setTrafficNetwork(convertToGeoJson(res.data.intersections));
        });
    }, []);

    useEffect(() => {
        console.log("trafficNetwork", trafficNetwork)
    }, [trafficNetwork]);

    useGeoJSONSource(TRAFFIC_SOURCE_ID, trafficNetwork)

    return (
        <div>
            <IntersectionMarkers
                sourceId={TRAFFIC_SOURCE_ID}
                renderPopup={(props) => (
                    <div style={{ padding: 12 }}>
                        <div><strong>ID:</strong> {props.id}</div>
                    </div>
                )}
            />
        </div>
    )
}

export default IntersectionLayer;