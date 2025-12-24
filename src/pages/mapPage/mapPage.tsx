import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './mapPage.scss';
// @ts-expect-error
import { getMapStyle } from '../../shared/config/mapStyles.js';
import { useTheme } from "../../app/providers/ThemeProvider.tsx";

const DEFAULT_CENTER: [number, number] = [30.525, 50.455];
const DEFAULT_ZOOM = 9;

const Map = () => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);

    const { theme } = useTheme();

    useEffect(() => {
        if (mapRef.current || !mapContainer.current) return;

        const initialStyle = getMapStyle(theme);

        mapRef.current = new maplibregl.Map({
            container: mapContainer.current,
            renderWorldCopies: false,
            style: initialStyle,
            center: DEFAULT_CENTER,
            zoom: DEFAULT_ZOOM,
            maxBounds: [
                [-10, 35],
                [50, 60]
            ]
        });

        mapRef.current.on('click', '3d-buildings', (e) => {
            console.log(e.lngLat);
            // @ts-expect-error
            console.log("Features", e.features[0])
        });

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (!mapRef.current) return;

        const newStyle = getMapStyle(theme);

        mapRef.current.setStyle(newStyle);

    }, [theme]);

    return <div ref={mapContainer} className={"map-wrap"}/>;
}

export default Map;